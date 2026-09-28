import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  target: 'es2020',
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  // 高亮器随包构建，浏览器直接加载 dist/index.js 时不需要再解析裸模块名。
  noExternal: ['highlight.js'],
  splitting: false,
  outExtension: ({ format }) => ({ js: format === 'cjs' ? '.cjs' : '.js' })
})
