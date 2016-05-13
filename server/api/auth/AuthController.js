import jwt from 'koa-jwt';

import config from '../../../config';

export const signin = async ctx => {
  const { userName } = ctx.request.body;

  if (userName !== 'oab admin') {
    ctx.throw(400, 'Unknown user name or password');
  }

  ctx.body = {
    token: jwt.sign({
      id: 'TODO place user id here',
    }, config.jwt_shared_secret),
  };
};
