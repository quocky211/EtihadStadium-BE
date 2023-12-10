const { Sequelize, Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const config = require("../config/config");
const sequelize = new Sequelize(config.development);
const { selectTicketType } = require("../services/order.service");
class OrderController {
  async SelectTicketTypes(req, res) {
    const userId = req.payload?.id || "hihihi";

    const { tourDetailId } = req.params || "hihihi";
    const { ...tickets } = req.body;
    console.log(tickets);
    await selectTicketType(userId, tourDetailId, tickets);
    return res.status(200).json("Ok");
  }
}

module.exports = new OrderController();
