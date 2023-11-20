const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const port = 5000;
require('dotenv').config().parsed;

const URI = process.env.MONGO_URI;
mongoose.connect(URI).then(() => {
    console.log("Connected Sucssefully")
}).catch((err) => {
    console.error("Not connected")
});

app.use(express.json())
app.use(cors())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/note', require('./routes/note'))


app.listen(port, () => {
    console.log(`The server is lisetning on the port ${port}`)
})