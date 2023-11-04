const userRoute = require("./user");
const videoRoute = require("./video");

function route(app) {
    app.use('/user', userRoute);
    app.use('/video', videoRoute);
}
module.exports = route;