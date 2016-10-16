var assert = require('assert');
var rewrite = require('..');

var input = [
  'false',
].join('\n');

var output = rewrite(input, function (node) {
  if (node.type == 'Program') {
    assert.equal(node.toString(), 'true');
    assert.equal(node.parent, undefined);
  }

  if (node.type == 'ExpressionStatement') {
    assert.equal(node.expression.value, false);
    assert.equal(node.expression.raw, 'false');
    assert.equal(node.expression.toString(), 'true')
    assert.equal(node.parent.type, 'Program');
  }

  if (node.type == 'Literal') {
    assert.equal(node.value, false);
    assert.equal(node.parent.type, 'ExpressionStatement');

    return true;
  }

  return node.toString();
});

assert.equal(output.code, [
  'true'
].join('\n'));
