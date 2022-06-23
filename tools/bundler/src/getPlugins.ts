import {
  Configuration,
  DefinePlugin,
  ProgressPlugin,
  ProvidePlugin,
  WebpackPluginInstance,
} from 'webpack';

// Share Plugins
import ESLintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// Dev plugins
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

// Prod plugins
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';

import { NAME_HASH, ID_HASH } from './constants';

const getPlugins = (
  isDevelopment: boolean,
  appConfig: AppConfig,
  environmentVariables: Record<string, unknown>,
  processEnv: Record<string, any>
): Pick<Configuration, 'plugins'> => ({
  plugins: [
    new ProvidePlugin({
      React: 'react',
    }),
    isDevelopment &&
      new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        fix: isDevelopment,
        lintDirtyModulesOnly: isDevelopment,
        emitError: true,
        cache: true,
      }),
    !isDevelopment && new CleanWebpackPlugin(),
    new ProgressPlugin({
      profile: isDevelopment,
    }),
    new HtmlWebpackPlugin({
      cache: true,
      inject: true,
      minify: !isDevelopment,
      template: appConfig.htmlTemplate,
      templateParameters: environmentVariables,
    }),
    new DefinePlugin(processEnv),
    new CopyPlugin({
      patterns: [
        {
          from: appConfig.public,
          to: appConfig.dist,
          globOptions: {
            ignore: ['**/*.html'],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: `static/css/${isDevelopment ? '[name]' : NAME_HASH}.css`,
      chunkFilename: `static/css/${isDevelopment ? '[id]' : ID_HASH}.chunk.css`,
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    isDevelopment && new CaseSensitivePathsPlugin(),
    !isDevelopment &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
    !isDevelopment &&
      new CompressionPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
    !isDevelopment &&
      new CompressionPlugin({
        filename: '[path][base].br',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {
          level: 11,
        },
        threshold: 10240,
        minRatio: 0.8,
      }),
    !isDevelopment &&
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: appConfig.publicPath,
      }),
  ].filter((plugin): plugin is WebpackPluginInstance => !!plugin),
});

export default getPlugins;
