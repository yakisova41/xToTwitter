import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import path from "path";
import { banner } from "./banner.js";
import copy from "rollup-plugin-copy";

/** @type {import('rollup').RollupOptions} */
const conf = {
  input: path.resolve("./src/main.ts"),
  plugins: [
    commonjs({
      include: ["node_modules/**"],
    }),
    typescript({
      tsconfig: "tsconfig.json",
      sourcemap: true,
    }),
    copy({
      targets: [
        {
          src: [
            "extension/manifest.json",
            "extension/_locales",
            "extension/assets",
            "extension/sw_icons",
            "extension/twitterManifest.json",
            "extension/main-world.js",
          ],
          dest: "dist",
        },
      ],
    }),
  ],
  output: [
    {
      banner: banner(false),
      file: "dist/userscript.user.js",
      format: "esm",
      sourcemap: false,
    },
  ],
};

export default [conf];
