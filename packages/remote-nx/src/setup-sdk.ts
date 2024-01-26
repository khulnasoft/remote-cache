import { initEnv } from 'nx-remotecache-custom';
import { getKhulnasoftRemoteCacheClient } from './remote-client';
import type { Readable } from 'stream';
import type { KhulnasoftRemoteCacheOptions } from './remote-client';

// eslint-disable-next-line @typescript-eslint/require-await
const setupSDK = async (options: KhulnasoftRemoteCacheOptions) => {
  initEnv(options);
  const remote = getKhulnasoftRemoteCacheClient(options);
  return {
    name: 'Khulnasoft Remote Cache',
    fileExists: (filename: string) => remote.exists(filename).send(),
    retrieveFile: (filename: string) => remote.get(filename).stream(),
    storeFile: (filename: string, stream: Readable) =>
      remote.put(filename).stream(stream),
  };
};

export { setupSDK };
