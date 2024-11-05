import esbuild from "esbuild";
import { copyFile, access, mkdir } from "fs/promises";
import { constants } from "fs";
import { TsconfigPathsPlugin } from "@esbuild-plugins/tsconfig-paths";
import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tsconfigPath = path.resolve(__dirname, "./tsconfig.json");
const tsconfig = JSON.parse(readFileSync(tsconfigPath, "utf8"));
const distDir = path.resolve(__dirname, "dist");
const publicDir = path.resolve(__dirname, "public");

console.log("tsconfigPath:", tsconfigPath);
console.log("distDir:", distDir);
console.log("publicDir:", publicDir);

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
  .then(async ctx => {
    const srcFile = path.join(publicDir, "index.html");
    const destFile = path.join(distDir, "index.html");

    console.log("srcFile:", srcFile);
    console.log("destFile:", destFile);

    try {
      await access(srcFile, constants.F_OK);
      console.log('accesses');

      // Ensure the destination directory exists
      await mkdir(distDir, { recursive: true });

      await copyFile(srcFile, destFile);
      console.log("File copied successfully.");
    } catch (err) {
      console.error("Error accessing or copying file:", err);
      process.exit(1);
    }

    return ctx;
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

console.log(ctx);

const server = await ctx.serve({
  servedir: distDir,
  port: 3000
});
console.log(`Server started on http://${server.host}:${server.port}`);
