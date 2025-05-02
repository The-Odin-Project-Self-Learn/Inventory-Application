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
    //check to see if the game exists in the "games" table - add it if not
    const gameExists = await doesGameExist(gameName);
    if (!gameExists) {
        await addGameToTable(gameName, gameYear);
    }
    //once game exists in "games", check to see if game is linked to genre. Link them if not.
    const linked = await isGameLinkedToGenre(categoryName, gameName);
    if (!linked) {
        //link the game to the genre
        await linkGameToGenre(categoryName, gameName);
    }
}

async function doesGameExist(gameName) {
    const query = `
        SELECT title FROM games
        WHERE title = $1;
    `
    const result = await pool.query(query, [gameName]);
    if (result.rows.length > 0) {
        return true;
    }
    return false;
}

async function addGameToTable(gameName, gameYear) {
    const query = `
        INSERT INTO games (title, year)
        VALUES ($1, $2);
    `
    await pool.query(query, [gameName, gameYear]);
}

async function isGameLinkedToGenre(categoryName, gameName) {
    //obtain game_id and genre_id
    const query1 = `
        SELECT game_id FROM games
        WHERE title = $1;
    `
    const gameResult = await pool.query(query1, [gameName]);
    const gameID = gameResult.rows[0].game_id;
    
    const query2 = `
        SELECT genre_id FROM genres
        WHERE genre_name = $1;
    `
    const genreResult = await pool.query(query2, [categoryName]);
    const genreID = genreResult.rows[0].genre_id;

    //check for existence of (game_id, genre_id) pair in game_genres table
    const query3 = `
        SELECT game_id, genre_id FROM game_genres
        WHERE game_id = $1 AND genre_id = $2;
    `
    const checkResult = await pool.query(query3, [gameID, genreID]);
    if (checkResult.rows.length > 0) {
        return true;
    }
    return false;
}

async function linkGameToGenre(categoryName, gameName) {
    //obtain game_id and genre_id
    const query1 = `
        SELECT game_id FROM games
        WHERE title = $1;
    `
    const gameResult = await pool.query(query1, [gameName]);
    const gameID = gameResult.rows[0].game_id;
    
    const query2 = `
        SELECT genre_id FROM genres
        WHERE genre_name = $1;
    `
    const genreResult = await pool.query(query2, [categoryName]);
    const genreID = genreResult.rows[0].genre_id;

    //add the game_id + genre_id pair to the game_genres table
    const linkQuery = `
        INSERT INTO game_genres (game_id, genre_id)
        VALUES ($1, $2);
    `
    await pool.query(linkQuery, [gameID, genreID]);
}

async function deleteGame(gameName, genre) {
    const query1 = `
        SELECT game_id FROM games
        WHERE title = $1;
    `
    const query2 = `
        SELECT genre_id FROM genres
        WHERE genre_name = $1;
    `
    const query3 = `
        DELETE FROM game_genres
        WHERE game_id = $1 AND genre_id = $2;
    `
    const gameResult = await pool.query(query1, [gameName]);
    const gameID = gameResult.rows[0].game_id;
    const genreResult = await pool.query(query2, [genre]);
    const genreID = genreResult.rows[0].genre_id;
    await pool.query(query3, [gameID, genreID]); //remove game and genre link from "game_genres" table
}


module.exports = {
    getAllCategories,
    createNewCategory,
    getCategory,
    addGame,
    deleteGame,
};
