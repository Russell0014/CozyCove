const express = require('express')
const app = express()
app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello, here is your first Express.js backend")
})
//http://localhost:3000/
app.listen(3000, () => {
    console.log('Server is up and listening on port 3000')
})