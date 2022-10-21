const connectToMongo = require("./db");
const express = require('express')

connectToMongo();
const port = 3000
const app = express()

app.use(express.json())
// Available Routes 
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

