interface Environment extends EnvironmentBase {
  authority: string;
}

const env: Environment = {
  nodeEnv: process.env.NODE_ENV,
  appEnv: process.env.ENV ?? 'dev',
  version: process.env.VERSION ?? '0.0.0',
  authority: process.env.AUTHORITY ?? '',
};

export default env;
