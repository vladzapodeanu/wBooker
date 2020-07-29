const db = require("../../model");
const CarType = db.cartype;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const id_cartype = req.query.id_cartype;
    var condition = id_cartype ? { id_cartype: { [Op.like]: `%${id_cartype}%` } } : null;

    CarType.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cartypes."
            });
        });
};
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id_cartype) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const cartype = {
        id_cartype: req.body.id_cartype,
        id_company: req.body.id_company,
        type: req.body.type,
        picture: req.body.picture,
        description: req.body.description,
        capacity: req.body.capacity,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at,
    };

    // Save Tutorial in the database
    CarType.create(cartype)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the CarType."
            });
        });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id_cartype;

    CarType.update(req.body, {
        where: { id_cartype: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "CarType was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update CarType with id=${id}. Maybe CarType was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating CarType with id=" + id
            });
        });
};