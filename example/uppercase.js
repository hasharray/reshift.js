var reshift = require('..');

var content = [
  'console.log(\'hello world\')',
].join('\n');

var output = reshift(content, function(node) {
  if (node.type == 'Literal') {
    return node.raw.toUpperCase();
  }

  return node.toString();
});

eval(output.toString());
