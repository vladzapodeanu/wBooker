module.exports = app => {
    const price = require("../js/controllers/priceCtrl.js");

    const router = require("express").Router();
    // Retrieve all Tutorials
    router.get("/", price.findAll);

    // Create a new Tutorial
    router.post("/", price.create);

    // Update a Tutorial with id
    router.put("/:id", price.update);


    app.use('/api/price', router);
};