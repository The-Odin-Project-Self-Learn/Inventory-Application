const express = require('express'); //loads the Express module
const app = express(); //creates Express application
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
const router = require('./routes/router.js');

app.use("/", router);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});