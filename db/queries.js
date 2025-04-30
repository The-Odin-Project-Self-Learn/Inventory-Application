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

async function getCategory(categoryName) {
    // 1. from "genres" table, determine the genre_id corresponding to categoryName
    // 2. in "game_genres" table, filter the table to only show rows with the genre_id from step 1
    // 3. from "games" table, fetch all rows with the "game_id" values from the filtered "game_genres" table
}

module.exports = {
    getAllCategories,
    createNewCategory,
    getCategory,
};
