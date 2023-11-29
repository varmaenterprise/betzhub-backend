const { getAllusers, BlockUser, UnblockUser } = require("../controller/adminController");
const { adminVerification } = require("../middlewares/authMiddleware")

module.exports = (app) => {

    app.get("/admin/userList", adminVerification, getAllusers);

    app.post("/admin/blockUser/:id", adminVerification, BlockUser)

    app.post("/admin/unblockUser/:id", adminVerification, UnblockUser)

}