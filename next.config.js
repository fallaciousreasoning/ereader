const withTM = require('next-transpile-modules')(['epubjs']);
const withPWA = require('next-pwa')
module.exports = withPWA(
    withTM({
        trailingSlash: false
    }));