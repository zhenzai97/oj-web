import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { normalizePath } from 'vite';
// https://vitejs.dev/config/

// 如果类型报错，需要安装 @types/node: pnpm i @types/node -D
import path from 'path';

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve('./src/variable.scss'));

import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 别名配置
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  // css 相关的配置
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`
      }
    },
    // 进行 PostCSS 配置
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ['safari >= 6', 'ff >= 10']
        })
      ]
    }
  },
  build: {
    // 8 KB
    // 如果静态资源体积 >= 8KB，则提取成单独的文件
    // 如果静态资源体积 < 8KB，则作为 base64 格式的字符串内联
    // svg 格式的文件不受这个临时值的影响，始终会打包成单独的文件，因为它和普通格式的图片不一样，需要动态设置一些属性
    assetsInlineLimit: 8 * 1024
  },
})
