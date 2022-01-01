const RefreshToken = require("../models/refreshToken");
// const { decodedAccessToken, decodedRefreshToken } = require("../../utils/jwt");

/**
 * Function to check validity of refreshToken
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const checkRefreshToken = async (req, res, next) => {
  // we get the refreshToken from the request
  const refreshToken = req.body.refreshToken;
  // if there is no refreshToken in the body, we send an error message
  if (!refreshToken) {
    return res.status(401).send({
      errorMessage: "A token is required for authentication",
    });
  }

  // we check if refreshToken exists in the database
  // we get all tokens to create the allTokens property
  // and we check if the refreshToken is in allTokens
  const tokenObject = new RefreshToken();
  await tokenObject.getAllTokens();
  if(!tokenObject.allTokens.some(row => row.refreshtoken === refreshToken)) {
    return res.status(401).send({
      errorMessage: "Refresh token is not valid !",
    });
  }
  next();
}

module.exports = { checkRefreshToken };