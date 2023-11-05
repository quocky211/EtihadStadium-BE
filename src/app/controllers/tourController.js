const { Sequelize, Op } = require('sequelize');
const { v4: uuidv4} = require('uuid');
const config = require('../config/config');
const sequelize = new Sequelize(config.development)
const httpError = require('http-errors');
const { Tour, Tour_detail, Tour_service, Service, Tour_guilder, Guider } = require('../models');
class TourController {
    async getTours(req, res, next) {
        try {
            const { numberOfTicket, date} = req.query;
            if (!numberOfTicket && !date) {
                return res.json(await Tour.findAll({ 
                    include: [
                        {
                            model: Tour_service, as: 'tourService',
                            include: [
                                {
                                    model: Service, as: 'service'
                                }
                            ]
                        }
                    ]
                }));
            }
            
            const tours = await Tour.findAll({where: {
                ...(date ? {
                    date: date
                } : {})
            }, include: [
                {
                    model: Tour_detail, as: 'tickets',
                    required: !!numberOfTicket,
                    where: {
                        ...(numberOfTicket ? {
                            remainTicket: {
                            [Op.gte] : numberOfTicket,
                            }
                        } : {})
                    }
                },
                {
                    model: Tour_service, as: 'tourService',
                    include: [
                        {
                            model: Service, as: 'service'
                        }
                    ]
                }
            ]});
            console.log(tours);
            return res.json(tours);
        } catch (error) {
            console.error(error);
            return res.json(error);
        }
    }
    
    async getTourByParamName(req, res, next) {
        try {
            const { paramName } = req.params;
            return res.json(await Tour.findOne({
                where: {
                    paramName
                }, include: [
                    {
                        model: Tour_service, as: "tourService",
                        include: [
                            {
                                model: Service, as: "service"
                            }
                        ]
                    },
                    {
                        model: Tour_guilder, as: "tourGuilder",
                        include: [
                            {
                                model: Guider, as: "guilder"
                            }
                        ]
                    }
                ]
            }));

        } catch (error) {
            next(error);
        }
    }
    async getTicketByTour(req, res, next) {
        try {
            const { paramName } = req.params;
            const tour = await Tour.findOne({
                where: {
                    paramName
                }
            });
            console.log(tour);
            return res.json(await Tour_detail.findOne({
                where: {
                    tourId: tour.id
                }
            }));

        } catch (error) {
            next(error);
        }
    }
    async addTour(req, res, next) {
        try {
            const formData = {
                id: uuidv4(),
                name: req.body.name,
                paramName: req.body.paramName,
                price: req.body.price,
                date: new Date(req.body.date),
                description: req.body.description,
            }
            await Tour.create(formData);
            return res.json({
                "message": "Add tour successfully"
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
    async addTourDetail(req, res, next) {
        try {
            const { paramName } = req.params;
            const tour = await Tour.findOne({where: {
                paramName,
            }})
            const formData = {
                id: uuidv4(),
                tourId: tour.id,
                startAt: req.body.startAt,
                endAt: req.body.endAt,
                remainTicket: req.body.remainTicket,
            }
            await Tour_detail.create(formData);
            return res.json({
                "message": "Add tour detail successfully"
            });
        } catch (error) {
            next(error);
        }
    }
    async addTourService(req, res, next) {
        try {
            const { paramName } = req.params;
            const serviceId = req.body.serviceId;
            const tour = await Tour.findOne({where: {
                paramName,
            }, attributes: ["id"]})
            const formData = {
                serviceId,
                id: uuidv4(),
                tourId: tour.id
            }
            await Tour_service.create(formData);
            return res.json({
                "message": "Add Service for Tour successfully"
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
    async editTour(req, res, error) {
        try {
            const { paramName } = req.params;
            const updateData = {
                name: req.body?.name || "",
                paramName: req.body?.paramName || "",
                price: req.body?.price || "",
                date: new Date(req.body?.date) || null,
                description: req.body?.description || "",
            }
            await Tour.update(updateData, {
                where: {
                    paramName
                }
            })
            return res.json({
                "message": "Edit Tour successfully"
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
    async destroyTour(req, res, next) {
        try {
            const { paramName } = req.params;
            await Tour.destroy({
                where: {
                    paramName
                }
            })
            return res.json({
                "message": "Delete Tour successfully"
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TourController();