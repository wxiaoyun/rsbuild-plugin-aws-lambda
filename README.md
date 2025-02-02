# rsbuild-plugin-aws-lambda

A Rsbuild plugin that configures your build for AWS Lambda deployment. This plugin automatically sets up the correct build configuration for AWS Lambda Node.js runtime compatibility.

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
- Configure the output library type as `commonjs2` for AWS Lambda compatibility (AWS Lambda expects CommonJS modules by default)

### AWS Lambda Handler Configuration

After building your project, you can configure your Lambda function's handler using the format:
```
<filename>.<handler>
```

For example, if your entry file is `src/index.js` and exports a handler function:

``` typescript
// src/index.js
export const handler = async (event, context) => {
  // Your Lambda function logic
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success!' })
  };
};
```

Set your Lambda handler configuration to: `index.handler`

## Plugin Configuration

You can override the plugin behavior with options:

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
- Purpose: Specifies the build target environment. For AWS Lambda, this should typically remain as `'node'`

#### `override.library`
- Type: `LibraryOptions`
- Default: `{ type: 'commonjs2' }`
- Purpose: Configures the output library format. The default `commonjs2` setting ensures compatibility with AWS Lambda's Node.js runtime

## License

MIT License

[Source for AWS Lambda Node.js handler information](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)