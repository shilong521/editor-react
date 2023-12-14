/**
 * @description rollup prod config
 */

import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup';
import { visualizer } from 'rollup-plugin-visualizer';
import genBaseConf from './rollup.base';
import { extensions } from './rollup.base';

/**
 * 生成 prd config
 * @param {string} format 'umd' 'esm'
 */
function genProdConf(format) {
  const { input, output = {}, plugins = [], external } = genBaseConf(format);
  const finalPlugins = [
    ...plugins,
    babel({
      rootMode: 'upward',
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      include: 'src/**',
      extensions,
    }),
    postcss({
      plugins: [
        autoprefixer(),
        cssnano(), // 压缩 css
      ],
      extract: 'css/style.css',
    }),
    cleanup({
      comments: 'none',
      extensions: ['.ts', '.tsx'],
    }),
    terser(), // 压缩 js
    visualizer(), //查看打包体积
  ];

  return {
    input,
    output: {
      ...output,
    },
    external,
    plugins: finalPlugins,
  };
}

export default genProdConf;
