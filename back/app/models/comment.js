const pool = require("../database");

module.exports = class Comment {
  /**
   * Comment constructor
   * @param {Object} object 
   */
  constructor(object) {
    for (const property in object) {
      this[property] = object[property];
    }
  }
  /**
   * Get all comments
   */
  async findAll() {
    const query = { text: `SELECT comments.id, comments.content, comments.score, comments.replying_to, comments.created_at,
      json_build_object(
        'id', users.id,
        'username', users.username,
        'avatar_url', users.avatar_url
      ) as user
    FROM comments INNER JOIN users ON users.id = comments.user_id` };
    try {
    const data = await pool.query(query);
    console.log(data.rows);
    this.allComments = data.rows;
    } catch (error) {
      console.log("error", error);
    }
  }
}