import { fileURLToPath, URL } from 'node:url'

import {defineConfig, PluginOption} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

function renameIndexPluigin(newFilename: string | undefined): PluginOption {
  if( !newFilename ) {
    return false;
  }
  return {
    name: "renameIndex",
    enforce: "post",
    generateBundle(_, bundle) {
      const indexHtml = bundle["index.html"];
      indexHtml.fileName = newFilename
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    renameIndexPluigin("./resources/views/frontend/index.blade.php"),
    vueDevTools(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  build: {
    emptyOutDir: false,
    manifest: true,
    assetsDir: "./public/assets"
  }
})
