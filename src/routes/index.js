const userRoute = require("./user");
const videoRoute = require("./video");
const playerRoute = require("./player")
const tourRoute = require("./tour")
function route(app) {
    app.use('/user', userRoute);
    app.use('/video', videoRoute);
    app.use('/player', playerRoute);
    app.use('/tour', tourRoute);
}
module.exports = route;