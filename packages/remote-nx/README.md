# @khulnasoft/remote-nx

[![@khulnasoft/remote-nx](https://img.shields.io/npm/v/@khulnasoft/remote-nx)](https://npmjs.org/@khulnasoft/remote-nx)

This project implements a task runner for [@nrwl/nx](https://nx.dev) that caches build artifacts in the Khulnasoft Remote Cache.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Setup](#setup)
- [Usage](#usage)
- [Run it 🚀](#run-it-)
- [Advanced Configuration](#advanced-configuration)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Setup

Let's assume you already have a Khulnasoft Account. For the rest of the guide you will need a Khulnasoft Access Token and your team ID. You can create a khulnasoft access token in your [account settings](https://khulnasoft.com/account/tokens). Your team ID can be found under your team settings page.

Have those handy as we'll need them to authorize your monorepo to Khulnasoft's remote cache.

## Usage

```sh
npm install --save-dev @khulnasoft/remote-nx
```

In your `nx.json` file you will find a `tasksRunnerOptions` field. Update this field so that it's using the installed `@khulnasoft/remote-nx`

```jsonc filename=nx.json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "@khulnasoft/remote-nx",
      "options": {
        "cacheableOperations": ["build", "test", "lint", "e2e"],
        "token": "<token>",
        "teamId": "<teamId>",
      },
    },
  },
}
```

You can specify your `token` and `teamId` in your nx.json or set them as environment variables.

| Parameter                     | Description                                               |  Environment Variable / .env       | `nx.json` |
| ----------------------------- | --------------------------------------------------------- | ---------------------------------- | --------- |
| Khulnasoft Access Token       | Khulnasoft access token with access to the provided team  | `NX_KHULNASOFT_REMOTE_CACHE_TOKEN` | `token`   |
| Khulnasoft Team ID (optional) | The Khulnasoft Team ID that should share the Remote Cache | `NX_KHULNASOFT_REMOTE_CACHE_TEAM`  | `teamId`  |

## Run it 🚀

Clear your local cache and rebuild your project.

```sh
nx reset
nx build
```

## Advanced Configuration

| Option       | Description                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------- |
| `verbose`    | Set to receive full stack traces whenever errors occur. Best used for debugging. **Default:** `false` |
| `silent`     | Set to mute success and info logs. **Default:** `false`                                               |
| `dotenv`     | Set to `false` to disable reading `.env` into `process.env`. **Default:** `true`                      |
| `dotenvPath` | Set to read `.env` files from a different folder.                                                     |

```json
"tasksRunnerOptions": {
  "default": {
    "runner": "@khulnasoft/remote-nx",
    "options": {
      "verbose": true,
      "silent": true
    }
  }
}
```

---

Credit to [`nx-remotecache-custom` examples](https://www.npmjs.com/package/nx-remotecache-custom).
