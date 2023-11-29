const User = require("../models/User");
const { createSecretToken } = require("../utils/SecretToken");
const CustomError = require("../utils/errors/CustomError");

module.exports.createNewUser = async (req, res, next) => {
    const userDetails = {
        username: req.body.username,
        password: req.body.password,
        FromPA: true,
        phonenumber: parseInt(req.body.phonenumber),
    };
    try {
        if (req.admin.role != 'partner') {
            throw new CustomError(401, "Un-authorized request");
        }
        const existingUser = await User.findOne({ username: userDetails.username });
        
        if (existingUser) {
            throw new CustomError(400, "User already exists");
        }
        const newUser = new User(userDetails);
        await newUser.save()
        const token = createSecretToken(newUser._id);
        res.status(201).json({ status: true, token });
    } catch (error) {
        next(error);
    }
}

module.exports.getPAusers = async (req, res, next) => {
    try {
        if (req.admin.role != 'partner') {
            throw new CustomError(401, "Un-authorized request");
        }
        const users = await User.find({ FromPA: true})
        res.status(201).json({ status: true, users });
    } catch (error) {
        next(error);
    }
}