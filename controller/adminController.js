const User = require("../models/User");
const { createSecretToken } = require("../utils/SecretToken");
const CustomError = require("../utils/errors/CustomError");

module.exports.getAllusers = async (req, res, next) => {
    try {
        // if (req.admin.role != 'admin') {
        //     throw new CustomError(401, "Un-authorized request");
        // }
        const users = await User.find({})
        res.status(201).json({ status: true, users });
    } catch (error) {
        next(error);
    }
}

module.exports.BlockUser = async (req, res, next) => {
    try {
        if (req.admin.role != 'admin') {
            throw new CustomError(401, "Un-authorized request");
        }
        await User.findByIdAndUpdate(req.params.id, { isBlocked: true }, { new: true })
        const users = await User.find({})
        res.status(201).json({ status: true, users });
    } catch (error) {
        next(error);
    }
}

module.exports.UnblockUser = async (req, res, next) => {
    try {
        if (req.admin.role != 'admin') {
            throw new CustomError(401, "Un-authorized request");
        }
        await User.findByIdAndUpdate(req.params.id, { isBlocked: false }, { new: true })
        const users = await User.find({})
        res.status(201).json({ status: true, users });
    } catch (error) {
        next(error);
    }
}