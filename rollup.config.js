import fs from 'fs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import discardComments from 'postcss-discard-comments';

let pkg = JSON.parse(fs.readFileSync('./package.json'));

export default {
  input: 'src/index.js',
  output: { file: pkg.main, format: 'cjs' },
  sourcemap: true,
  name: pkg.amdName,
  external: ['preact'],
  plugins: [
    babel({
      babelrc: false,
      comments: false,
      exclude: ['node_modules/**', '**/*.css'],
      presets: [['env', { modules: false, loose: true }]],
      plugins: [
        'transform-object-rest-spread',
        'transform-class-properties',
        ['transform-react-jsx', { pragma: 'h' }]
      ]
    }),
    postcss({
      plugins: [discardComments({ removeAll: true })]
    })
  ]
};
