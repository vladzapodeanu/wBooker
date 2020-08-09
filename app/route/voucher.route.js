module.exports = app => {
    const voucher = require("../js/controllers/voucherCtrl.js");

    const router = require("express").Router();
    // Retrieve all Tutorials
    router.get("/", voucher.findAll);

    // Create a new Tutorial
    //router.post("/", voucher.create);

    // Update a Tutorial with id
    router.put("/:id", voucher.update);


    app.use('/api/voucher', router);
};