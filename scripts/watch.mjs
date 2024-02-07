/*eslint-env node*/

import { context } from "esbuild";

import config from "./buildConfig.mjs";

const result = await context(config);
const serve = await result.serve({ servedir: "docs", port: 8080 });
console.log(
  `Serving: http://${serve.host === "0.0.0.0" ? "localhost" : serve.host}:${
    serve.port
  }`,
);
