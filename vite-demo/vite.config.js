import { defineConfig, loadEnv } from "vite"
import viteBaseConfig from "./vite.base.config"
import viteDevConfig from "./vite.dev.config"
import viteProdConfig from './vite.prod.config'

const envResolver = {
  "serve": () => {
    return ({...viteBaseConfig, ...viteDevConfig})
  },
  "build": () => ({...viteBaseConfig, ...viteProdConfig}),
}

export default defineConfig(({ command, mode }) => {
  // console.log(process, 'process')
  // vite 不是直接注入，但是提供手动加载方法 loadEnv
  const env = loadEnv(mode, process.cwd(), '')
  // console.log(env, '===env')
  return envResolver[command]()
})

// 语法提示支持
// /** @type import('vite').UserConfig */
// const viteConfig = {
//   optimizeDeps: {

//   }
// }

// export default viteConfig
