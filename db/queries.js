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
    //join the game_genres table with the games table and genres table, then filter to only contain rows containing the given genre name
    const query = `
    SELECT games.* FROM games
    JOIN game_genres ON games.game_id = game_genres.game_id
    JOIN genres ON genres.genre_id = game_genres.genre_id
    WHERE genres.genre_name = $1;
    `
    const result = await pool.query(query, [categoryName]);
    return result.rows;
}

module.exports = {
    getAllCategories,
    createNewCategory,
    getCategory,
};
