var parse = require('acorn').parse;

/**
 * Iterates through the AST nodes of the  given content string,
 * replacing the source of each node with the return value of `callback`.
 *
 * @param content { String }
 * @param callback { Function}
 */
module.exports = function reshift(content, callback) {
  var ast = parse(content);

  var chunks = content.split('');

  (function walk(node, parent) {
    node.parent = parent;
    node.sources = [];

    node.toString = function toString() {
      return chunks.slice(this.start, this.end).join('');
    };

    for (var key in node) {
      if (key == 'parent') {
        continue;
      }

      var child = node[key];
      if (child == null) {
        continue;
      }

      if (typeof child != 'string' && typeof child.length != 'undefined') {
        for (var i = 0; i < child.length; i++) {
          if (child == null || typeof child[i].type != 'string') {
            continue;
          }

          walk(child[i], node);
        }
      } else if (child && typeof child.type == 'string') {
        walk(child, node);
      }
    }

    var chunk = callback(node);
    if (chunk) {
      chunks[node.start] = chunk.toString();
      for (var index = node.start + 1; index < node.end; index++) {
        chunks[index] = '';
      }
    }
  }(ast));

  return {
    code: chunks.join(''),
    toString: function toString() {
      return this.code;
    },
  };
};
