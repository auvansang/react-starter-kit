import { Configuration } from 'webpack';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const getOptimization = (
  isDevelopment: boolean,
  nodeEnv: NodeEnv
): Pick<Configuration, 'optimization'> => ({
  optimization: {
    emitOnErrors: true,
    mergeDuplicateChunks: true,
    minimize: !isDevelopment,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.swcMinify,
        terserOptions: {},
        parallel: true,
      }),
      new CssMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true,
              },
            },
          ],
        },
      }),
    ],
    nodeEnv: nodeEnv,
    removeAvailableModules: true,
    removeEmptyChunks: true,
    runtimeChunk: {
      name: (entrypoint: { [key: string]: any }) => `runtime-${entrypoint.name}`,
    },
    splitChunks: {
      chunks: 'all',
    },
  },
});

export default getOptimization;
