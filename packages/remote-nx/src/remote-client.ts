import events from 'events';
import { createClient } from '@khulnasoft/remote';
import { gray } from 'chalk';
import type { CustomRunnerOptions } from 'nx-remotecache-custom';

export type KhulnasoftRemoteCacheOptions = CustomRunnerOptions<{
  teamId?: string;
  token?: string;
}>;

function getCredentials(options: KhulnasoftRemoteCacheOptions) {
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  const token = process.env.KHULNASOFT_ARTIFACTS_TOKEN;
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  const teamId = process.env.KHULNASOFT_ARTIFACTS_OWNER;
  if (token && teamId) {
    return {
      token,
      teamId,
    };
  }

  return {
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    token: process.env.NX_KHULNASOFT_REMOTE_CACHE_TOKEN || options.token,
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    teamId: process.env.NX_KHULNASOFT_REMOTE_CACHE_TEAM || options.teamId,
  };
}

export function getKhulnasoftRemoteCacheClient(options: KhulnasoftRemoteCacheOptions) {
  // Prevents a client warning of 'MaxListenersExceededWarning'
  // The warning originates when nx-remotecache-custom creates a tarball
  // of the build artifacts.
  // TODO: Remove this when the warning is fixed upstream.
  events.defaultMaxListeners = 500;

  const { token, teamId } = getCredentials(options);
  if (!token) {
    throw new Error(
      'Missing a Khulnasoft access token for Khulnasoft Remote Cache. ' +
        'Specify a token either in nx.json or using the environment ' +
        'variable NX_KHULNASOFT_REMOTE_CACHE_TOKEN.',
    );
  }

  if (options.verbose) {
    const owner = teamId ? `Team ${teamId}` : 'Personal account';
    // eslint-disable-next-line no-console
    console.log(
      gray(`Initializing Khulnasoft remote cache with scope: "${owner}".`),
    );
  }
  return createClient(token, { teamId, product: 'nx' });
}
