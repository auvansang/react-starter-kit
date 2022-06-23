interface AppConfig {
  context: string;
  src: string;
  dist: string;
  dotEnv: string;
  publicPath: string;
  public: string;
  entry: string | string[];
  htmlTemplate?: string;
  useSourceMap?: boolean;
  host?: string;
  https?: boolean;
  port?: number;
}

interface Configuration {
  apps?: {
    [name: string]: Partial<AppConfig>;
  };
  components?: {
    [name: string]: Partial<AppConfig>;
  };
  libs?: {
    [name: string]: Partial<AppConfig>;
  };
}

type NodeEnv = 'development' | 'production' | undefined;
type AppEnv = 'local' | 'dev' | 'test' | 'stage' | 'prod';
type BuildConfig = {
  nodeEnv: NodeEnv;
  appEnv: AppEnv;
};
