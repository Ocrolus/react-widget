import esbuild from "esbuild";
import { copyFile } from "fs/promises";
import { TsconfigPathsPlugin } from "@esbuild-plugins/tsconfig-paths";
import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tsconfigPath = path.resolve(__dirname, "../../tsconfig.json");
const tsconfig = JSON.parse(readFileSync(tsconfigPath, "utf8"));
const distDir = path.resolve(__dirname, "dist");
const publicDir = path.resolve(__dirname, "public");

const ctx = await esbuild
  .context({
    entryPoints: ["src/index.tsx"],
    bundle: true,
    outdir: "dist",
    sourcemap: true,
    target: "esnext",
    loader: { ".tsx": "tsx", ".ts": "ts" },
    plugins: [TsconfigPathsPlugin({ tsconfig })],
    define: { "process.env.NODE_ENV": '"development"' },
  })
  .then((ctx) => {
    copyFile(path.join(publicDir, "index.html"), path.join(distDir, "index.html"));
    console.log(ctx)
    return ctx;
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

console.log(ctx);

const server = await ctx.serve(
  {
    servedir: distDir,
  },
  {
    entryPoints: ["src/index.tsx"],
    bundle: true,
    outdir: "dist",
    sourcemap: true,
    target: "esnext",
    loader: { ".tsx": "tsx", ".ts": "ts" },
    plugins: [TsconfigPathsPlugin({ tsconfig })],
    define: { "process.env.NODE_ENV": '"development"' },
  }
);

console.log(`Server started on http://${server.host}:${server.port}`);