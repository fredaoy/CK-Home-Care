const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'public', '_redirects');
const dest = path.join(__dirname, 'dist', '_redirects');

fs.copyFile(source, dest, (err) => {
  if (err) {
    console.error('❌ Failed to copy _redirects:', err);
  } else {
    console.log('✅ _redirects copied to dist/');
  }
});
