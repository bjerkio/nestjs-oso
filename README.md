# NestJS OSO – Authorization code for NestJS

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
![Release](https://github.com/bjerkio/nestjs-oso/workflows/Release/badge.svg)

[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/bjerkio/nestjs-oso.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/bjerkio/nestjs-oso/context:javascript)
[![codecov](https://codecov.io/gh/bjerkio/nestjs-oso/branch/main/graph/badge.svg)](https://codecov.io/gh/bjerkio/nestjs-oso)
[![Maintainability](https://api.codeclimate.com/v1/badges/85ecf3895e428d2c3064/maintainability)](https://codeclimate.com/github/bjerkio/nestjs-oso/maintainability)

> [oso][] is an open-source policy engine for authorization that’s embedded in
> your application. It provides a declarative policy language for expressing
> authorization logic. You define this logic separately from the rest of your
> application code, but it executes inside the application and can call directly
> into it.

`nestjs-oso` is a library that simplifies the implementation of [oso][] with
[NestJS][nest].

## Features

- **@OsoClass** decorator (automatically registers the class to use within Oso)
- **OsoService** (a ready to use NestJS service)

## Quickstart

```shell
▶ yarn add nestjs-oso oso
```

```typescript
import { Module } from '@nestjs/common';
import { OsoModule } from 'nestjs-oso';

@Module({
  imports: [
    OsoModule.forRoot({
      loadFile: './permissions.polar',
      // or
      // loadFile: './**/*.polar',
      // loadFiles: ['./rules/*.polar', './permissions.polar'],
    }),
  ],
})
export class AppModule {}
```

**Tip:** You don't have to apply either `loadFile` or `loadStr`. You can inject
`OsoService` and access the original API for oso anytime!

### Example

You can easily inject `OsoService` to be used in your services, controllers,
etc.

```typescript
import { Injectable } from '@nestjs/common';
import { OsoService } from 'nestjs-oso';

@Injectable()
export class AuthService {
  constructor(private oso: OsoService) {}
  /*
    Implementation that makes use of this.oso
  */
}
```

To register an class with `oso`, use the decorator:

```typescript
import { OsoClass } from 'nestjs-oso';

@OsoClass()
export class User {
  id: string;
}
```

This will automatically be registered using `registerClass` function in `oso`.

### Add Polar files to `assets` in `nest-cli.json`

In the `nest-cli.json` file, we add the `assets` property to distribute non-Typescript
files and watchAssets to turn on watching all non-Typescript-assets. In our case, we
probably want to add `*.polar` files to be automatically copied to the `dist` folder
and reloaded when changed.

You can find an example in [osohq/oso-nest-doc-mgmt](https://github.com/osohq/oso-nest-doc-mgmt/blob/main/nest-cli.json).

```json
{
  "compilerOptions": {
    "assets": ["**/*.polar"],
    "watchAssets": true
  }
}

```

## Contribute & Disclaimer

We love to get help 🙏 Read more about how to get started in
[CONTRIBUTING](CONTRIBUTING.md) 🌳

[oso]: https://github.com/osohq/oso
[nest]: https://github.com/nestjs/nest
