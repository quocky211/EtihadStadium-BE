const userRoute = require("./user");
const videoRoute = require("./video");
const playerRoute = require("./player");
const tourRoute = require("./tour");
const serviceRoute = require("./service");
const guilderRoute = require("./guilder");
function route(app) {
    app.use('/user', userRoute);
    app.use('/video', videoRoute);
    app.use('/player', playerRoute);
    app.use('/tour', tourRoute);
    app.use('/service', serviceRoute);
    app.use('/guilder', guilderRoute);
}
module.exports = route;