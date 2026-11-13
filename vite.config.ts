import { defineConfig } from "vitest/config";
import dsv from "@rollup/plugin-dsv";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      insertTypesEntry: true,
    }),
    dsv(),
  ],
  build: {
    lib: {
      entry: "./src/index.tsx",
      name: "FilesViewer",
      formats: ["es"],
      fileName: "files-viewer",
    },
    cssCodeSplit: false,
    cssMinify: false,
    sourcemap: false,
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "react-dom",
        "react-dom/client",
        "react-pdf",
        "react-pdf/dist/Page/AnnotationLayer.css",
        "react-pdf/dist/Page/TextLayer.css",
        "papaparse",
        "mustache",
        "core-js",
        /^core-js\//,
      ],
      output: {
        exports: "named",
        assetFileNames: "index[extname]",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
