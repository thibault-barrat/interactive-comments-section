const pool = require("../database");
// bcrypt library to hash password
const bcrypt = require("bcrypt");

module.exports = class User {
  // we define saltRounds to set the number of rounds to use when hashing the password
  saltRounds = 10;
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
   * Method to get user with its email
   * @param {string} email 
   */
  async findUserByEmail(email) {
    const query = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email]
    };
    const result = await pool.query(query);
    this.userByEmail = result.rows;
  }
  /**
 * Method to get user with its username
 * @param {string} username 
 */
  async findUserByUsername(username) {
    const query = {
      text: "SELECT * FROM users WHERE username = $1",
      values: [username]
    };
    const result = await pool.query(query);
    this.userByUsername = result.rows;
  }
  /**
   * Method to check if the email is already used
   * @param {string} email 
   */
  async checkUserEmail(email) {
    // to check if the email is already used, we select the user with the email
    await this.findUserByEmail(email);
    // if the user is found, we return true
    if (this.userByEmail.length !== 0) {
      return (this.checkEmail = true);
    }
    // if the user is not found, we return false
    return (this.checkEmail = false);
  }
  /**
   * Method to check if username is already used
   * @param {string} username 
   */
  async checkUserUsername(username) {
    await this.findUserByUsername(username);
    if (this.userByUsername.length !== 0) {
      return (this.checkUsername = true);
    }
    return (this.checkUsername = false);
  }
  /**
   * Method to check if the password is correct
   */
  async checkUserPassword() {
    const passwordbcrypt = await bcrypt.compare(this.password, this.userByEmail[0].password);
    if (passwordbcrypt) {
      return (this.checkPassword = true);
    }
    return (this.checkPassword = false);
  }
  /**
   * Method to create a new user
   */
  async createOne() {
    // before we create a new user, we check if the email or username is already used
    await this.checkUserEmail(this.email);
    await this.checkUserUsername(this.username);
    // if the email or username is already used, we return
    if (this.checkEmail || this.checkUsername) {
      return;
    }
    // if the email or username is not used, we hash the password
    const hashedPassword = await bcrypt.hash(this.password, this.saltRounds);
    // we insert the user in the database
    const query =
      {
        text: "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
        values: [this.username, this.email, hashedPassword]
      };
    const result = await pool.query(query);
  }
}