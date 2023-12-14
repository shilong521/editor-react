/**
 * @description rollup base config
 */
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
// import del from 'rollup-plugin-delete';

export const extensions = ['.js', '.jsx', '.ts', '.tsx'];

/**
 * 生成 base conf
 * @param {string} format 'umd' 'esm'
 * @returns base conf
 */
function genBaseConf(format) {
  return {
    input: 'src/index.ts',
    output: {},
    plugins: [
      commonjs(),
      peerDepsExternal(), // 打包结果不包含 package.json 的 peerDependencies
      json({
        compact: true,
        indent: '  ',
        preferConst: true,
      }),
      typescript(),
      nodeResolve({
        browser: true, // 重要
        mainFields: format === 'esm' ? ['module', 'main'] : ['main'],
        extensions,
      }),
      // del({ targets: 'dist/*' }),
    ],
    external: ['react', 'react-dom'],
  };
}

export default genBaseConf;
