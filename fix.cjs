const fs = require('fs');
let code = fs.readFileSync('src/data.js', 'utf8');
code = code.replace(/\\\\'/g, "\\'");
fs.writeFileSync('src/data.js', code);
console.log('Fixed syntax errors');
