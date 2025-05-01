const db = require('../db/queries');

async function getHomePage(req, res) {
    try {
        const rows = await db.getAllCategories();
        console.log("Rows: ", rows);
        res.render("home.ejs", {rows: rows});
    } catch(err) {
        console.log("Error fetching categories: ", err);
        res.status(500).send("Server error");
    }
}

async function createNewCategory(req, res) {
    try {
        const categoryName = req.body.name;
        await db.createNewCategory(categoryName);
        console.log("Category created: ", categoryName);
        res.redirect("/");
    } catch(err) {
        console.log("Error creating new category: ", err);
        res.status(500).send("Server error");
    }
}

async function getCategory(req, res) {
    try {
        const categoryName = req.params.genreName;
        const rows = await db.getCategory(categoryName);
        console.log(`${categoryName} games: `, rows);
        res.render("viewCategory.ejs", {categoryName: categoryName, rows: rows});
    } catch(err) {
        console.log("Error fetching category: ", err);
        res.status(500).send("Server error");
    }
}

async function addGame(req, res) {
    try {
        const gameCategory = req.params.categoryName;
        const gameName = req.body.name;
        const gameYear = req.body.year;
        await db.addGame(gameCategory, gameName, gameYear);
        console.log(`${gameName} (${gameYear}) added to ${gameCategory} category`);
        res.redirect(`/genre/${gameCategory}`);

    } catch(err) {
        console.log("Error adding game to category: ", err);
        res.status(500).send("Server error");
    }
}

async function deleteGame(req, res) {
    try {
        const gameName = req.params.gameName;
        const genre = req.params.categoryName;
        await db.deleteGame(gameName, genre);
        console.log(`Deleted ${gameName} from ${genre} category`);
        res.redirect(`/genre/${genre}`);
    } catch(err) {
        console.log("Error deleting game: ", err);
        res.status(500).send("Server error");
    }
}

module.exports = {
    getHomePage,
    createNewCategory,
    getCategory,
    addGame,
    deleteGame,
};

