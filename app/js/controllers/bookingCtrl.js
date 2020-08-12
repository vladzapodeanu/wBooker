const db = require("../../model");
const Booking = db.booking;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const id_booking = req.query.id_booking;
    var condition = id_booking ? { id_booking: { [Op.like]: `%${id_booking}%` } } : null;

    Booking.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: condition
    })
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
//Create and Save a new Tutorial
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
        id_account: 4,
        id_company: 1,
        id_user: req.body.id_user,
        id_driver: 1,
        id_cartype: 1,
        from_adress: req.body.from_adress,
        to_adress: req.body.to_adress,
        distance: req.body.distance,
        price: req.body.price,
        duration: req.body.duration,
        payment_method: req.body.payment_method,
        status: req.body.status,
        done: 0
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
exports.findOne = (req, res) => {
    return Booking.findAll({
        where: {
            id_user: req.params.id_user
        },
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(booking => {
                if(!Booking){
                    return res.status(404).json({message: "user Not Found"})
                }
                return res.status(200).json(Booking)
            }
        )
        .catch(error => res.status(400).send(error));
}
