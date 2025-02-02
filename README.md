# rsbuild-plugin-aws-lambda

A Rsbuild plugin that configures your build for AWS Lambda deployment.

## Installation

```
# npm
npm install rsbuild-plugin-aws-lambda -D

# yarn
yarn add rsbuild-plugin-aws-lambda -D

# pnpm
pnpm add rsbuild-plugin-aws-lambda -D
```

## Usage

Add the plugin to your Rsbuild config:

``` typescript
import { pluginAwsLambda } from 'rsbuild-plugin-aws-lambda';

export default {
  plugins: [pluginAwsLambda()],
};
```

This plugin will:
- Set the build target to `node` by default
- Configure the output library type as `commonjs2` for AWS Lambda compatibility

## Configuration

You can customize the plugin behavior with options:

``` typescript
export default {
  plugins: [
    pluginAwsLambda({
      override: {
        target: 'node', // 'node' | 'web' | 'web-worker'
        library: {
          type: 'commonjs2',
          // other library options...
        },
      },
    }),
  ],
};
```

### Options

#### `override.target`
- Type: `'node' | 'web' | 'web-worker'`
- Default: `'node'`
- Purpose: Specifies the build target environment

#### `override.library`
- Type: `LibraryOptions`
- Default: `{ type: 'commonjs2' }`
- Purpose: Configures the output library format

## License

MIT License