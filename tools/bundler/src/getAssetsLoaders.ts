import { RuleSetRule } from 'webpack';

import { NAME_HASH } from './constants';

const getAssetsLoaders = (isDevelopment: boolean): Array<RuleSetRule> => [
  {
    test: [/\.avif$/i],
    type: 'asset',
    mimetype: 'image/avif',
    parser: {
      dataUrlCondition: {
        maxSize: 10000,
      },
    },
    generator: {
      filename: `static/media/[${isDevelopment ? 'name' : NAME_HASH}[ext]`,
    },
  },
  {
    test: /\.(bmp|gif|jpe?g|png)$/i,
    type: 'asset/resource',
    parser: {
      dataUrlCondition: {
        maxSize: 10000,
      },
    },
    generator: {
      filename: `static/media/${isDevelopment ? '[name]' : NAME_HASH}[ext]`,
    },
  },
  {
    test: /\.svg$/i,
    use: [
      {
        loader: require.resolve('@svgr/webpack'),
        options: {
          prettier: false,
          svgo: false,
          svgoConfig: {
            plugins: [{ removeViewBox: false }],
          },
          titleProp: true,
          ref: true,
        },
      },
      {
        loader: require.resolve('file-loader'),
        options: {
          name: `static/media/${isDevelopment ? '[name]' : NAME_HASH}.[ext]`,
        },
      },
    ],
  },
  {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
    type: 'asset/resource',
    generator: {
      filename: `static/fonts/${isDevelopment ? '[name]' : NAME_HASH}[ext]`,
    },
  },
];
export default getAssetsLoaders;
