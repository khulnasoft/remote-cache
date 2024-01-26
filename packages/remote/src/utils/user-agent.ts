import pkg from '../../package.json';

export function getUserAgent(product: string): string {
  return `khulnasoft/remote ${pkg.version} ${product} node${process.version} ${process.platform} (${process.arch})`;
}
