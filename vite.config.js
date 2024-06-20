import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

const config = defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "tune",
            formats: ["es"],
        },
        outDir: "dist",
    },
    plugins: [dts({ rollupTypes: true })],
});

export default config;
