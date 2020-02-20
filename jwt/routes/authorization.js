const jwt = require('jsonwebtoken');

module.exports = function (req, res, nxt) {
    const token = req.header('authorization');
    if(!token) return res.status(401).send(`Access denied.`);

    try {
        jwt.verify(token, process.env.TOKEN_SECRETE, (err, data)=>{
            if(err) return res.json({ message: err });
            req.user = data;
            nxt();
        });
    } catch (er) {
        res.status(400).send(`Invalid token.`);
    }
};