module.exports = {
  type: 'react-app',
  webpack: {
    loaders: {
      babel: {
        test: /\.jsx?/
      }
    },
    extra: {
      resolve: {
        extensions: ['', '.js', '.jsx', '.json']
      },
      node: {
        process: false
      }
    }
  }
}