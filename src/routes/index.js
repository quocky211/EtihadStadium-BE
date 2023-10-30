const userRoute = require("./user");

function route(app) {
    app.use('/user', userRoute);
    app.use('/', function (req, res)  {
        res.send("Hello world");
    });
}
module.exports = route;