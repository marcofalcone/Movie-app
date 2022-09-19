const express = require('express');

const app = express();

app.get('/api/test', (req, res) => {
  res.json({ test: 'test' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('server running'));
