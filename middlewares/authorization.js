const jwt = require('jsonwebtoken');
const User = require('../models/register');
module.exports = async(req, res, next) => {
    const token = req.cookies.Jwttoken;
    if (!token)
        return res.status(403).send({ error: 'Authorization faild' });
    const decodedToken = jwt.decode(token);
    const user = await User.findOne({ _id: decodedToken._id });
    if (!user)
        return res.status(403).send({ error: 'authorization faild' });
    req.user = user;
    next();
}