const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  }

  console.log(`server start at http://localhost:${port}`);
});
