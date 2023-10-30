const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const route = require('./src/routes');
const app = express();
const cors = require('cors');

const sequelize = require('./src/app/config/database');
const path = require('path');

// morgan: bắn ra log khi gửi yêu cầu lên server
app.use(morgan('dev'));
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
);
app.use(bodyParser.json());
app.use(express.json());


app.use(cors()); // Use this after the variable declaration

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

sequelize
    .authenticate()
    .then(() => {
        console.log("Successful connection to the database.");
    })
    .catch((error) => {
        console.log("Unable to connect to database:", error);
    })

route(app);
app.get('/', function (req, res)  {
    res.send("hello");
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});