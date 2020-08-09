module.exports = app => {
    const account = require("../js/controllers/accountCtrl.js");

    const router = require("express").Router();
    // Retrieve all Tutorials
    router.get("/", account.findAll);

    // Create a new Tutorial
    //router.post("/", account.create);

    // Update a Tutorial with id
    router.put("/:id", account.update);


    app.use('/api/account', router);
};