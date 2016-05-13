import _debug from 'debug';

const debug = _debug('oab:server:errors');

export default function () {
  return async (ctx, next) => {
    try {
      await next();
      if (ctx.body && !ctx.state.skipErrorPopulation) {
        ctx.body = {
          error: false,
          data: ctx.body,
        };
      }
    } catch (error) {
      debug('Got an exception', error);
      if (error.expose) {
        ctx.status = error.status;
        ctx.body = {
          error: true,
          message: error.message,
          data: error.data,
        };
      } else {
        ctx.status = 500;
        ctx.body = {
          error: true,
          message: 'Internal Server Error',
        };
      }
    }
  };
}
