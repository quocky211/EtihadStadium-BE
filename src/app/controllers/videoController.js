const { Sequelize } = require('sequelize');
const { v4: uuidv4} = require('uuid');
const config = require('../config/config');
const sequelize = new Sequelize(config.development)
const httpError = require('http-errors');
const Video = require('../models/video')(sequelize, Sequelize);
class VideoController {
    async getVideos(req, res, next) {
        try {
            return res.json(await Video.findAll({}));
        } catch (error) {
            console.error(error);
            return res.json(error);
        }
    }
    async getVideoByParamName(req, res, next) {
        try {
            const { paramName } = req.params;
            return res.json(await Video.findOne({
                where: {
                    paramName
                }
            }));

        } catch (error) {
            next(error);
        }
    }
    async addVideo(req, res, next) {
        try {
            const formData = {
                id: uuidv4(),
                name: req.body.name,
                paramName: req.body.paramName,
                linkIFrame: req.body.linkIFrame,
                timeDuration: req.body.timeDuration,
                thumbnail: req.body.thumbnail,
                type: req.body.type,
            }
            await Video.create(formData);
            return res.json({
                "message": "Add video successfully"
            });
        } catch (error) {
            next(error);
        }
    }
    async editVideo(req, res, error) {
        try {
            const { paramName } = req.params;
            const updateData = {
                name: req.body?.name || "",
                paramName: req.body?.paramName || "",
                linkIFrame: req.body?.linkIFrame || "",
                timeDuration: req.body?.timeDuration || "",
                thumbnail: req.body?.thumbnail || "",
                type: req.body?.type || "",
            }
            await Video.update(updateData, {
                where: {
                    paramName
                }
            })
            return res.json({
                "message": "Edit video successfully"
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
    async destroyVideo(req, res, next) {
        try {
            const { paramName } = req.params;
            await Video.destroy({
                where: {
                    paramName
                }
            })
            return res.json({
                "message": "Delete video successfully"
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new VideoController();