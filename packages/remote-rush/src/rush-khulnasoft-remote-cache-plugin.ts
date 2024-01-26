import { KhulnasoftRemoteCacheProvider } from './khulnasoft-remote-cache-provider';
import type { KhulnasoftRemoteCacheConfiguration } from './khulnasoft-remote-cache-provider';
import type {
  IRushPlugin,
  RushSession,
  RushConfiguration,
} from '@rushstack/rush-sdk';

const PLUGIN_NAME = 'RushKhulnasoftRemoteCachePlugin';
const CACHE_PROVIDER_NAME = 'khulnasoft-remote-cache';

export class RushKhulnasoftRemoteCachePlugin implements IRushPlugin {
  private _options: KhulnasoftRemoteCacheConfiguration;
  constructor(options: KhulnasoftRemoteCacheConfiguration) {
    this._options = options;
  }
  public apply(rushSession: RushSession, _rushConfig: RushConfiguration): void {
    rushSession.hooks.initialize.tap(PLUGIN_NAME, () => {
      rushSession.registerCloudBuildCacheProviderFactory(
        CACHE_PROVIDER_NAME,
        (_buildCacheConfig): KhulnasoftRemoteCacheProvider => {
          return new KhulnasoftRemoteCacheProvider(this._options, rushSession);
        },
      );
    });
  }
}
