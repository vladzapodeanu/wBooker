const db = require("../../model");
const Company = db.company;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const id_company = req.query.id_company;
    var condition = id_company ? { id_company: { [Op.like]: `%${id_company}%` } } : null;

    Company.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving companys."
            });
        });
};
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id_company) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const company = {
        id_company: req.body.id_company,
        name: req.body.name
    };

    // Save Tutorial in the database
    Company.create(company)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Company."
            });
        });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id_company;

    Company.update(req.body, {
        where: { id_company: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Company was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Company with id=${id}. Maybe Company was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Company with id=" + id
            });
        });
};