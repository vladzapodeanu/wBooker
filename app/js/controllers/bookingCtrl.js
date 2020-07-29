const db = require("../../model");
const Booking = db.booking;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const id_booking = req.query.id_booking;
    var condition = id_booking ? { id_booking: { [Op.like]: `%${id_booking}%` } } : null;

    Booking.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving bookings."
            });
        });
};
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id_booking) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const booking = {
        id_booking: req.body.id_booking,
        id_company: req.body.id_company,
        id_user: req.body.id_user,
        id_driver: req.body.id_driver,
        id_cartype: req.body.id_cartype,
        from_address: req.body.from_address,
        to_address: req.body.to_address,
        distance: req.body.distance,
        duration: req.body.duration,
        price: req.body.price,
        payment_method: req.body.payment_method,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at,
        status: req.body.status,
        driver_on_the_way: req.body.driver_on_the_way,
        driver_at_pickup: req.body.driver_at_pickup,
        passenger_on_bord: req.body.passenger_on_bord,
        done: req.body.done,
    };

    // Save Tutorial in the database
    Booking.create(booking)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Booking."
            });
        });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id_booking;

    Booking.update(req.body, {
        where: { id_booking: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Booking was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Booking with id=${id}. Maybe Booking was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Booking with id=" + id
            });
        });
};