import esbuild from 'esbuild';

const buildOptions = (entry, outdir) => ({
  entryPoints: [entry],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: 'esnext',
  loader: { '.ts': 'ts', '.tsx': 'tsx' },
  outdir: outdir,
  external: ['react', 'react-dom'], // Prevents bundling React dependencies
});

async function build() {
  // Build ocrolus-widget-react package
  await esbuild.build({
    ...buildOptions('packages/ocrolus-widget-react/src/index.tsx', 'packages/ocrolus-widget-react/dist'),
    format: 'cjs',
    outExtension: { '.js': '.cjs' },
  });

  await esbuild.build({
    ...buildOptions('packages/ocrolus-widget-react/src/index.tsx', 'packages/ocrolus-widget-react/dist'),
    format: 'esm',
    outExtension: { '.js': '.mjs' },
  });

  // Build example package
  await esbuild.build({
    ...buildOptions('packages/example/src/index.tsx', 'packages/example/dist'),
    format: 'esm',
    outExtension: { '.js': '.mjs' },
  });
}

build().catch(() => process.exit(1));