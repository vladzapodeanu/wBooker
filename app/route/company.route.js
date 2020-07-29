module.exports = app => {
    const company = require("../js/controllers/companyCtrl.js");

    const router = require("express").Router();
    // Retrieve all Tutorials
    router.get("/", company.findAll);

    // Create a new Tutorial
    router.post("/", company.create);

    // Update a Tutorial with id
    router.put("/:id", company.update);


    app.use('/api/company', router);
};