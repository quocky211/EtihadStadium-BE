const JWT = require('jsonwebtoken');
const httpError = require('http-errors');
const signAccessToken = async (userId) => {
    return JWT.sign({
        id: userId,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: '24h'
    });
};

const signRefreshToken = async (userId) => {
    return JWT.sign({
        id: userId,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: '365d'
    });
};

const verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization']) {
        return next(httpError.Unauthorized());
    }

    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    // start verify token
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            if (err.name === 'JsonWebTokenError') {
                return next(httpError.Unauthorized());
            }
            return next(httpError.Unauthorized(err.message));
        }

        req.payload = payload;
        next();
    });
};

const verifyRefreshToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err) return reject(err);
            return resolve(payload);
        });
    });
};

module.exports = {
    signAccessToken,
    signRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
};