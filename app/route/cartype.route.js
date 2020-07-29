module.exports = app => {
    const cartype = require("../js/controllers/cartypeCtrl.js");

    const router = require("express").Router();
    // Retrieve all Tutorials
    router.get("/", cartype.findAll);

    // Create a new Tutorial
    router.post("/", cartype.create);

    // Update a Tutorial with id
    router.put("/:id", cartype.update);


    app.use('/api/cartype', router);
};