import path from 'path';

import { Configuration } from 'webpack';

import { ID_HASH, NAME_HASH } from './constants';

const getCommonConfig = (isDevelopment: boolean, appConfig: AppConfig): Configuration => {
  const sourceMap = appConfig.useSourceMap ? 'source-map' : false;

  return {
    cache: true,
    context: __dirname,
    devtool: isDevelopment ? 'cheap-module-source-map' : sourceMap,
    entry: appConfig.entry,
    mode: isDevelopment ? 'development' : 'production',
    node: {
      __dirname: false,
      __filename: false,
    },
    output: {
      filename: `static/js/${isDevelopment ? '[name]' : NAME_HASH}.js`,
      chunkFilename: `static/js/${isDevelopment ? '[id]' : ID_HASH}.chunk.js`,
      path: appConfig.dist,
      pathinfo: false,
      publicPath: appConfig.publicPath,
      globalObject: 'this',
      devtoolModuleFilenameTemplate: isDevelopment
        ? (info: { absoluteResourcePath: string }) =>
            path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
        : (info: { absoluteResourcePath: string }) =>
            path.relative(appConfig.src, info.absoluteResourcePath).replace(/\\/g, '/'),
    },
    performance: false,
    profile: isDevelopment,
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      modules: ['node_modules', 'src'],
    },
    stats: {
      colors: true,
      errors: true,
      modules: false,
    },
    target: 'web',
  };
};

export default getCommonConfig;
