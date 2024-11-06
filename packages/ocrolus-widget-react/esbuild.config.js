import esbuild from "esbuild";
import { TsconfigPathsPlugin } from "@esbuild-plugins/tsconfig-paths";
import path from "path";
import { readFileSync, copyFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tsconfigPath = path.resolve(__dirname, "./tsconfig.json");
const tsconfig = JSON.parse(readFileSync(tsconfigPath, "utf8"));

const commonConfig = {
  entryPoints: ["src/index.ts"],
  sourcemap: true,
  target: "esnext",
  loader: { ".tsx": "tsx" },
  plugins: [TsconfigPathsPlugin({ tsconfig })],
  define: { "process.env.NODE_ENV": '"development"' },
  external: ["react", "react-dom"],
};

const buildCJS = esbuild.build({
  ...commonConfig,
  outdir: "dist/cjs",
  format: "cjs",
  bundle: true,
});

const buildESM = esbuild.build({
  ...commonConfig,
  outdir: "dist/esm",
  format: "esm",
  bundle: true,
});

Promise.all([buildCJS, buildESM])
  .then(() => {
    // Copy type declaration files to dist/types
    const srcTypesDir = path.resolve(__dirname, "src/types");
    const distTypesDir = path.resolve(__dirname, "dist/types");

    mkdirSync(distTypesDir, { recursive: true });

    copyFileSync(
      path.join(srcTypesDir, "bundle.d.ts"),
      path.join(distTypesDir, "bundle.d.ts"),
    );

    console.log("Type declaration files copied to dist/types");
  })
  .catch(() => process.exit(1));
