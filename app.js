const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const routes = require('./routes');

app.use('/v1', routes);

app.use('/data', express.static('content'))
app.use('/diagram', express.static('images'))

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async(req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});