/**
 * @description 创建 rollup 配置
 */

import { merge } from 'lodash';
import genProdConf from './rollup.prod.config';

/**
 * 生成单个 rollup 配置
 * @param {object} customConfig { input, output, plugins ... }
 */
export function createRollupConfig(customConfig = {}) {
  const { input, output = {}, plugins = [] } = customConfig;
  const { format } = output;

  const config = {
    input: input || genProdConf(format).input,
    output,
    plugins,
  };

  const res = merge({}, genProdConf(format), config);
  return res;
}
