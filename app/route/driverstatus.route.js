module.exports = app => {
    const driverstatus = require("../js/controllers/driverstatusCtrl.js");

    const router = require("express").Router();
    // Retrieve all Tutorials
    router.get("/", driverstatus.findAll);

    // Create a new Tutorial
    router.post("/", driverstatus.create);

    // Update a Tutorial with id
    router.put("/:id", driverstatus.update);


    app.use('/api/driverstatus', router);
};