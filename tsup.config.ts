import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    external: ["react"],
    banner: { js: '"use client";' },
  },
  {
    entry: ["src/tailwind-preset.ts"],
    format: ["esm", "cjs"],
    dts: true,
  },
]);
