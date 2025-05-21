import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    Components({
      // 指定组件存放目录（可选）
      dirs: ['src/components'],
      // 是否支持自动注册全局组件（默认是按需加载）
      globalNamespaces: [],
      // 组件名称转换方式（PascalCase）
      transformer: 'vue3',
      // 自动导入后是否注册为全局组件
      dts: true, // 生成一个 components.d.ts 文件用于类型提示
    }),
  ],
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:8080',
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/api/,'')
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src' // 将 @ 映射到 src 目录
    }
  }
})
