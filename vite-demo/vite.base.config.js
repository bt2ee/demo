import postcssPresetEnv from "postcss-preset-env"
import { defineConfig } from "vite"
import path from 'path'
// import { ViteAliases } from "vite-aliases"
import MyViteAliases from './plugins/ViteAliases'
// import { createHtmlPlugin } from 'vite-plugin-html'
import CreateHtmlPlugin from "./plugins/CreateHtmlPlugin"
import VitePluginMock from './plugins/VitePluginMock'
import { viteMockServe } from "vite-plugin-mock";
import checker from "vite-plugin-checker"

export default defineConfig({
  // resolve: {
  //   alias: {
  //     "@": './src'
  //   }
  // },
  optimizeDeps: {
    exclude: [] // 不进行依赖预构建
  },
  envPrefix: 'ENV', // vite 注入客户端环境变量前缀
  css: { // css行为配置
    modules: { // css 模块化覆盖
      localsConvention: "camelCase", // 转换类名；camelCase： 转成驼峰；camelCaseOnly: 只有驼峰；dashes: 转中划线；
      // scopeBehaviour: "local", // 配置当前模块化行为是全局还是模块化，local 开启模块化
      // generateScopedName: "[name]_[local]_[hash:S]", // 生成类名规则，依据 postcss
      // hashPrefix: '', // hash 前缀
      // globalModulePaths: [], // 不参与 css module 的文件路径
    },
    preprocessorOptions: { // 预处理器配置覆盖
      less: {
        math: "always",
        globalVars: {
          mainColor: "red" // webpack 中可以在 less-loader 定义
        }
      },
      sass: {}
    },
    devSourcemap: true, // sourceMap 索引
    postcss: {
      plugins: [postcssPresetEnv({
        // 有一些全局变量需要记录提供编译
        importFrom: path.resolve(__dirname, './variable.css')
      })],
    }
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "[hash].[name].[ext]"
      }
    },
    assetsInlineLimit: 4096, // 小于4kb转成 base64 字符
    outDir: 'dist', // 打包别名
    assetsDir: 'static', // 静态资源别名
    emptyOutDir: true, // 默认 true，清除输出目录所有文件
  },
  plugins: [
    MyViteAliases(),
    // ViteAliases(), // 自动生成别名
    CreateHtmlPlugin({
      inject: {
        data: {
          title: "首页"
        }
      }
    }),
    // viteMockServe()
    VitePluginMock(),
    // checker({ typescript: true }) ts检查
  ]
})
