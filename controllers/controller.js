const db = require('../db/queries');

async function getHomePage(req, res) {
    try {
        const rows = await db.getAllCategories();
        console.log("Rows: ", rows);
        res.send("categories loaded");
        //res.render("home.ejs", {rows: rows});
    } catch(err) {
        console.log("Error fetching categories: ", err);
        res.status(500).send("Server error");
    }
}

module.exports = {
    getHomePage,
};

