import { RuleSetRule } from 'webpack';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const getStylesLoaders = (isDevelopment: boolean, useSourceMap: boolean): Array<RuleSetRule> => [
  {
    test: /\.(sa|sc|c)ss$/i,
    use: [
      isDevelopment ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
          sourceMap: useSourceMap,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          postcssOptions: {
            config: false,
            plugins: [
              require.resolve('postcss-flexbugs-fixes'),
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              [
                require.resolve('postcss-preset-env'),
                {
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                },
              ],
            ],
            sourceMap: useSourceMap,
          },
        },
      },
      {
        loader: require.resolve('sass-loader'),
        options: {
          sourceMap: useSourceMap,
        },
      },
    ],
  },
];

export default getStylesLoaders;
