const bodyParser = require('body-parser')
var cors = require("cors");
const express = require('express')
const app = express()
const appRoute = require('./app/routes')
const path = require('path')

app.use(cors())
app.use(bodyParser.json())


//Route
app.use('/api', appRoute)

app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
