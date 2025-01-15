import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import { defineConfig } from "vite";

const CORE_REMOTE_PORT = 3001;
const FLEET_REMOTE_PORT = 3002;

// Helper to get remote URLs based on environment
const getRemoteUrls = () => {
  return {
    core: `http://localhost:${CORE_REMOTE_PORT}`,
    fleet: `http://localhost:${FLEET_REMOTE_PORT}`,
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineConfig(async ({ command }) => {
  const remoteUrls = getRemoteUrls();

  return {
    base: "./",
    server: {
      port: 3000,
      strictPort: true,
      fs: {
        allow: ["."],
      },
      proxy: {
        "/src/remote_assets": `http://localhost:${CORE_REMOTE_PORT}/`,
      },
      // *INFO: CORS is required to allow the remote to be loaded in the host
      cors: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, Content-Type, Authorization",
      },
    },
    preview: {
      cors: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, Content-Type, Authorization",
      },
    },
    resolve: {
      alias: {
        vue: path.resolve(
          __dirname,
          "./node_modules/vue/dist/vue.runtime.esm-bundler.js"
        ),
        pinia: path.resolve(__dirname, "./node_modules/pinia/dist/pinia.mjs"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "vuetify/styles" as *;`,
        },
      },
    },
    // *INFO: this build config can able work with static page
    build: {
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          minifyInternalExports: false,
          format: "esm",
        },
        chunkFileNames: () => {
          return "[name]-[hash].js";
        },
      },
      modulePreload: {
        polyfill: false,
      },
    },
    plugins: [
      federation({
        name: "host",
        filename: "remoteEntry.js",
        remotes: {
          coreRemote: {
            type: "module",
            name: "coreRemote",
            entry: `${remoteUrls.core}/remoteEntry.js`,
            entryGlobalName: "coreRemote",
            shareScope: "default",
          },
          fleetRemote: {
            type: "module",
            name: "fleetRemote",
            entry: `${remoteUrls.fleet}/remoteEntry.js`,
            entryGlobalName: "fleetRemote",
            shareScope: "default",
          },
        },
        shared: {
          vue: {
            singleton: true,
          },
          "vue-router": {
            singleton: true,
          },
          vuetify: { singleton: true },
        },
      }),
      vue(),
      vueJsx(),
    ],
  };
});
