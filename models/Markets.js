const mongoose = require("mongoose");
const { runner } = require("./runner");
const { Schema } = mongoose;

const marketResponse = new Schema({
  marketId: String,
  marketName: String,
  marketStartTime: String,
  totalMatched: Number,
  runners: [runner],
});

const marketSchema = new Schema({
  eventId: String,
  markets: [marketResponse],
});

const Markets = mongoose.model("Markets", marketSchema);
module.exports.runner = runner;
module.exports = Markets;
