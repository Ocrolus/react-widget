import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    external: ['react'],
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts.default()],
  },
];


// import babel from '@rollup/plugin-babel';
// import commonjs from '@rollup/plugin-commonjs';
// import resolve from '@rollup/plugin-node-resolve';
// // import { terser } from '@rollup/plugin-terser';
// // import replace from '@rollup/plugin-replace';
// import ts from 'rollup-plugin-ts';
// import pkg from './package.json';


// export default [
//     {
//       input: 'src/index.ts',
//       external: ['react'],
//       output: [
//         { file: pkg.main, format: 'cjs' },
//         { file: pkg.module, format: 'es' },
//       ],
//       plugins: [
//         ts(),
//         resolve(),
//         babel({
//           extensions: ['.ts', '.js', '.tsx', '.jsx'],
//         }),
//         commonjs(),
//       ],
//     },
//     {
//       input: 'src/index.ts',
//       external: ['react'],
//       output: [
//         {
//           name: 'OcrolusReactWidget',
//           file: pkg.browser,
//           format: 'umd',
//           globals: {
//             react: 'React',
//           },
//         },
//       ],
//       plugins: [
//         ts(),
//         resolve(),
//         babel({
//           extensions: ['.ts', '.js', '.tsx', '.jsx'],
//         }),
//         commonjs(),
//       ],
//     },
//     // // Minified UMD Build without PropTypes
//     // {
//     //   input: 'src/index.ts',
//     //   external: ['react'],
//     //   output: [
//     //     {
//     //       name: 'PlaidLink',
//     //       file: pkg['browser:min'],
//     //       format: 'umd',
//     //       globals: {
//     //         react: 'React',
//     //       },
//     //     },
//     //   ],
//     //   plugins: [
//     //     ts(),
//     //     resolve(),
//     //     babel({
//     //       extensions: ['.ts', '.js', '.tsx', '.jsx'],
//     //     }),
//     //     replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
//     //     commonjs(),
//     //     terser(),
//     //   ],
//     // },
//   ];