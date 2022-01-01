const pool = require("../database");

module.exports = class RefreshToken {
  /**
   * Method to get all tokens
   */
  async getAllTokens() {
    const query = {
      text: `SELECT refreshtoken FROM refreshtokens`,
    };
    const result = await pool.query(query);
    this.allTokens = result.rows;
  }
  /**
   * Method to insert a new token
   * @param {string} newRefreshToken
   */
  async insertNewToken(newRefreshToken) {
    const query = {
      text: `INSERT INTO refreshtokens (refreshtoken) VALUES ($1)`,
      values: [newRefreshToken],
    };
    await pool.query(query);
  }
  /**
   * Method to delete a token
   * @param {string} oldRefreshToken
   */
  async deleteToken(oldRefreshToken) {
    const query = {
      text: `DELETE FROM refreshtokens WHERE refreshtoken = $1`,
      values: [oldRefreshToken],
    };
    await pool.query(query);
  }
  /**
   * Method to delete all tokens
   */
  async deleteAllTokens() {
    const query = {
      text: `DELETE FROM refreshtokens`,
    };
    await pool.query(query);
  }
};