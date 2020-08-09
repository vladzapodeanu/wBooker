module.exports = app => {
    const log = require("../js/controllers/logCtrl.js");

    const router = require("express").Router();
    // Retrieve all Tutorials
    router.get("/", log.findAll);

    // Create a new Tutorial
   // router.post("/", log.create);

    // Update a Tutorial with id
    router.put("/:id", log.update);


    app.use('/api/log', router);
};