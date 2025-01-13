import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { writeFileSync } from "fs";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(async ({ command, mode }) => {
  const selfEnv = loadEnv(mode, process.cwd());
  return {
    base: "./",
    server: {
      port: 3002,
      strictPort: true,
      fs: {
        allow: ["."],
      },
      cors: true, // Enable CORS for preview mode too
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, Content-Type, Authorization",
      },
    },
    plugins: [
      {
        name: "generate-enviroment",
        options: function () {
          console.info("selfEnv", selfEnv);
          writeFileSync(
            "./src/enviroment.ts",
            `export default ${JSON.stringify(selfEnv, null, 2)};`
          );
        },
      },
      federation({
        filename: "remoteEntry.js",
        name: "fleet-remote",
        exposes: {
          "./remoteModule": "./src/remote.ts",
        },
        shared: {
          vue: {
            singleton: true,
          },
          "vue-router": {
            singleton: true,
          },
        },
      }),
      vue(),
      vueJsx(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        vue: path.resolve(
          __dirname,
          "./node_modules/vue/dist/vue.runtime.esm-bundler.js"
        ),
        pinia: path.resolve(__dirname, "./node_modules/pinia/dist/pinia.mjs"),
      },
    },
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
      modulePreload: {
        polyfill: false,
      },
    },
  };
});
