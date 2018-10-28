'use strict';

var assert = require('assert');
var test = require('testit');
var OrderedDict = require('../');

test('OrderedDict', function () {
  var dict = new OrderedDict();
  dict.append('a', '1');
  dict.append('b', '2');
  dict.putBefore('c', '3', 'b');
  assert(dict.first() === 'a');
  assert(dict.next('a') === 'c');
  assert(dict.next('c') === 'b');
});
