'use strict';

var fs = require('fs');
var request = require('request');

request('https://github.com/meteor/meteor/raw/devel/packages/ordered-dict/ordered_dict.js', function (err, res) {
  if (err) throw err;
  if (res.statusCode !== 200) throw new Error('Unexpected status code ' + res.statusCode);
  var source = [
    'var _ = require("underscore");',
    'var OrderedDict;',
    res.body.toString(),
    'module.exports = OrderedDict;'
  ].join('\n');
  fs.writeFileSync(__dirname + '/index.js', source);
});
