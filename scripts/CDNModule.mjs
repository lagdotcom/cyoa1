/*eslint-env node*/

/** @type Record<string, { pattern: string, fn?: () => string } */
const externals = {
  inkjs: { pattern: "^inkjs" },
  gameanalytics: { pattern: "^gameanalytics$" },
};

const filter = new RegExp(
  Object.values(externals)
    .map((obj) => obj.pattern)
    .join("|"),
);

/** @type {import('esbuild').Plugin} */
const module = {
  name: "CDN",
  setup(build) {
    build.onResolve({ filter, namespace: "file" }, (args) => {
      let path = "<unknown>";
      for (const key in externals) {
        const obj = externals[key];
        if (new RegExp(obj.pattern).test(args.path)) {
          path = key;
          break;
        }
      }

      return { path, namespace: "cdn" };
    });
    build.onLoad({ filter: /.*/, namespace: "cdn" }, (args) => {
      const glob = externals[args.path];
      const exports = glob.fn ? glob.fn() : `globalThis.${args.path}`;

      console.log("injected", args.path);
      return {
        contents: `module.exports = ${exports};`,
        loader: "js",
      };
    });
  },
};
export default module;
