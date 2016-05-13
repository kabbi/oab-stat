import body from 'koa-body';
import convert from 'koa-convert';
import Router from 'koa-router';

import { signin } from './AuthController';

const router = new Router();
router.post('/signin', convert(body()), signin);

export default router;
