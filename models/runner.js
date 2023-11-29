const mongoose = require("mongoose");
const { Schema } = mongoose;

const available = new Schema({
  price: Number,
  size: Number,
});

const tradedVolume = new Schema({});

const ex = new Schema({
  availableToBack: [available],
  availableToLay: [available],
  tradedVolume: [tradedVolume],
});

module.exports.runner = new Schema({
  selectionId: Number,
  runnerName: String,
  handicap: Number,
  sortPriority: Number,
  status: String,
  lastPriceTraded: Number,
  totalMatched: Number,
  ex: ex,
});
