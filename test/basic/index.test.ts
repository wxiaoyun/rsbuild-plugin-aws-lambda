import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';
import { createRsbuild } from '@rsbuild/core';
import { pluginAwsLambda } from '../../src';

const __dirname = dirname(fileURLToPath(import.meta.url));

test('exported handler function', async ({ page }) => {
  const rsbuild = await createRsbuild({
    cwd: __dirname,
    rsbuildConfig: {
      source: {
        entry: {
          index: path.join(__dirname, 'src/index.js'),
        },
      },
      output: {
        filename: {
          // So that we can await import the compiled module from a esm file
          js: '[name].cjs',
        },
      },
      plugins: [pluginAwsLambda()],
    },
  });

  await rsbuild.build();

  const distPath = path.join(__dirname, 'dist/index.cjs');
  const compiledModule = await import(distPath);

  const handler = compiledModule.default.handler;

  expect(handler).toBeDefined();
  expect(typeof handler).toBe('function');

  const result = await handler({}, {});
  expect(result.statusCode).toBe(200);
  expect(JSON.parse(result.body).message).toBe('Hello from Lambda!');
});
