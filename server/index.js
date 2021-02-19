const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send("Testing1");
})

app.listen(3001, () => {
    console.log('Testing2');
})