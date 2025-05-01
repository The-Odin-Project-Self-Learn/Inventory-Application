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
    //join the "games" table to the "game_genres" table on "game_id"
    //join the "genres" table to the "game_genres" table on "genre_id"
    //only keep rows where "genre_name" = categoryName
    //from this filtered table, select only the rows corresponding to the columns from the "games" table
    const query = `
    SELECT games.* FROM games
    JOIN game_genres ON games.game_id = game_genres.game_id
    JOIN genres ON genres.genre_id = game_genres.genre_id
    WHERE genres.genre_name = $1;
    `
    const result = await pool.query(query, [categoryName]);
    return result.rows;
}

async function addGame(categoryName, gameName, gameYear) {

}

module.exports = {
    getAllCategories,
    createNewCategory,
    getCategory,
    addGame,
};
