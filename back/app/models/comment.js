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
    this.allComments = data.rows;
    } catch (error) {
      console.log("error", error);
    }
  }
  /**
   * Create a new comment
   * @param {number} userId id of the user who created the comment
   */
  async createOne(userId) {
    const query = {
      text: `INSERT INTO comments (content, score, replying_to, user_id) VALUES ($1, $2, $3, $4)`,
      values: [this.content, this.score, this.replying_to, userId],
    };
    await pool.query(query);
  }
  /**
   * Find a comment by id
   * @param {number} id id of the comment to find
   */
  async findOne(id) {
    const query = {
      text: `SELECT comments.id, comments.content, comments.score, comments.replying_to, comments.created_at,
      json_build_object(
        'id', users.id,
        'username', users.username,
        'avatar_url', users.avatar_url
      ) as user
    FROM comments INNER JOIN users ON users.id = comments.user_id WHERE comments.id = $1`,
        
      values: [id],
    };
    const data = await pool.query(query);
    this.serviceById = data.rows;
  }
  /**
   * Modify a comment content
   * @param {number} id id of the comment to modify
   */
  async updateContentOne(id) {
    const query = {
      text: `UPDATE comments SET content = $1 WHERE id = $2`,
      values: [this.content, id],
    };
    await pool.query(query);
  }
  /**
   * Update a comment score
   * @param {number} id id of the comment to modify
   */
  async updateScoreOne(id) {
    const query = {
      text: `UPDATE comments SET score = $1 WHERE id = $2`,
      values: [this.score, id],
    };
    await pool.query(query);
  }
};
