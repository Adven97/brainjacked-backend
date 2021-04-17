require('dotenv/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const url = process.env.DB_CONNECTION;
const port = process.env.PORT;

const userRoute = require('./src/routes/users');
const humanRoute = require('./src/routes/humans');

app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRoute);
app.use('/humans', humanRoute);

app.get('/', (req, res) => {
    res.send('Brainjack, hijack your brain! 1.2')
})

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log('connected to Database succesfully'));

app.listen(port);