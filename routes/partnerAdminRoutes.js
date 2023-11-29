const { getPAusers, createNewUser } = require("../controller/PartnerAdminController")
const { adminVerification } = require("../middlewares/authMiddleware")

module.exports = (app) => {
    
    app.post("/admin/createNewUser", adminVerification, createNewUser)
    app.get("/admin/pa-userList", adminVerification, getPAusers);

}