const { Sequelize, Op, Error } = require("sequelize");
const config = require("../config/config");
const sequelize = new Sequelize(config.development);
const client = require("../config/redis.init");
const {
  Tour,
  Tour_detail,
  Tour_service,
  Service,
  Tour_guilder,
  Guider,
  Order,
} = require("../models");

var timeOut;
const ticketType = require("../common/ticketType.enum");
const selectTicketType = async (userId, tourDetailId, tickets) => {
  try {
    let numsTicket = 0;
    for (const item in tickets) {
      numsTicket += tickets[item];
    }
    const tourDetail = await Tour_detail.findOne({
      where: {
        id: tourDetailId,
      },
    });

    if (numsTicket >= tourDetail.remainTicket)
      throw new Error("Not enough tickets");

    // lưu vé vào redis
    const idUniRedis = `${userId}_${tourDetailId}`;
    await client.hSet(idUniRedis, { ...tickets, numsTicket });

    // sau 20p sẽ trả lại vé
    timeOut = setTimeout(
      restoreSlotTicketWhenExpire,
      1000 * 60,
      userId,
      tourDetailId
    );

    // update số lượng vé còn lại trong db
    const newRemainTicket = tourDetail.remainTicket - numsTicket;
    await Tour_detail.update(
      {
        remainTicket: newRemainTicket,
      },
      {
        where: {
          id: tourDetailId,
        },
      }
    );
    return true;
  } catch (error) {
    throw error;
  }
};

const restoreSlotTicketWhenExpire = async (userId, tourDetailId) => {
  try {
    const idUniRedis = `${userId}_${tourDetailId}`;
    if (!(await client.exists(idUniRedis))) {
      throw new Error("Ticket is not exists");
    }
    const tickets = await client.hGetAll(idUniRedis);
    const slotBooked = tickets.numsTicket;
    await Tour_detail.update(
      {
        remainTicket: Sequelize.literal(`"remainTicket" + ${slotBooked}`),
      },
      {
        where: {
          id: tourDetailId,
        },
      }
    );
    await client.del(idUniRedis);
    clearTimeout(timeOut);
  } catch (error) {
    throw error;
  }
};
module.exports = {
  selectTicketType,
};
