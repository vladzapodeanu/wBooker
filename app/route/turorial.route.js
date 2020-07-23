module.exports = app => {
    const tutorials = require("../js/controllers/LoginCtrl.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", tutorials.create);

    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);

    // Retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);

    // Update a Tutorial with id
    router.put("/:id", tutorials.update);


    app.use('/api/tutorials', router);
};