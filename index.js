const express = require('express')
const app = express()

app.get('/soma', (req, res)=> {
  const a = `Olá Mundo`;

  res.json(a);
})

app.listen(3000);