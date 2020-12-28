const authRoute = require('express').Router();
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registrationValidation, loginValidation } = require('../validation');

// Saving refresh tokens(Note: save these values in Database)
let jwtRefreshTokenArr = [];

authRoute.post('/Register', async (req, res) => {
    // Data validation
    const { error } = registrationValidation(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    // Check if user exists
    const emailExists = await User.findOne({ email: req.body.email });
    if(emailExists) return res.status(400).send(`OOPS!! Email exists.`);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send({ user: savedUser._id});
    } catch (err) {
        res.status(404).send({ message: err });
    }
});

authRoute.post('/Login', async (req, res) => {
    // Data validation
    const { error } = loginValidation(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    // Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send(`OOPS!! Email does not exists.`);

    // Check if password is correct
    const isValidPass = await bcrypt.compare(req.body.password, user.password);
    if(!isValidPass) return res.status(400).send(`OOPS!! Wrong password.`);

    // Create jwt Access Token and Refresh Token
    // const jwtRefreshToken = jwt.sign({user}, process.env.REFRESH_TOKEN_SECRETE);
    // jwtRefreshTokenArr.push(jwtRefreshToken);
    
    // jwt.sign({user}, process.env.ACCESS_TOKEN_SECRETE, { expiresIn: process.env.TOKEN_EXIREATION }, (err, data)=>{
    //     if(err) return res.json({ message: err });
        
    //     res.header('authorization', data)
    //     .send({ message: `Yey you have logged in successfully!!`, user: user, authorization: data});
    // });

    const jwtAccessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRETE, { expiresIn: process.env.ACCESS_TOKEN_EXIREATION });
    const jwtRefreshToken = jwt.sign({user}, process.env.REFRESH_TOKEN_SECRETE, { expiresIn: process.env.REFRESH_TOKEN_EXIREATION });
    jwtRefreshTokenArr.push(jwtRefreshToken);

    console.log('jwtRefreshTokenArr', jwtRefreshTokenArr);

    res.header('authorization', jwtAccessToken)
        .send({ 
            message: `Yey you have logged in successfully!!`, 
            user: user, 
            jwtAccessToken: jwtAccessToken,
            jwtRefreshToken: jwtRefreshToken});

});

module.exports = authRoute;