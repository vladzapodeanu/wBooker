const db = require("../../model");
const Account = db.account;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const id_account = req.query.id_account;
    var condition = id_account ? { id_account: { [Op.like]: `%${id_account}%` } } : null;

    Account.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving accounts."
            });
        });
};
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id_account) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const account = {
        id_account: req.body.id_account,
        id_company: req.body.id_company,
        name: req.body.name,
        type: req.body.type
    };

    // Save Tutorial in the database
    Account.create(account)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Account."
            });
        });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id_account;

    Account.update(req.body, {
        where: { id_account: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Account was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Account with id=${id}. Maybe Account was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Account with id=" + id
            });
        });
};