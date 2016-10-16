# Reshift.js - rewrite an abstract syntax tree

Reshift.js lets you reshift and rewrite an abstract syntax tree on a recursive
walk, returning the re-written source code.

## Example

Uppercase string literals:

```javascript
var reshift = require('reshift');

var content = [
  'console.log(\'hello world\')',
].join('\n');

var output = reshift(content, function(node) {
  if (node.type == 'Literal') {
    return node.raw.toUpperCase();
  }

  return node.toString();
});

console.log(output);
```

## Install

```console
npm install reshift
```

## License

MIT
