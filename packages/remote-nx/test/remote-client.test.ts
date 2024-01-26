import { describe, expect, it, afterEach, vi } from 'vitest';
import * as exports from '@khulnasoft/remote';
import { getKhulnasoftRemoteCacheClient } from '../src/remote-client';
import type { KhulnasoftRemoteCacheOptions } from '../src/remote-client';

describe('remote-client', () => {
  const originalEnv = process.env;

  afterEach(() => {
    vi.resetAllMocks();
    process.env = originalEnv;
  });

  it('to creates client', () => {
    const options: KhulnasoftRemoteCacheOptions = {
      teamId: 'team_id',
      token: 'token',
      lifeCycle: {},
    };
    const client = getKhulnasoftRemoteCacheClient(options);
    expect(client).toBeDefined();
  });

  it('to throw error with missing token', () => {
    const options: KhulnasoftRemoteCacheOptions = {
      teamId: 'team_id',
      lifeCycle: {},
    };

    expect(() => getKhulnasoftRemoteCacheClient(options)).toThrowError(
      'Missing a Khulnasoft access token',
    );
  });

  it('allows using NX_KHULNASOFT_REMOTE_CACHE_TOKEN var as token', () => {
    const options: KhulnasoftRemoteCacheOptions = {
      teamId: 'team_id',
      lifeCycle: {},
    };
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    process.env.NX_KHULNASOFT_REMOTE_CACHE_TOKEN = 'token';
    expect(() => getKhulnasoftRemoteCacheClient(options)).not.toThrowError();
  });

  it('overrides param token and team with NX_ env vars', () => {
    const options: KhulnasoftRemoteCacheOptions = {
      token: 'token_unused',
      teamId: 'team_id_unused',
      lifeCycle: {},
    };
    const spy = vi.spyOn(exports, 'createClient');
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    process.env.NX_KHULNASOFT_REMOTE_CACHE_TOKEN = 'token_nv_env';
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    process.env.NX_KHULNASOFT_REMOTE_CACHE_TEAM = 'team_nv_env';
    expect(() => getKhulnasoftRemoteCacheClient(options)).not.toThrowError();
    expect(spy).toBeCalledWith('token_nv_env', {
      teamId: 'team_nv_env',
      product: 'nx',
    });
  });

  it('KHULNASOFT_ARTIFACTS_* env overrides all', () => {
    const options: KhulnasoftRemoteCacheOptions = {
      token: 'token_unused',
      teamId: 'team_id_unused',
      lifeCycle: {},
    };
    const spy = vi.spyOn(exports, 'createClient');
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    process.env.NX_KHULNASOFT_REMOTE_CACHE_TOKEN = 'token_nv_env';
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    process.env.NX_KHULNASOFT_REMOTE_CACHE_TEAM = 'team_nv_env';
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    process.env.KHULNASOFT_ARTIFACTS_TOKEN = 'token_khulnasoft_env';
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    process.env.KHULNASOFT_ARTIFACTS_OWNER = 'team_khulnasoft_env';

    expect(() => getKhulnasoftRemoteCacheClient(options)).not.toThrowError();
    expect(spy).toBeCalledWith('token_khulnasoft_env', {
      teamId: 'team_khulnasoft_env',
      product: 'nx',
    });
  });
});
