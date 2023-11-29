const mongoose = require("mongoose");
const { runner } = require("./runner");

const { Schema } = mongoose;

const marketOddsResponse = new Schema({
  marketId: String,
  isMarketDataDelayed: Boolean,
  status: String,
  betDelay: Number,
  bspReconciled: Boolean,
  complete: Boolean,
  inplay: Boolean,
  numberOfWinners: Number,
  numberOfRunners: Number,
  numberOfActiveRunners: Number,
  lastMatchTime: String,
  totalMatched: Number,
  totalAvailable: Number,
  crossMatching: Boolean,
  runnersVoidable: Boolean,
  version: Number,
  runners: [runner],
});

const marketOdds = new Schema({
  marketId: String,
  marketOdds: [marketOddsResponse],
});

const MarketOdds = mongoose.model("MarketOdds", marketOdds);

module.exports = MarketOdds;
