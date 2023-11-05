const { Sequelize } = require('sequelize');
const { v4: uuidv4} = require('uuid');
const config = require('../config/config');
const sequelize = new Sequelize(config.development)
const httpError = require('http-errors');
const Service = require('../models/service')(sequelize, Sequelize);
class ServiceController {
    async getServices(req, res, next) {
        try {
            return res.json(await Service.findAll({}));
        } catch (error) {
            console.error(error);
            return res.json(error);
        }
    }
    async getServiceByCode(req, res, next) {
        try {
            const { code } = req.params;
            return res.json(await Service.findOne({
                where: {
                    code
                }
            }));

        } catch (error) {
            next(error);
        }
    }
    async addService(req, res, next) {
        try {
            const formData = {
                id: uuidv4(),
                name: req.body?.name || "",
                price: req.body?.price || "",
                code: req.body?.code || "",
            }
            await Service.create(formData);
            return res.json({
                "message": "Add Service successfully"
            });
        } catch (error) {
            next(error);
        }
    }
    async editService(req, res, error) {
        try {
            const { code } = req.params;
            const updateData = {
                name: req.body?.name || "",
                price: req.body?.price || "",
                code: req.body?.code || "",
            }
            await Service.update(updateData, {
                where: {
                    code
                }
            })
            return res.json({
                "message": "Edit Service successfully"
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
    async destroyService(req, res, next) {
        try {
            const { code } = req.params;
            await Service.destroy({
                where: {
                    code
                }
            })
            return res.json({
                "message": "Delete Service successfully"
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ServiceController();