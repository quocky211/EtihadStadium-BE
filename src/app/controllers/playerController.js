const { Sequelize } = require('sequelize');
const { v4: uuidv4} = require('uuid');
const config = require('../config/config');
const sequelize = new Sequelize(config.development)
const httpError = require('http-errors');
const Player = require('../models/player')(sequelize, Sequelize);
class PlayerController {
    async getPlayers(req, res, next) {
        try {
            return res.json(await Player.findAll({}));
        } catch (error) {
            console.error(error);
            return res.json(error);
        }
    }
    async getPlayerByParamName(req, res, next) {
        try {
            const { paramName } = req.params;
            return res.json(await Player.findOne({
                where: {
                    paramName
                }
            }));

        } catch (error) {
            next(error);
        }
    }
    async addPlayer(req, res, next) {
        try {
            const formData = {
                id: uuidv4(),
                name: req.body?.name || "",
                paramName: req.body?.paramName || "",
                dateOfBirth: req.body?.dateOfBirth || null,
                location: req.body?.location || "",
                nationality: req.body?.nationality || "",
                position: req.body?.position || "",
                joinedCity: req.body?.joinedCity || "",
            }
            await Player.create(formData);
            return res.json({
                "message": "Add player successfully"
            });
        } catch (error) {
            next(error);
        }
    }
    async editPlayer(req, res, error) {
        try {
            const { paramName } = req.params;
            const updateData = {
                name: req.body?.name || "",
                paramName: req.body?.paramName || "",
                dateOfBirth: req.body?.dateOfBirth || null,
                location: req.body?.location || "",
                nationality: req.body?.nationality || "",
                position: req.body?.position || "",
                joinedCity: req.body?.joinedCity || "",
            }
            await Player.update(updateData, {
                where: {
                    paramName
                }
            })
            return res.json({
                "message": "Edit player successfully"
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
    async destroyPlayer(req, res, next) {
        try {
            const { paramName } = req.params;
            await Player.destroy({
                where: {
                    paramName
                }
            })
            return res.json({
                "message": "Delete player successfully"
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new PlayerController();