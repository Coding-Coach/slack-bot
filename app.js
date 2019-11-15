const express = require('express')
const app = express()
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))