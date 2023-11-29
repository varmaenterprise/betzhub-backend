const {
  GetAllSports,
  GetSeriesByEventType,
  GetMatchesBySeriesAndSportIds,
  GetMarketsByEventId,
  GetMarketByMarketId,
  GetMarketOddsByMarketId,
} = require("../controller/sportsController");
const { userVerification } = require("../middlewares/authMiddleware");

module.exports = (app) => {
  app.get("/getSports", userVerification, GetAllSports);
  app.get(
    "/getSeriesAsPerSport/:eventType",
    userVerification,
    GetSeriesByEventType
  );
  app.get(
    "/getMatchesBySeriesAndSportId/:eventType/:competitionId",
    userVerification,
    GetMatchesBySeriesAndSportIds
  );
  app.get(
    "/getMarketsByEventId/:eventId",
    userVerification,
    GetMarketsByEventId
  );
  app.get(
    "/getMarketByMarketId/:marketId",
    userVerification,
    GetMarketByMarketId
  );
  app.get(
    "/getMarketOddsByMarketId/:marketId",
    userVerification,
    GetMarketOddsByMarketId
  );
};
