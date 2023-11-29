const MarketOdds = require("../models/MarketOdds");
const Markets = require("../models/Markets");
const Sports = require("../models/Sports");

module.exports.SaveSportsData = async (data) => {
  try {
    const existingSports = await Sports.find({});
    if (existingSports.length === 0) {
      await Sports.insertMany(data);
    }
    return "data saved in db";
  } catch (error) {
    console.log(error);
    return "error occured while saving data in db";
  }
};

module.exports.SaveSeriesData = async (data, eventType) => {
  try {
    await Sports.findOneAndUpdate(
      { eventType: eventType },
      { $set: { series: data } },
      { new: true }
    );
    return "successfully saved in db";
  } catch (error) {
    console.log(error);
    return "error occured while saving in db";
  }
};

module.exports.SaveMatchesData = async (data, eventType, competitionId) => {
  try {
    const matches = {
      competitionId: competitionId,
      matchesForSeries: data,
    };
    await Sports.findOneAndUpdate(
      { eventType: eventType },
      { $set: { matches: matches } }
    );
    return "successfullyu saved in db";
  } catch (error) {
    console.log(error);
    return "error occured while saving in db";
  }
};

module.exports.SaveMarketsData = async (data, eventId) => {
  try {
    const existingMarket = await Markets.findOne({ eventId: eventId });
    if (!existingMarket) {
      const newData = new Markets();
      newData.eventId = eventId;
      newData.markets = data;
      await newData.save();
    }
  } catch (error) {
    console.log(error);
    return "error occured while saving in db";
  }
};

module.exports.SaveMarketOdds = async (data, marketId) => {
  try {
    const existingMarketOdd = await MarketOdds.findOne({ marketId: marketId });
    if (!existingMarketOdd) {
      const newData = new MarketOdds();
      newData.marketId = marketId;
      newData.marketOdds = data;
      await newData.save();
    }
  } catch (error) {
    console.log(error);
    return "error occured while saving in db";
  }
};
