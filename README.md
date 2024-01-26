<p align="center">
  <img width="60%" alt="@khulnasoft/remote-cache" src="https://user-images.githubusercontent.com/2933988/191345216-e16244e0-f9ae-45bc-abe8-1942031d2b2a.png#gh-dark-mode-only">
  <img width="60%" alt="@khulnasoft/remote-cache" src="https://user-images.githubusercontent.com/2933988/191345252-678e203e-3810-4501-b7e5-b6230cad89de.png#gh-light-mode-only">
</p>

<p align="center">
  <a aria-label="Khulnasoft logo" href="https://khulnasoft.com">
    <img src="https://img.shields.io/badge/MADE%20BY%20Khulnasoft-000000.svg?style=for-the-badge&logo=khulnasoft&labelColor=000000&logoWidth=20">
  </a>
 </p>

# Khulnasoft Remote Cache SDK

[![Node CI](https://github.com/khulnasoft/remote-cache/actions/workflows/ci.yml/badge.svg)](https://github.com/khulnasoft/remote-cache/actions/workflows/ci.yml)

An SDK for Remote Caching on [Khulnasoft](https://khulnasoft.com)

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Summary](#summary)
- [Examples](#examples)
- [Packages](#packages)
- [Contributing](#contributing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Summary

Remote Computation Caching (or just Remote Caching) is a feature of advanced build tools like [Turborepo](https://turborepo.org/), [Bazel](https://bazel.build/), and [Buck](https://buck.build/) to cache compiled computations and code artifacts in the cloud with the hope of recycling them across machines to reduce overall build/computation time. The key idea is that you "never recompute work that’s already been done before."

> Through Khulnasoft's Remote Caching API, teams can leverage this advanced primitive without needing to think about hosting, infrastructure, or maintenance.

This repository holds the source code to the Khulnasoft Remote Caching SDK as well as examples of build systems that leverage it. For those looking to integrate their build systems with Khulnasoft Remote Caching, you've come to the right place. The [@khulnasoft/remote SDK](packages/remote/) is a thin layer over our existing [REST API](https://khulnasoft.com/docs/rest-api#endpoints/artifacts). We've provided packages that implement this SDK for [Nx](packages/remote-nx/) and [Rush](packages/remote-rush/) build tools. See our [examples list](#examples) of build systems using the Khulnasoft Remote Cache.

## Examples

Build systems and tools that integrate with Khulnasoft Remote Caching.

- [Turborepo](examples/turborepo)
- [Rush](examples/rush)
- [Nx](examples/nx)

## Packages

| Name                                         | Description                                              | Package                                                                                                           |
| -------------------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [@khulnasoft/remote](packages/remote/)           | An SDK for remote artifact caching on Khulnasoft             | [![@khulnasoft/remote](https://img.shields.io/npm/v/@khulnasoft/remote)](https://npmjs.org/@khulnasoft/remote)                |
| [@khulnasoft/remote-nx](packages/remote-nx/)     | Remote caching plugin for Nx using Khulnasoft Remote Cache   | [![@khulnasoft/remote-nx](https://img.shields.io/npm/v/@khulnasoft/remote-nx)](https://npmjs.org/@khulnasoft/remote-nx)       |
| [@khulnasoft/remote-rush](packages/remote-rush/) | Remote caching plugin for Rush using Khulnasoft Remote Cache | [![@khulnasoft/remote-rush](https://img.shields.io/npm/v/@khulnasoft/remote-rush)](https://npmjs.org/@khulnasoft/remote-rush) |

## Contributing

To develop on this package see the [CONTRIBUTING.md](./CONTRIBUTING.md).
