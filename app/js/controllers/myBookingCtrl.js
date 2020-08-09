const db = require("../../model");
const MyBooking = db.log;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const id_log = req.query.id_log;
    var condition = id_log ? { id_log: { [Op.like]: `%${id_log}%` } } : null;

    MyBooking.findAll({
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

exports.update = (req, res) => {
    const id = req.params.id_log;

    MyBooking.update(req.body, {
        where: { id_log: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "MyBooking was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update MyBooking with id=${id}. Maybe MyBooking was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating MyBooking with id=" + id
            });
        });
};