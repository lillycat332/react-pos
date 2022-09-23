const path = require('path');
const DeadCodePlugin = require('webpack-deadcode-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/ ,
        exclude: /node_modules/,
        use: "css-loader"
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../public'), // change if not nested in hs-pos
  },
  optimization: {
    usedExports: true,
  },
  plugins: [
    new DeadCodePlugin({
      patterns: [
        'src/**/*.((j|t)s(x)?|css)',
      ],
      exclude: [
        '**/*.(stories|spec).(js|jsx)',
      ],
    }),
    //new WebpackShellPlugin({onBuildStart:['rm ../public/*.js'], onBuildEnd:['echo "Done."']})
  ]
};
