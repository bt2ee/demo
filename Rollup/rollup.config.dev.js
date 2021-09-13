import { terser } from "rollup-plugin-terser"
import typescript from '@rollup/plugin-typescript'
// import postcss from 'rollup-plugin-postcss'
import livereload from "rollup-plugin-livereload"
import serve from 'rollup-plugin-serve'

export default {
  input: 'src/main.js', // 入口
  output: { // 出口配置
    file: 'dist/bundle.cjs.js', // 打包的文件位置和文件名
    format: 'cjs', // 输出格式 CommonJS
    //  五种输出格式：amd /  es6 / iife / umd / cjs
    name: 'bundleName', // 包的全局变量名
    sourcemap: true,
  },
  plugins: [
      typescript(),
      terser(), // 代码压缩
      // postcss(),
      livereload(), // 热更新
      serve({
        open: true,
        port: 3888,
        contentBase: ''
      })
    ]
    // external: ['lodash']
}