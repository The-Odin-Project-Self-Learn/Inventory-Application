const express = require('express'); //loads the Express module
const router = require('./routes/router.js');
const path = require("node:path");

const app = express(); //creates Express application
const assetsPath = path.join(__dirname, "public");

app.set("view engine", "ejs");
app.use(express.static(assetsPath));
app.use(express.urlencoded({extended: true}));

app.use("/", router);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});