const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('authorization');
    if(!token) return res.status(401).send(`Access denied.`);

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE, (err, data)=>{
            if(err) return res.json({ message: err });
            req.user = data;
            next();
        });
    } catch (er) {
        res.status(400).send(`Invalid token.`);
    }
};