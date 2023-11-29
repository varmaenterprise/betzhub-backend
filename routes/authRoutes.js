const { Signup, Login, SuperAdminLogin, PartnerAdminLogin, AdminLogin } = require("../controller/authController");

module.exports = (app) => {

  // User Authentications
  app.post("/auth/register", Signup);
  app.post("/auth/login", Login);

  // Admin Authentications
  app.post("/auth/super-admin/login", SuperAdminLogin)
  app.post("/auth/partner-admin/login", PartnerAdminLogin)
  app.post("/auth/admin/login", AdminLogin)

};
