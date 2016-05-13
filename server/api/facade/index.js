import body from 'koa-body';
import convert from 'koa-convert';
import Router from 'koa-router';

import * as FacadeController from './FacadeController';

const router = new Router();

router.use('/', FacadeController.initDBConnection);

router.get('/queries', FacadeController.listCategories);
router.get('/queries/:categoryId', FacadeController.listQueries);
router.post('/queries/:queryId/run', convert(body()), FacadeController.runQuery);

router.post('/lists/:listId', convert(body()), FacadeController.fetchList);

export default router;
