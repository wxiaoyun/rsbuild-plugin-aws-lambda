import { defineConfig } from '@rsbuild/core';
import { pluginAwsLambda } from '../src';

export default defineConfig({
  plugins: [pluginAwsLambda()],
});
