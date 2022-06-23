import { RuleSetRule } from 'webpack';

import { NAME_HASH } from './constants';

const getExclusion = (isDevelopment: boolean): Array<RuleSetRule> => [
  {
    exclude: [
      /^$/,
      /\.(js|mjs|jsx|ts|tsx)$/i,
      /\.(sa|sc|c)ss$/i,
      /\.html$/i,
      /\.json$/i,
      /\.(bmp|gif|jpe?g|gif|png|svg)$/i,
      /\.(woff|woff2|eot|ttf|otf)$/i,
    ],
    type: 'asset/resource',
    generator: {
      filename: `static/assets/[ext]/${isDevelopment ? '[name]' : NAME_HASH}[ext]`,
    },
  },
];

export default getExclusion;
