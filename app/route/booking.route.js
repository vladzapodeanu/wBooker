module.exports = app => {
    const booking = require("../js/controllers/bookingCtrl.js");

    const router = require("express").Router();
    // Retrieve all Tutorials
    router.get("/", booking.findAll);

    // Create a new Tutorial
    router.post("/", booking.create);

    // Update a Tutorial with id
    router.put("/:id", booking.update);


    app.use('/api/booking', router);
};