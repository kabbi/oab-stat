import sql from 'mssql';

export const initDBConnection = async (ctx, next) => {
  await ctx.app.context.db;
  await next();
};

export const listCategories = async ctx => {
  ctx.body = await sql.query`
    select * from [ui].[Queries] where [ParentId] is NULL order by [Order]
  `;
};

export const listQueries = async ctx => {
  ctx.body = await sql.query`
    select * from [ui].[Queries] where [ParentId] = ${ctx.params.categoryId} order by [Order]
  `;
};

export const runQuery = async ctx => {
  const [query] = await sql.query`
    select * from [ui].[Queries] where [Id] = ${ctx.params.queryId}
  `;
  if (!query) {
    ctx.throw(404, 'Query not found');
  }

  const params = ctx.request.body;
  const request = new sql.Request();
  for (const param of Object.keys(params)) {
    request.input(param, params[param]);
  }
  ctx.body = await request.query(query.Query);
};

export const fetchList = async ctx => {
  const [list] = await sql.query`
    select * from [ui].[FillList] where [Id] = ${ctx.params.listId}
  `;
  if (!list) {
    ctx.throw(404, 'List not found');
  }

  const params = ctx.request.body;
  const request = new sql.Request();
  for (const param of Object.keys(params)) {
    request.input(param, params[param]);
  }
  ctx.body = await request.query(list.Query);
};
