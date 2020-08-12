module.exports = app => {
    const user = require("../js/controllers/userCtrl.js");

    const router = require("express").Router();
    // Retrieve all Tutorials
    router.get("/", user.findAll);

    // Create a new Tutorial
    router.post("/create", user.create);

    router.get('/:id_user', user.findOne);


    router.get('/userEmail/:email', user.findByEmail);

    // Update a Tutorial with id
    router.put("/:id_user", user.update);


    app.use('/api/user', router);
};