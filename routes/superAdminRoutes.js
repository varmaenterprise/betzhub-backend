const { CreateNewAdmin, getAllAdmins, BlockAdmin, unblockAdmin } = require("../controller/superAdminController")
const { adminVerification } = require("../middlewares/authMiddleware")

module.exports = (app) => {

    app.post("/admin/createNewAdmin", adminVerification, CreateNewAdmin);

    app.get("/admin/adminslist", adminVerification, getAllAdmins);

    app.post("/admin/blockAdmin/:id", adminVerification, BlockAdmin);

    app.post("/admin/unblockAdmin/:id", adminVerification, unblockAdmin);


}