const connectToMongo = require("./db");
const express = require('express')
const cors = require('cors')

connectToMongo();
const port = 3001;
const app = express();



app.use(cors())
app.use(express.json())
// Available Routes 
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))


app.listen(port, () => {
  console.log(`iNoteBook Backend listening on port http://localhost:${port}`)
})

