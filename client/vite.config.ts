import {defineConfig} from 'vite'
// @ts-ignore
import path from 'path'

export default defineConfig({
    server: {
        port: 3000,
        strictPort: true,
        host: '0.0.0.0',
        allowedHosts: true,
        proxy: {
            '/api': 'http://localhost:9000',
        },
    },
    build: {
        outDir: 'build'
    },
    resolve: {
        alias: {
            '@dummy-node/api': path.resolve(__dirname, '../api/src'),
        },
    },
    optimizeDeps: {
        exclude: ['@dummy-node/api'],
    },
})
