var hook = require('node-hook');

hook.hook('.js', (src, name) => {
  src = src.replace(/import\s+([^{]*?)\s+from\s+'(.*?)'/g, 'const $1 = require("$2")');
  src = src.replace(/export\s+default\s+class\s+([a-zA-Z0-9_$]*)/g, 'const $1 = module.exports = $1');
  src = src.replace(/export\s+default\s+function\s+([a-zA-Z0-9_$]*)/g, 'const $1 = module.exports = $1');
  src = src.replace(/export\s+default\s+([^ ]*)/g, 'module.exports = $1');
  src = src.replace(/export\s+(var|let|const)\s+([a-zA-Z0-9_$]*)/g, '$1 $2 = module.exports.$2');
  src = src.replace(/export\s+function\s+([a-zA-Z0-9_$]*)/g, 'var $1 = module.exports.$1 = function $1');
  src = src.replace(/export\s+class\s+([a-zA-Z0-9_$]*)/g, 'var $1 = module.exports.$1 = class $1');
  src = src.replace(/import\s+{(.*?)}\s+from\s+'(.*?)'/g, (all, $1, $2) => {
    return $1.split(",")
      .map(part => 'var ' + part + '= require("' + $2 + '").' + part.trim() + ';')
      .join('');
  });
  return src;
});
