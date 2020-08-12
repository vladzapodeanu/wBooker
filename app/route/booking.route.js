module.exports = app => {
    const booking = require("../js/controllers/bookingCtrl.js");

    const router = require("express").Router();
    // Retrieve all Tutorials
    router.get("/", booking.findAll);

    // Create a new Tutorial
    router.post("/create", booking.create);

    // Update a Tutorial with id
    router.get("/:id_booking", booking.findOne);


    app.use('/api/booking', router);
};