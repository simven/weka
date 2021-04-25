const {join} = require("path");

const express = require("express");
const router = require('./router');

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

const app = express();
const port = process.env.PORT || 8000;

app.use(morgan('combined'))
    .use(cors())
    .use('/img', express.static(join(__dirname,'img')))
    .use(fileUpload({
        useTempFiles: true,
        tempFileFir: '/tmp/'
    }))
    .use(express.json())
    .use(bodyParser.json())
    .use(express.urlencoded({extended: true}))
    .use(router)
    .use((req, res) => {
        res.status(404);
        res.json({
            error: "Page not found"
        })
    })
    .listen(port, () => {
        console.log('Server app listening on port ' + port);
    });
