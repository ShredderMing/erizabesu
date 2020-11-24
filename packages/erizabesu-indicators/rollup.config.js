import fs from 'fs'
import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import discardComments from 'postcss-discard-comments'
import resolve from 'rollup-plugin-node-resolve'

let pkg = JSON.parse(fs.readFileSync('./package.json'))

export default {
  input: 'src/index.js',
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true },
    {
      file: pkg['umd:main'],
      format: 'umd',
      name: pkg.amdName,
      globals: { preact: 'preact' },
      sourcemap: true,
    },
  ],

  external: ['preact'],
  plugins: [
    resolve(),
    babel({
      babelrc: false,
      comments: false,
      exclude: ['node_modules/**', '**/*.css'],
      presets: [['@babel/preset-env', { modules: false, loose: true }]],
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
        ['@babel/plugin-transform-react-jsx', { pragma: 'h' }],
      ],
    }),
    postcss({
      plugins: [discardComments({ removeAll: true })],
    }),
  ],
}
