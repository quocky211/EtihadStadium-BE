const { Sequelize } = require('sequelize');
const { v4: uuidv4} = require('uuid');
const config = require('../config/config');
const sequelize = new Sequelize(config.development)
const httpError = require('http-errors');
const Guilder = require('../models/guilder')(sequelize, Sequelize);
class GuilderController {
    async getGuilders(req, res, next) {
        try {
            return res.json(await Guilder.findAll({}));
        } catch (error) {
            console.error(error);
            return res.json(error);
        }
    }
    async getGuilderByParamName(req, res, next) {
        try {
            const { paramName } = req.params;
            return res.json(await Guilder.findOne({
                where: {
                    paramName
                }
            }));

        } catch (error) {
            next(error);
        }
    }
    async addGuilder(req, res, next) {
        try {
            const formData = {
                id: uuidv4(),
                name: req.body?.name || "",
                price: req.body?.price || "",
                paramName: req.body?.paramName || "",
            }
            await Guilder.create(formData);
            return res.json({
                "message": "Add Guilder successfully"
            });
        } catch (error) {
            next(error);
        }
    }
    async editGuilder(req, res, error) {
        try {
            const { paramName } = req.params;
            const updateData = {
                name: req.body?.name || "",
                price: req.body?.price || "",
                paramName: req.body?.paramName || "",
            }
            await Guilder.update(updateData, {
                where: {
                    paramName
                }
            })
            return res.json({
                "message": "Edit Guilder successfully"
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
    async destroyGuilder(req, res, next) {
        try {
            const { paramName } = req.params;
            await Guilder.destroy({
                where: {
                    paramName
                }
            })
            return res.json({
                "message": "Delete Guilder successfully"
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new GuilderController();