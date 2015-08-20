//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - DEPENDENCIES
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

var scss = require('./scss'),
  html = require('./html'),
  clear = require('./clear'),
  copy = require('./copy'),
  serve = require('./serve'),
  browserify = require('./browserify');

//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - EXPORTS
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

module.exports = {
  use: function (gulp) {
    return {
      browserify: browserify.init(gulp),
      clear: clear.init(gulp),
      copy: copy.init(gulp),
      html: html.init(gulp),
      serve: serve.init(gulp),
      scss: scss.init(gulp)
    }
  }
};
