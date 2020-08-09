module.exports = app => {
    const user = require("../js/controllers/userCtrl.js");

    const router = require("express").Router();
    // Retrieve all Tutorials
    router.get("/", user.findAll);

    // Create a new Tutorial
    //router.post("/", user.create);

    // Update a Tutorial with id
    router.put("/:id", user.update);


    app.use('/api/user', router);
};