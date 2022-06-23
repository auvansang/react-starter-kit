import path from 'path';

export const relativePath = (currentPath: string) =>
  path.relative(currentPath, String(process.env.ROOT));
