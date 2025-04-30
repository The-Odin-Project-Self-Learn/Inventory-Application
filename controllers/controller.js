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

module.exports = {
    getHomePage,
    createNewCategory,
};

