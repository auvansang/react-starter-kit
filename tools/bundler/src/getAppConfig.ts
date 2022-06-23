import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
import { expand } from 'dotenv-expand';

import { resolvePath } from './utils';

const getEnv = (appConfig: AppConfig, buildConfig: BuildConfig) => {
  const envFiles = [`.env.${buildConfig.appEnv}.local`, `.env.${buildConfig.appEnv}`, '.env'];
  const environmentVariables: Record<string, unknown> = {
    NODE_ENV: buildConfig.nodeEnv,
  };

  envFiles.forEach((envFile) => {
    const envFilePath = path.resolve(appConfig.context, envFile);

    if (fs.existsSync(envFilePath)) {
      const envConfig = dotenv.config({ path: envFilePath });

      expand(envConfig);

      if (envConfig.parsed) {
        Object.keys(envConfig.parsed).forEach(
          (key) => (environmentVariables[`${key}`] = envConfig.parsed![key])
        );
      }
    }
  });

  environmentVariables['PUBLIC_PATH'] = appConfig.publicPath;

  const processEnv = {
    'process.env': Object.keys(environmentVariables).reduce((env: { [key: string]: any }, key) => {
      env[key] = JSON.stringify(environmentVariables[key]);

      return env;
    }, {}),
  };

  return {
    environmentVariables,
    processEnv,
  };
};

const getAppConfig = (buildConfig: BuildConfig) => {
  const appConfig: AppConfig = {
    context: resolvePath(`apps/${process.env.APP}`),
    src: resolvePath(`apps/${process.env.APP}/src`),
    dist: resolvePath(`dist/${process.env.APP}`),
    dotEnv: resolvePath('.env'),
    publicPath: process.env.PUBLIC_PATH || '/',
    public: resolvePath(`apps/${process.env.APP}/public`),
    entry: resolvePath(`apps/${process.env.APP}/src/main.tsx`),
    htmlTemplate: resolvePath(`apps/${process.env.APP}/public/index.html`),

    https: Boolean(process.env.HTTPS) || false,
    host: process.env.HOST || '0.0.0.0',
    port: Number(process.env.PORT) || 3000,
    useSourceMap: Boolean(process.env.USE_SOURCE_MAP) || false,
  };

  const { environmentVariables, processEnv } = getEnv(appConfig, buildConfig);

  return {
    appConfig,
    environmentVariables,
    processEnv,
  };
};

export default getAppConfig;
