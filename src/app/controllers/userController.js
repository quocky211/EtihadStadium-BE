const httpError = require('http-errors');
const { userValidate, loginValidate, phoneValidate } = require('../helpers/validation');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwt_service');
const client = require('../helpers/connection_redis');
const User = require('../models/user');
class UserController {
    async Register(req, res, next) {
        try {
            const { email } = req.body;
            const { error } = userValidate(req.body);
            if (error) {
                throw httpError(error.details[0].message);
            }
            const isExistEmail = await User.findOne({ email: email });

            if (isExistEmail) throw httpError.Conflict(`${email} has been existed!!`);

            const formData = {
                email: req.body.email,
                gender: req.body.gender,
                password: req.body.password,
                dateOfBirth: req.body.dateOfBirth,
                name: req.body.name,
                phone: req.body.phone,
                role: 'customer',
            };
            const user = new User(formData);
            user.save()
                .then(() => {
                    res.json({
                        status: 'successfully',
                        // elements: user,
                    });
                })
                .catch(() => res.send('Error when registering'));
        } catch (error) {
            next(error);
        }
    }

    async RefreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) throw httpError.BadRequest();

            // verify token
            const { userId } = await verifyRefreshToken(refreshToken);
            const accessToken = await signAccessToken(userId);
            const refToken = await signRefreshToken(userId);

            res.json({
                accessToken,
                refreshToken: refToken,
            });
        } catch (error) {
            next(error);
        }
    }

    async Login(req, res, next) {
        try {
            const { error } = loginValidate(req.body);
            if (error) {
                throw httpError(error.details[0].message);
            }

            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                throw httpError.NotFound(`${req.body.email} has not been registered!!`);
            }

            const isValidPassword = await user.isCheckPassword(req.body.password);
            if (!isValidPassword) {
                throw httpError.Unauthorized();
            }

            const accessToken = await signAccessToken(user._id);
            const refreshToken = await signRefreshToken(user._id);
            res.json({
                accessToken,
                refreshToken,
                user,
            });
        } catch (error) {
            next(error);
        }
    }
    async Logout(req, res, next) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) throw httpError.BadRequest();

            const { userId } = await verifyRefreshToken(refreshToken);
            client.del(userId.toString(), (err, reply) => {
                if (err) throw httpError.InternalServerError();

                res.json({
                    message: 'Logout',
                });
            });
        } catch (error) {
            next(error);
        }
    }
    
    GetUser(req, res, next) {
        const userId = req.params.id;
        client.get(`user:${userId}`, (err, user) => {
            if (err) throw err;
            if (user) {
                console.log('Lấy danh sách người dùng từ Redis');
                res.json(JSON.parse(user));
            } else {
                User.find({ _id: userId }, 'email name gender address birthday phone')
                    .exec()
                    .then((user) => {
                        if (!user) {
                            console.log('Không tìm thấy người dùng');
                        } else {
                            client.setex(`user:${userId}`, 1800, JSON.stringify(user));
                            res.json(user);
                        }
                    })
                    .catch(next);
            }
        });
    }

    // PATCH /user/:id
    async EditUser(req, res, next) {
        try {
            const { error } = phoneValidate(req.body);

            if (error) {
                throw httpError.Conflict('Số điện thoại không hợp lệ');
            }

            await User.updateOne({ _id: req.params.id }, req.body)
                .then(() => {
                    res.send('Cập nhật dữ liệu thành công');
                    // Xóa cache người dùng khỏi Redis
                    client.del(`user:${req.params.id}`, (err) => {
                        if (err) throw err;
                        else console.log('Đã xóa cache người dùng khỏi Redis');
                    });
                })
                .catch(() => res.send('Cập nhật dữ liệu thất bại'));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();