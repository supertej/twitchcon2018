# ordered-dict

An ordered traversable dictionary with mutable ordering (from meteor.js). It is implemented as a dictionary that contains nodes of a doubly linked list as its values.

[![Build Status](https://img.shields.io/travis/ForbesLindesay/ordered-dict/master.svg)](https://travis-ci.org/ForbesLindesay/ordered-dict)
[![Dependency Status](https://img.shields.io/gemnasium/ForbesLindesay/ordered-dict.svg)](https://gemnasium.com/ForbesLindesay/ordered-dict)
[![NPM version](https://img.shields.io/npm/v/ordered-dict.svg)](https://www.npmjs.org/package/ordered-dict)

## Installation

    npm install ordered-dict

## Usage

```js
var OrderedDict = require('ordered-dict');
var dict = new OrderedDict();

dict.append('a', '1');
dict.append('b', '2');
dict.putBefore('c', '3', 'b');
assert(dict.first() === 'a');
assert(dict.next('a') === 'c');
assert(dict.next('c') === 'b');
assert(dict.get('a') === '1');
assert(dict.get('c') === '3');
assert(dict.get('b') === '2');
```

## Contributing

To get a new copy of the code, run `node build.js`.

## License

  MIT
