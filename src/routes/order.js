const express = require("express");
const router = express.Router();
const orderController = require("../app/controllers/orderController");

router.post(
  "/:tourDetailId/select-ticket-types",
  orderController.SelectTicketTypes
);

module.exports = router;
