const {Router} = require('express'); //pulls the Router constructor function out of the Express module
const router = Router(); //constructs a new instance of a Router object - enables the modularization of routes through export
const controller = require('../controllers/controller.js');

router.get("/", controller.getHomePage);
router.get("/genre/:genreName", controller.getCategory);
router.post("/new-category", controller.createNewCategory);

module.exports = router;