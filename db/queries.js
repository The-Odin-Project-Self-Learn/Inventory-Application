const pool = require('./pool.js');

async function getAllCategories() {
    const result = await pool.query("SELECT * FROM genres");
    return result.rows;
}

async function createNewCategory(categoryName) {
    await pool.query(
        "INSERT INTO genres (genre_name) VALUES ($1)",
        [categoryName]
    );
}

module.exports = {
    getAllCategories,
    createNewCategory,
};
