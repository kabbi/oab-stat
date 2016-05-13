import Koa from 'koa';
import historyApiFallback from 'koa-connect-history-api-fallback';
import convert from 'koa-convert';
import proxy from 'koa-proxy';
import serve from 'koa-static';
import sql from 'mssql';
import webpack from 'webpack';

import config from '../config';
import webpackConfig from '../build/webpack.config';

import webpackDevMiddleware from './middleware/webpack-dev';
import webpackHMRMiddleware from './middleware/webpack-hmr';
import api from './api';

const paths = config.utils_paths;
const app = new Koa();

app.context.db = sql.connect(config.facade_connection_string);

if (config.proxy && config.proxy.enabled) {
  app.use(convert(proxy(config.proxy.options)));
}

app.use(api.routes());
app.use(api.allowedMethods());

app.use(convert(historyApiFallback({
  verbose: false,
})));

if (config.env === 'development') {
  const compiler = webpack(webpackConfig);
  const { publicPath } = webpackConfig.output;

  app.use(webpackDevMiddleware(compiler, publicPath));
  app.use(webpackHMRMiddleware(compiler));

  app.use(convert(serve(paths.client('static'))));
} else {
  app.use(convert(serve(paths.base(config.dir_dist))));
}

export default app;
