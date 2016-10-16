var test = require('tape');
var rewrite = require('..');

test('rewrite variable', function(assert) {
  var input = [
    'var answer = 6 * 7',
  ].join('\n')

  var output = rewrite(input, function (node) {
    if (node.type == 'Program') {
      assert.equal(node.toString(), 'let answer = 1 * 2');
      assert.equal(node.parent, undefined);
    }

    if (node.type == 'VariableDeclaration') {
      assert.equal(node.kind, 'var');
      assert.equal(node.declarations[0].type, 'VariableDeclarator');
      assert.equal(node.declarations[0].id.type, 'Identifier');
      assert.equal(node.declarations[0].id.name, 'answer');

      assert.equal(node.parent.type, 'Program');

      return node.toString().replace('var', 'let');
    }

    if (node.type == 'VariableDeclarator') {
      assert.equal(node.id.type, 'Identifier');
      assert.equal(node.id.name, 'answer');

      assert.equal(node.parent.type, 'VariableDeclaration');
    }

    if (node.type == 'BinaryExpression') {
      assert.equal(node.operator, '*');

      assert.equal(node.left.value, 6);
      assert.equal(node.left.raw, '6');
      assert.equal(node.left.toString(), '1');

      assert.equal(node.right.value, 7);
      assert.equal(node.right.raw, '7');
      assert.equal(node.right.toString(), '2');

      assert.equal(node.parent.type, 'VariableDeclarator');
    }

    if (node.type == 'Literal') {
      return (node.value == 6) ? 1 : 2;
    }

    return node.toString();
  });

  assert.equal(output.code, [
    'let answer = 1 * 2',
  ].join('\n'));

  assert.end();
});
