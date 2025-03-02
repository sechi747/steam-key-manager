import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        output: {
          format: 'es'
        }
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        output: {
          format: 'es'
        }
      }
    }
  },
  renderer: {
    plugins: [
      vue(),
      Unocss(),
      vueJsx(),
      AutoImport({
        imports: ['vue'],
        resolvers: [TDesignResolver({
          library: 'vue-next',
        })],
      }),
      Components({
        resolvers: [TDesignResolver({
          library: 'vue-next',
        })],
      }),
    ],
    base: './',
    resolve: {
      alias: {
        '@renderer': path.resolve(__dirname, 'src/renderer/'),
      },
    },
  },
})
