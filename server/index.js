require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const routeAll = require('./routes/route')

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.connect(process.env.DB_CONN)
.then(() => console.log("Database Connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello Server")
})

app.use(routeAll);

app.listen('6300', () => {
    console.log('listening on port:6300');
})