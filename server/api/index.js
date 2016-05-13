// import convert from 'koa-convert';
// import jwt from 'koa-jwt';
import Router from 'koa-router';

import populateErrors from '../middleware/populate-errors';
// import config from '../../config';

import auth from './auth';
import facade from './facade';

const router = new Router({
  prefix: '/api',
});

router.use('/', populateErrors());
router.use('/auth', auth.routes(), auth.allowedMethods());

// router.use('/', convert(jwt({ secret: config.jwt_shared_secret })));
router.use('/facade', facade.routes(), facade.allowedMethods());

export default router;
