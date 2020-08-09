const db = require("../../model");
const Log = db.log;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const id_log = req.query.id_log;
    var condition = id_log ? { id_log: { [Op.like]: `%${id_log}%` } } : null;

    Log.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: condition
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving logs."
            });
        });
};
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id_log) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const log = {
        id_log: req.body.id_log,
        id_driver: req.body.id_driver,
        values: req.body.values
    };

    // Save Tutorial in the database
    Log.create(log)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Log."
            });
        });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id_log;

    Log.update(req.body, {
        where: { id_log: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Log was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Log with id=${id}. Maybe Log was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Log with id=" + id
            });
        });
};