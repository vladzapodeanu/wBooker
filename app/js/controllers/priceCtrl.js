const db = require("../../model");
const Price = db.price;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const id_price = req.query.id_price;
    var condition = id_price ? { id_price: { [Op.like]: `%${id_price}%` } } : null;

    Price.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: condition
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving prices."
            });
        });
};
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id_price) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const price = {
        id_price: req.body.id_price,
        id_company: req.body.id_company,
        id_cartype: req.body.id_cartype,
        id_user: req.body.id_user,
        distance_threshold: req.body.distance_threshold,
        charge: req.body.charge,
        type: req.body.type,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at
    };

    // Save Tutorial in the database
    Price.create(price)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Price."
            });
        });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id_price;

    Price.update(req.body, {
        where: { id_price: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Price was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Price with id=${id}. Maybe Price was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Price with id=" + id
            });
        });
};