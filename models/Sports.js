const mongoose = require("mongoose");
const { Schema } = mongoose;

const competitionSchema = new Schema({
  id: String,
  name: String,
});

const seriesResponseSchema = new Schema({
  competition: competitionSchema,
  marketCount: Number,
  competitionRegion: String,
});

const eventSchema = new Schema({
  id: String,
  name: String,
  countryCode: String,
  timezone: String,
  openDate: String,
});

const matchesResponse = new Schema({
  event: eventSchema,
  marketCount: String,
  scoreboard_id: String,
  selections: String,
  liability_type: String,
  undeclared_markets: String,
});

const matchesDocSchema = new Schema({
  competitionId: String,
  matchesForSeries: [matchesResponse],
});

const sportsSchema = new Schema({
  eventType: String,
  name: String,
  marketCount: Number,
  series: [seriesResponseSchema],
  matches: [matchesDocSchema],
});

const Sports = mongoose.model("Sports", sportsSchema);

module.exports = Sports;
