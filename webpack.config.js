// Custom webpack config to provide module fallback for 'http' in browser
module.exports = {
  resolve: {
    fallback: {
      http: false,
    },
  },
};
