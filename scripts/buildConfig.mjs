/*eslint-env node*/

import { config as loadDotEnvConfig } from "dotenv";

import CDNModule from "./CDNModule.mjs";
import InkModule from "./InkModule.mjs";

const envConfig = loadDotEnvConfig();
const define = {
  [`process.env.APP_BUILD_VERSION`]: JSON.stringify(
    process.env.npm_package_version,
  ),
};

if (envConfig.parsed) {
  for (const k in envConfig.parsed)
    define[`process.env.${k}`] = JSON.stringify(process.env[k]);
  console.log(`[env] loaded ${Object.keys(define).length} values`);
} else
  console.warn(
    `[env] failed to load, ${envConfig.error?.message ?? "unknown error"}`,
  );

/** @type {import('esbuild').BuildOptions} */
const config = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  sourcemap: true,
  outfile: "docs/bundle.js",
  define,
  // minify: true,
  plugins: [CDNModule, InkModule()],
  loader: {
    ".json": "file",
    ".ogg": "file",
    ".png": "file",
  },
};
export default config;
