import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import localScopedModules from 'vite-plugin-local-scoped-modules'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    // ssr: {

    //     noExternal: ['@icon-park/react/es/icons/HamburgerButton.js']

    // },

    build: {
        assetsInlineLimit: 12 * 1024,
        watch: true,

        minify: false,


    },
    plugins: [
        // legacy({
        //     targets: ['ie >= 11'],
        //     additionalLegacyPolyfills: ['regenerator-runtime/runtime']
        // }),

        localScopedModules({
            "calleeNames": ['import'],
            "scopes": [{
                    "name": "@src",
                    "dir": "~/src"
                },
                {
                    "name": "@components",
                    "dir": "~/src/components"
                },
                {
                    "name": "@assets",
                    "dir": "~/src/assets"
                },
                {
                    "name": "@nifi",
                    "dir": "~/src/nifi"
                },
                {
                    "name": "@constants",
                    "dir": "~/src/constants"
                },
                {
                    "name": "@convert",
                    "dir": "~/src/convert"
                },
                {
                    "name": "@redux",
                    "dir": "~/src/redux"
                }
            ]
        }),
        reactRefresh(),
    ]
})