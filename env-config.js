const fs = require('fs');
const config = JSON.stringify(process.env);

fs.writeFileSync('./build/env-config.js', `window.env = ${config}`);
