const fs = require('fs');
let code = fs.readFileSync('src/data.js', 'utf8');

// Replace unescaped single quotes inside the specific strings that I added.
code = code.replace(
  "Discover Night Safari Singapore, the world's first nocturnal zoo.", 
  "Discover Night Safari Singapore, the world\\'s first nocturnal zoo."
);
code = code.replace(
  "views of Singapore's skyline.", 
  "views of Singapore\\'s skyline."
);
code = code.replace(
  "Here's a breakdown:", 
  "Here\\'s a breakdown:"
);
code = code.replace(
  "It's essential", 
  "It\\'s essential"
);
code = code.replace(
  "It's advisable", 
  "It\\'s advisable"
);
code = code.replace(
  "It's recommended", 
  "It\\'s recommended"
);
code = code.replace(
  "hotel's policy", 
  "hotel\\'s policy"
);
code = code.replace(
  "hotel's policy", 
  "hotel\\'s policy"
);
code = code.replace(
  "It's recommended", 
  "It\\'s recommended"
);

fs.writeFileSync('src/data.js', code);
console.log('Fixed quotes in data.js');
