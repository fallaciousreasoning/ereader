const withTM = require('next-transpile-modules')(['epubjs']);
module.exports = withTM({
    trailingSlash: false
});