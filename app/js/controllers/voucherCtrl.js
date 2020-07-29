const db = require("../../model");
const Voucher = db.voucher;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const code = req.query.code;
    var condition = code ? { code: { [Op.like]: `%${code}%` } } : null;

    Voucher.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving vouchers."
            });
        });
};
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.code) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const voucher = {
        code: req.body.code,
        value: req.body.value,
        type: req.body.type,
        from: req.body.from,
        to: req.body.to,
        enabled: req.body.enabled
    };

    // Save Tutorial in the database
    Voucher.create(voucher)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Voucher."
            });
        });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.code;

    Voucher.update(req.body, {
        where: { code: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Voucher was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Voucher with id=${id}. Maybe Voucher was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Voucher with id=" + id
            });
        });
};