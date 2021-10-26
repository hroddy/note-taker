const express = require('express');
const app = express();
const PORT = process.env.PORT ||3001;
const path = require('path');
const fs = require('fs');

const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

const apiRouter = require('./routes/apiRoutes');
const htmlRouter = require('./routes/htmlRoutes');

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
app.use('/api', apiRouter);
app.use('/', htmlRouter);

app.listen(PORT, () => {
    console.log(`API server now on ${PORT}!`);
});