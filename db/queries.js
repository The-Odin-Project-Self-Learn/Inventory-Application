const pool = require('./pool.js');

async function getAllCategories() {
    const result = await pool.query("SELECT * FROM genres");
    return result.rows;
}

module.exports = {
    getAllCategories,
};
