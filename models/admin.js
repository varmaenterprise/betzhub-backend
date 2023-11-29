const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const adminSchema = Schema({
    adminName: String,
    password: String,
    role: {
        type: String,
        enum: ['super', 'partner', 'admin']
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    phonenumber: Number,
});

adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;