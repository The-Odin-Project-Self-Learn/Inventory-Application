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
    const query1 = `
        INSERT INTO games (title, year)
        VALUES ($1, $2);
    `
    const query2 = `
        SELECT genre_id FROM genres
        WHERE genre_name = $1;
    `
    const query3 = `
        SELECT game_id FROM games
        WHERE title = $1;
    `
    const query4 = `
        INSERT INTO game_genres (game_id, genre_id)
        VALUES ($1, $2);
    `
    if (!(await checkDuplicateGame(gameName))) {
        await pool.query(query1, [gameName, gameYear]); //add game + year to "games" table
    }
    const genreResult = await pool.query(query2, [categoryName]); //object with "rows" attribute, representing desired rows
    const genreID = genreResult.rows[0].genre_id; //get genreID
    const gameResult = await pool.query(query3, [gameName]);
    const gameID = gameResult.rows[0].game_id; //get gameID
    await pool.query(query4, [gameID, genreID]); //add gameID and genreID to "game_genres" table
}

async function checkDuplicateGame(gameName) {
    const query0 = `
        SELECT game_id FROM games
        WHERE title = $1;
    `
    const checkDuplicateResult = await pool.query(query0, [gameName]);
    if (checkDuplicateResult.rows.length > 0) {
        return true;
    }
    return false;
}

module.exports = {
    getAllCategories,
    createNewCategory,
    getCategory,
    addGame,
};
