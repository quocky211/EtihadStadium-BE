function route(app) {
    app.use('/', function (req, res)  {
        res.send("Hello world");
    });
}
module.exports = route;