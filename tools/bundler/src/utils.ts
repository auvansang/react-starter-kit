import path from 'path';

export const resolvePath = (...args: string[]) => path.resolve(String(process.env.ROOT), ...args);
