const db = require("../../model");
const User = db.user;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const id_user = req.query.id_user;
    var condition = id_user ? { id_user: { [Op.like]: `%${id_user}%` } } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
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
    const user = {
        id_user: req.body.id_user,
        id_company: req.body.id_company,
        user_type: req.body.user_type,
        role: req.body.role,
        password: req.body.password,
        type: req.body.type,
        id_account: req.body.id_account,
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone_number: req.body.phone_number,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at
    };

    // Save Tutorial in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id_user;

    User.update(req.body, {
        where: { id_user: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};