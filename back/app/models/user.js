const pool = require("../database");

module.exports = class User {
  /**
   * User constructor
   * @param {Object} object 
   */
  constructor(object) {
    for (const property in object) {
      this[property] = object[property];
    }
  }
  /**
   * Get all users
   */
  async findAll() {
    const query = { text: "SELECT * FROM users" };
    try {
    const data = await pool.query(query);
    this.allUsers = data.rows;
    } catch (error) {
      console.log("error", error);
    }
  }
}