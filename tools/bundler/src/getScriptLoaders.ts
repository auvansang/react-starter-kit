import { RuleSetRule } from 'webpack';

// @ts-ignore
import PluginTransformImport from 'swc-plugin-transform-import';

const getScriptLoaders = (isDevelopment: boolean): Array<RuleSetRule> => [
  {
    exclude: /node_modules/,
    include: /src/,
    test: /\.(js|jsx|ts|tsx)$/i,
    use: {
      loader: require.resolve('swc-loader'),
      options: {
        minify: !isDevelopment,
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
          transform: {
            react: {
              runtime: 'automatic',
              pragma: 'React.createElement',
              pragmaFrag: 'React.Fragment',
              throwIfNamespace: true,
              development: isDevelopment,
              refresh: isDevelopment,
              useBuiltins: false,
            },
          },
          // experimental: {
          //   plugins: [
          //     [
          //       'transform-imports',
          //       {
          //         '@mui/material': {
          //           transform: '@mui/material/{{member}}',
          //         },
          //         '@mui/icons-material': {
          //           transform: '@mui/icons-material/{{member}}',
          //         },
          //       },
          //     ],
          //   ],
          // },
        },
        plugin: (m: any) =>
          new PluginTransformImport({
            '@mui/material': {
              transform: '@mui/material/${member}',
              preventFullImport: true,
            },
            '@mui/lab': {
              transform: '@mui/lab/${member}',
              preventFullImport: true,
            },
            '@mui/icons-material': {
              transform: '@mui/icons-material/${member}',
              preventFullImport: true,
            },
          }).visitProgram(m),
        env: {
          targets: isDevelopment
            ? '>0.2%, not dead, not op_mini all'
            : 'last 1 chrome version, last 1 firefox version, last 1 safari version',
        },
      },
    },
  },
];

export default getScriptLoaders;
