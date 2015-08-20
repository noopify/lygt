//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - DEPENDENCIES
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

var transformTools = require('browserify-transform-tools'),
  path = require('path'),
  html = require('html-minifier'),
  pp = require('preprocess'),
  envify = require('envify/custom');

//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - PUBLIC
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

function stringify(preprocessContext, options) {
  preprocessContext = preprocessContext || {collapseWhitespace: true};
  options = options || {includeExtensions: ['.html']};

  return transformTools.makeStringTransform('stringify', options,
    function (src, transformOptions, done) {
      var compiled = 'module.exports = ';
      compiled += JSON.stringify(html.minify(src, preprocessContext));
      compiled += ';\n';
      done(null, compiled);
    });
}

function preprocessify(preprocessContext, options) {
  options = options || {includeExtensions: ['.js', '.html']};

  return transformTools.makeStringTransform('preprocessify', options,
    function (src, transformOptions, done) {
      var compiled = (path.extname(transformOptions.file) === '.html') ?
        pp.preprocess(src, preprocessContext, 'html') :
        pp.preprocess(src, preprocessContext, 'js');
      done(null, compiled);
    });
}

function each(preprocessContext, options) {
  options = options || {includeExtensions: ['.js', '.html']};

  return transformTools.makeStringTransform('each', options,
    function (src, transformOptions, done) {
      if (typeof preprocessContext === 'function') {
        src = preprocessContext(src, transformOptions);
      }
      done(null, src);
    });
}

//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// - EXPORTS
//
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

module.exports = {
  inject: envify,
  html: stringify,
  preprocess: preprocessify,
  each: each
};
