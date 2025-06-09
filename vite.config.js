import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const projectName = 'nt-roulette'
const libConfig = {
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, './src'),
      name: projectName,
      fileName: (format) => `${projectName}.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == 'style.css') return `${projectName}-css.css`
          return assetInfo.name
        },
      },
    },
    sourcemap: true,
  },
}

const docsConfig = {
  root: './demo',
  base: process.env.NODE_ENV === 'production' ? `/${projectName}/` : '/',
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./demo/src', import.meta.url)),
    },
  },
  // server: {
  //   port: 5179,
  // },
}

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const executionMode = process.env.MODE || 'lib'

  const mode = command === 'build' ? 'production' : 'development'

  if (executionMode === 'demo') {
    return { ...docsConfig, mode }
  } else {
    return { ...libConfig, mode }
  }
})
