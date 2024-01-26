# Khulnasoft Remote Caching SDK

[![@khulnasoft/remote](https://img.shields.io/npm/v/@khulnasoft/remote)](https://npmjs.org/@khulnasoft/remote)

When you build your project a set of build outputs are created. These build outputs are called artifacts and many times they can be reused and shared with your team running the same build. With [Khulnasoft's Remote Cache API](https://khulnasoft.com/docs/rest-api#endpoints/artifacts), you can easily share these artifacts with your team or your CI environments.

The Khulnasoft Remote Caching SDK is a thin layer over our existing API can be added to your build system to enable remote artifact caching.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Getting Started](#getting-started)
  - [Authentication](#authentication)
  - [Using buffers](#using-buffers)
  - [Using streams](#using-streams)
- [Creating a Remote Cache Client](#creating-a-remote-cache-client)
  - [Checking artifact exists](#checking-artifact-exists)
  - [Retrieve artifact](#retrieve-artifact)
  - [Store artifact](#store-artifact)
  - [Errors](#errors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```sh
npm install @khulnasoft/remote
```

## Getting Started

To get started you will need a Khulnasoft Access Token and an optional team ID. You can create a khulnasoft access token in your [account settings](https://khulnasoft.com/account/tokens). Your team ID can be found under your team settings page.

Every artifact on Khulnasoft's Remote Cache is keyed by your Khulnasoft `teamId` and the artifact `hash`.

- A valid `teamId` is necessary to share artifacts with your team. Otherwise, artifacts will only be accessible from the personal account of the Khulnasoft Access token used to initialize the client.
- The `hash` is provided by your build system and is a unique indentifier for the task that generated artifacts. The `hash` is not a function of the artifact itself, but rather it's computed from the task graph your build system uses.

### Authentication

Use a [Khulnasoft Access Token](https://khulnasoft.com/docs/rest-api#introduction/api-basics/authentication) with access to the requested `teamId` in the `RemoteClient` to use this SDK.

### Using buffers

```js
import fs from 'fs-extra';
import { createClient } from '@khulnasoft/remote';

const remote = createClient('<token>', {
  teamId: '<teamId>',
  // e.g. turbo, nx, rush, etc.
  product: 'your-build-system',
});

async function getArtifact(hash) {
  const exists = await remote.exists(hash).send();
  if (!exists) {
    return false;
  }

  // Process the incoming buffer to your local cache
  const buf = await remote.get(hash).buffer();
  await fs.writeFile(hash, buf);
  return true;
}

async function putArtifact(hash, buf) {
  await remote.put(hash).buffer(buf);
}
```

### Using streams

```js
import fs from 'fs-extra';
import stream from 'stream';
import { promisify } from 'util';
import { createClient } from '@khulnasoft/remote';

const pipeline = promisify(stream.pipeline);

const remote = createClient('<token>', {
  teamId: '<teamId>',
  // e.g. turbo, nx, rush, etc.
  product: 'your-build-system',
});

async function getArtifact(hash) {
  const exists = await remote.exists(hash).send();
  if (!exists) {
    return false;
  }
  const readStream = await remote.get(hash).stream();
  // Process the incoming stream to your local cache
  const writeStream = fs.createWriteStream(hash);
  await pipeline(readStream, writeStream);
  return true;
}

async function putArtifact(hash) {
  // Create the artifact stream from your local cache
  const readStream = fs.createReadStream(hash);

  // Push to Khulnasoft remote cache
  await remote.put(hash).stream(readStream);
}
```

## Creating a Remote Cache Client

```js
const remote = createClient('<token>', {
  // Khulnasoft team ID. When this is not specified, the personal account
  // associated with the provided `token` will be used. Specify a `teamId`
  // to share artifacts with the team.
  teamId: '<teamId>',
  // The build system you are using. For example turbo, nx, rush, etc.
  product: 'your-build-system',
});
```

### Checking artifact exists

Return `true` if an artifact exists in the remote cache. Otherwise return `false`.

```js
const exists = await remote.exists('6079a2819459d70b').send();
```

### Retrieve artifact

Returns an artifact from the remote cache as a buffer

```js
const buf = await remote.get('6079a2819459d70b').buffer();
```

Returns an artifact from the remote cache as a readable stream

```js
const readStream = await remote.get('6079a2819459d70b').stream();
```

### Store artifact

Uploads an artifact to the remote cache from a buffer

```js
await remote
  .put('6079a2819459d70b', {
    // `duration` is the compute time to create the artifact in milliseconds
    duration: 8030,
  })
  .buffer(buf);
```

Uploads an artifact to the remote cache from a readable stream

```js
await remote
  .put('6079a2819459d70b', {
    // `duration` is the compute time to create the artifact in milliseconds
    duration: 8030,
  })
  .stream(readStream);
```

### Errors

Throws errors in the format and for the reasons defined on the [Khulnasoft Rest API](https://khulnasoft.com/docs/rest-api#errors)
