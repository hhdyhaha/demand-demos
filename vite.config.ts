import {defineConfig,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    const env = loadEnv(mode, process.cwd())
    return {
        base: './',
        plugins: [
            vue(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
        server: {
            host: '0.0.0.0',
            open: true,
            proxy: {
                [env.VITE_APP_BASE_API]: {
                    target: 'https://apifoxmock.com/m1/5028648-4688702-default',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
                }
            }
        },
        resolve: {
            alias: {
                // 关键代码
                '@': path.resolve(__dirname, './src')
            }
        }
    }

})
