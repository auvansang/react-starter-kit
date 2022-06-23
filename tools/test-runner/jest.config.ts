import { Config } from '@jest/types';
import { relativePath } from './src/utils';

const ROOT = relativePath(__dirname);

// Or async function
export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    prettierPath: `${process.env.ROOT}/.prettierrc.js`,
    roots: [
      process.env.APP && `${process.env.ROOT}/apps/${process.env.APP}`,
      process.env.LIB && `${process.env.ROOT}/libs/${process.env.LIB}`,
      process.env.TOOL && `${process.env.ROOT}/tools/${process.env.TOOL}`,
    ].filter(Boolean),
    testMatch: [
      process.env.APP &&
        `${process.env.ROOT}/apps/${process.env.APP}/**/?(__tests__/**/)*.(spec|test).[jt]s?(x)`,

      process.env.LIB &&
        `${process.env.ROOT}/libs/${process.env.LIB}/**/?(__tests__/**/)*.(spec|test).[jt]s?(x)`,

      process.env.TOOL &&
        `${process.env.ROOT}/tools/${process.env.TOOL}/**/?(__tests__/**/)*.(spec|test).[jt]s?(x)`,
    ].filter(Boolean),
    transform: {
      '^.+\\.(t|j)sx?$': [
        '@swc/jest',
        {
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
                useBuiltins: false,
              },
            },
          },
        },
      ],
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/__mocks__/jest/fileTransformer.js',
    },
    moduleNameMapper: {
      '\\.(css|less|scss)$': 'identity-obj-proxy',
    },
    moduleDirectories: [
      'node_modules',
      process.env.APP && `${process.env.ROOT}/apps/${process.env.APP}/src`,
      process.env.LIB && `${process.env.ROOT}/libs/${process.env.LIB}/src`,
      process.env.TOOL && `${process.env.ROOT}/tools/${process.env.TOOL}/src`,
    ].filter(Boolean),
    coverageProvider: 'v8',
    coverageDirectory:
      (process.env.APP && `${process.env.ROOT}/.coverage/apps/${process.env.APP}`) ||
      (process.env.LIB && `${process.env.ROOT}/.coverage/libs/${process.env.LIB}`) ||
      (process.env.TOOL && `${process.env.ROOT}/.coverage/tools/${process.env.TOOL}`),
    collectCoverageFrom: [
      process.env.APP && `${ROOT}/apps/${process.env.APP}/src/**/*.[jt]s?(x)`,
      process.env.LIB && `${ROOT}/libs/${process.env.LIB}/src/**/*.[jt]s?(x)`,
      process.env.TOOL && `${ROOT}/tools/${process.env.TOOL}/src/**/*.[jt]s?(x)`,
    ].filter(Boolean),
    coveragePathIgnorePatterns: [
      `${process.env.ROOT}/.vscode/`,
      `${process.env.ROOT}/.cache/`,
      `${process.env.ROOT}/.yarn/`,
      `${process.env.ROOT}/.coverage/`,
      `${process.env.ROOT}/mocks/`,
      `${process.env.ROOT}/dist/`,
    ],
  };
};
