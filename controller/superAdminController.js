const Admin = require("../models/admin");
const { createSecretToken } = require("../utils/SecretToken");
const CustomError = require("../utils/errors/CustomError");

module.exports.CreateNewAdmin = async(req, res, next ) => {
    const adminDetails = {
        adminName: req.body.adminName,
        password: req.body.password,
        role: req.body.role,
        phonenumber: parseInt(req.body.phonenumber),
    };
    try {
        if( req.admin.role != 'super') {
            throw new CustomError(401, "Un-authorized request");
        }
        const existingAdmin = await Admin.findOne({ adminName: adminDetails.adminName });
        if (existingAdmin) {
            throw new CustomError(400, "User already exists");
        }
        const newAdmin = new Admin(adminDetails);
        await newAdmin.save()
        const token = createSecretToken(newAdmin._id);
        res.status(201).json({ status: true, token });
    } catch (error) {
        next(error);
    }
}

module.exports.getAllAdmins = async(req, res, next) => {
    try {
        if (req.admin.role != 'super') {
            throw new CustomError(401, "Un-authorized request");
        }
        const admins = await Admin.find({ role: { $ne: 'super' } })
        res.status(201).json({ status: true, admins });
    } catch (error) {
        next(error);
    }
}

module.exports.BlockAdmin = async (req, res, next) => {
    try {
        if (req.admin.role != 'super') {
            throw new CustomError(401, "Un-authorized request");
        }
        await Admin.findByIdAndUpdate(req.params.id, { isBlocked: true }, { new: true })
        const admins = await Admin.find({ role: { $ne: 'super' } })
        res.status(201).json({ status: true, admins });
    } catch (error) {
        next(error);
    }
}

module.exports.unblockAdmin = async (req, res, next) => {
    try {
        if (req.admin.role != 'super') {
            throw new CustomError(401, "Un-authorized request");
        }
        await Admin.findByIdAndUpdate(req.params.id, { isBlocked: false }, { new: true })
        const admins = await Admin.find({ role: { $ne: 'super' } })
        res.status(201).json({ status: true, admins });
    } catch (error) {
        next(error);
    }
}