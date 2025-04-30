const express = require('express'); //loads the Express module
const router = require('./routes/router.js');
const path = require("node:path");

const app = express(); //creates Express application
const assetsPath = path.join(__dirname, "public"); //__dirname refers to the path that the current script is in, so joining __dirname to "public" gives the full path to the "public" folder

app.set("view engine", "ejs");
app.use(express.static(assetsPath)); //tells the Express app to use all files inside the "public" folder as static assets
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", router);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});