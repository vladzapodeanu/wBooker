const db = require("../../model");
const DriverStatus = db.driverstatus;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const id_user = req.query.id_user;
    var condition = id_user ? { id_user: { [Op.like]: `%${id_user}%` } } : null;

    DriverStatus.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving driverstatuss."
            });
        });
};
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id_user) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const driverstatus = {
        id_user: req.body.id_user,
        online: req.body.online,
        status: req.body.status,
        lat: req.body.lat,
        longit: req.body.longit
    };

    // Save Tutorial in the database
    DriverStatus.create(driverstatus)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the DriverStatus."
            });
        });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id_user;

    DriverStatus.update(req.body, {
        where: { id_user: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "DriverStatus was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update DriverStatus with id=${id}. Maybe DriverStatus was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating DriverStatus with id=" + id
            });
        });
};