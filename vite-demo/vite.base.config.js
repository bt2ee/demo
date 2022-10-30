import { defineConfig } from "vite"

export default defineConfig({
  optimizeDeps: {
    exclude: [] // 不进行依赖预构建
  },
  envPrefix: 'ENV', // vite 注入客户端环境变量前缀
})
