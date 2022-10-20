const connectToMongo = require("./db");
const express = require('express')

connectToMongo();
const port = 3000

const app = express()
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

