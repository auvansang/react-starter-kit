import { Configuration } from 'webpack-dev-server';

const getDevServer = (appConfig: AppConfig): Configuration => ({
  compress: true,
  historyApiFallback: true,
  host: appConfig.host ?? 'localhost',
  hot: true,
  static: {
    directory: appConfig.public,
    publicPath: appConfig.publicPath,
    watch: {
      ignored: appConfig.src,
    },
  },
  https: appConfig.https ?? false,
  port: appConfig.port ?? 3000,
  client: {
    progress: true,
    overlay: true,
  },
});

export default getDevServer;
