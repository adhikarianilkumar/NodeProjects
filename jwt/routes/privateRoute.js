const privateRoute = require('express').Router();
const verify = require('./authorization');


privateRoute.get('/', verify, (req, res) => {
    try {
        res.json({
            posts: { 
                title: `This is private post`,
                message: `You have no access unless you logged in.`,
                req: req.body
            }
        });
    } catch (err) {
        res.status(404).send({ message: err });
    }
});

module.exports = privateRoute;