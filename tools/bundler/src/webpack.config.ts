import { Configuration } from 'webpack';

import getAppConfig from './getAppConfig';

import getCommonConfig from './getCommonConfig';
import getAssetsLoaders from './getAssetsLoaders';
import getScriptLoaders from './getScriptLoaders';
import getStylesLoaders from './getStylesLoaders';
import getExclusion from './getExclusion';

import getPlugins from './getPlugins';

import getOptimization from './getOptimization';

import getDevServer from './getDevServer';

const webpackConfig = (_: Record<string, unknown>, argv: Record<string, unknown>) => {
  const buildConfig: BuildConfig = {
    nodeEnv: String(argv.mode) as NodeEnv,
    appEnv: String(process.env.ENV) as AppEnv,
  };

  const isDevelopment = buildConfig.nodeEnv === 'development';
  const { appConfig, environmentVariables, processEnv } = getAppConfig(buildConfig);

  let configuration: Configuration = {
    ...getCommonConfig(isDevelopment, appConfig),
    module: {
      strictExportPresence: true,
      rules: [
        {
          oneOf: [
            ...getAssetsLoaders(isDevelopment),
            ...getScriptLoaders(isDevelopment),
            ...getStylesLoaders(isDevelopment, Boolean(appConfig.useSourceMap)),
            ...getExclusion(isDevelopment),
          ],
        },
      ],
    },
    ...getPlugins(isDevelopment, appConfig, environmentVariables, processEnv),
    ...getOptimization(isDevelopment, buildConfig.nodeEnv),
  };

  if (isDevelopment) {
    configuration = {
      ...configuration,
      devServer: {
        ...getDevServer(appConfig),
      },
    };
  }

  return configuration;
};

export default webpackConfig;
