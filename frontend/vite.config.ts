import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv, PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";

function renameIndexPlugin(newFilename: string | undefined): PluginOption {
  if (!newFilename) {
    return false;
  }
  return {
    name: "renameIndex",
    enforce: "post",
    generateBundle(_, bundle) {
      const indexHtml = bundle["index.html"];
      indexHtml.fileName = newFilename;
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      vue(),
      vueDevTools(),
      tailwindcss(),
      renameIndexPlugin("../resources/views/frontend/index.blade.php"),
    ],

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },

    build: {
      outDir: "./dist/public",
      emptyOutDir: false,
      assetsDir: "./assets",
      manifest: true,
    },

    server: {
      host: true,
      proxy: {
        "/api": {
          target: env.API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
