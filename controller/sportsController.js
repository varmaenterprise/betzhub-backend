const axios = require("axios");
const NodeCache = require("node-cache");
const {
  SaveSportsData,
  SaveSeriesData,
  SaveMatchesData,
  SaveMarketsData,
  SaveMarketOdds,
} = require("../services/sportsService");

const cache = new NodeCache({ stdTTL: 3600 });

const fetchDataWithCache = async (cacheKey, apiUrl, dataSaver) => {
  console.log(cache.keys());
  let message;
  let data;
  try {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      message = "Data fetched from cached";
    } else {
      const response = await axios.get(apiUrl);
      if (response.status === 200) {
        data = response.data;
        cache.set(cacheKey, data);
        if (typeof dataSaver === "function") {
          message = await dataSaver(data);
        }
      }
    }
    return { data: cachedData || data, message };
  } catch (error) {
    console.log(error);
    return { error: "An error occurred" };
  }
};

module.exports.GetAllSports = async (req, res) => {
  const cacheKey = "sportsData";
  const apiUrl = "http://localhost:4000/getSports";
  const result = await fetchDataWithCache(cacheKey, apiUrl, SaveSportsData);
  res.status(201).json(result);
};

module.exports.GetSeriesByEventType = async (req, res) => {
  const eventType = req.params.eventType;
  const cacheKey = `seriesByEventType_${eventType}`;
  const apiUrl = `http://localhost:5001/getSeries/${eventType}`;
  const result = await fetchDataWithCache(
    cacheKey,
    apiUrl,
    (data) => SaveSeriesData(data, eventType) // Pass data and eventType
  );
  res.status(201).json(result);
};

module.exports.GetMatchesBySeriesAndSportIds = async (req, res) => {
  const eventType = req.params.eventType;
  const competitionId = req.params.competitionId;
  const cacheKey = `getMatches_${eventType}_${competitionId}`;
  const apiUrl = `http://localhost:5001/getMatches/${eventType}/${competitionId}`;
  const result = await fetchDataWithCache(
    cacheKey,
    apiUrl,
    (data) => SaveMatchesData(data, eventType, competitionId) // Pass data, eventType, and competitionId
  );
  res.status(201).json(result);
};

module.exports.GetMarketsByEventId = async (req, res) => {
  const eventId = req.params.eventId;
  const cacheKey = `getMarketsByEventId_${eventId}`;
  const apiUrl = `http://localhost:5001/getMarkets/${eventId}`;
  const result = await fetchDataWithCache(
    cacheKey,
    apiUrl,
    (data) => SaveMarketsData(data, eventId) // Pass data and eventId
  );
  res.status(201).json(result);
};

module.exports.GetMarketByMarketId = async (req, res) => {
  const marketId = req.params.marketId;
  const cacheKey = `getSpecificMarket_${marketId}`;
  const apiUrl = `http://localhost:5001/getMarketByMarketId/${marketId}`;
  const result = await fetchDataWithCache(cacheKey, apiUrl, null);
  res.status(201).json(result);
};

// might have to use websockets for connection for the below endpoint.
// refer docs
module.exports.GetMarketOddsByMarketId = async (req, res) => {
  const marketId = req.params.marketId;
  try {
    const response = await axios.get(
      `http://localhost:5001/getMarketOddsByMarketId/${marketId}`
    );
    if (response.status === 200) {
      await SaveMarketOdds(response.data, marketId);
    }
    res.status(201).json({ data: response.data });
  } catch (error) {
    console.log(error);
  }
};
