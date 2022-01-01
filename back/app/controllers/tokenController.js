const RefreshToken = require("../models/refreshToken");
const { generateAccessToken, generateRefreshToken, decodedRefreshToken } = require("../../utils/jwt");

const tokenController = {
  /**
   * Delete old refreshToken et save new refreshToken and send new accessToken and refreshToken
   * @param {Object} req
   * @param {Object} res
   */
  async generateNewTokens(req, res) {
    const tokenObject = new RefreshToken();
    // we get the refreshToken from the request
    const refreshToken = req.body.refreshToken;
    // we check if the refreshToken is valid
    const decodedToken = decodedRefreshToken(refreshToken);
    if (decodedToken.errorMessage) {
      return res.status(401).send({
        errorMessage: decodedToken.errorMessage,
      });
    }
    // we delete the old refreshToken
    await tokenObject.deleteToken(refreshToken);
    // we generate new refreshToken and accessToken
    const newRefreshToken = generateRefreshToken({
      id: decodedToken.id,
    });
    const newAccessToken = generateAccessToken({
      id: decodedToken.id,
    });
    // we save the new refreshToken in the database
    await tokenObject.insertNewToken(newRefreshToken);
    // we send the response
    return res.status(200).send({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  },
};

module.exports = tokenController;