import type { RsbuildPlugin, RspackChain } from '@rsbuild/core';

export const PLUGIN_AWS_LAMBDA_NAME = 'rsbuild:aws-lambda';

type Target = 'node' | 'web' | 'web-worker' | undefined;
type Library = Parameters<RspackChain['output']['library']>[0];
export type PluginAwsLambdaOptions = {
  override: {
    target?: Target;
    library?: Library;
  };
};

export const pluginAwsLambda = (
  options?: PluginAwsLambdaOptions,
): RsbuildPlugin => ({
  name: PLUGIN_AWS_LAMBDA_NAME,

  setup(api) {
    const { override } = options ?? {};
    const { target = 'node', library = { type: 'commonjs2' } } = override ?? {};

    api.modifyRsbuildConfig((cfg) => {
      if (!cfg.output) {
        cfg.output = {};
      }
      cfg.output.target = target;
    });

    api.modifyBundlerChain((chain) => {
      chain.output.library(library);
    });
  },
});
