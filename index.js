const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

app.use(
  cors({
    origin: ["http://localhost:5000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    // credentials: true,
  })
);

app.use(express.json());

require("./routes/authRoutes")(app);
require("./routes/sportsRoutes")(app);
require("./routes/adminRoutes")(app);
require("./routes/superAdminRoutes")(app);
require("./routes/partnerAdminRoutes")(app);



app.listen(PORT, (req, res) => {
  console.log("Server running on port => ", PORT);
});
