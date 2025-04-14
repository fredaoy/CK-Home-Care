const serve = require('serve');
const path = require('path');

serve(path.join(__dirname, 'dist'), {
  port: process.env.PORT || 3000,
  single: true // 👈 ใช้ fallback ทุก route → index.html
});
