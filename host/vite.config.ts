import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import { defineConfig } from "vite";

const REMOTE_PORT = 3001;

export default defineConfig(async ({ command }) => ({
  base: "./",
  server: {
    port: 3000,
    strictPort: true,
    fs: {
      allow: ["."],
    },
    proxy: { "/src/remote_assets": `http://localhost:${REMOTE_PORT}/` },
    // *INFO: CORS is required to allow the remote to be loaded in the host
    cors: true, // Enable CORS for preview mode too
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
  // *INFO: this build config used for static build
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        minifyInternalExports: false,
        format: "esm",
      },
    },
  },
  plugins: [
    federation({
      name: "host",
      remotes: {
        remote: {
          type: "module",
          name: "remote",
          entry: `http://localhost:${REMOTE_PORT}/remoteEntry.js`,
          entryGlobalName: "remote",
          shareScope: "default",
        },
      },
      exposes: {},
      filename: "remoteEntry.js",
    }),
    vue(),
    vueJsx(),
  ],
}));
