const db = require("../../model");
const User = db.user;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const id_user = req.query.id_user;
    var condition = id_user ? { id_user: { [Op.like]: `%${id_user}%` } } : null;

    User.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: condition
    })
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
        id_user: 4,
        id_company: 1,
        user_type: 'admin',
        role: 'admin',
        type: 'permanent',
        password: 'dada',
        is_account: 1,
        name: 'Adrian',
        adress: 'Str Ciurchi',
        email: 'ionica@gamil.com',
        phone_number: '0746497607'
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

exports.findByEmail = (req, res) => {
    console.log("findByEmail");
    return User.findAll({
        where: {
            email: req.params.email
        },
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(user => {
                console.log(req.body);
                if(!user){
                    return res.status(404).json({message: "user Not Found"})
                }
                return res.status(200).json(user)
            }
        )
        .catch(error => res.status(400).send(error));
}
exports.findOne = (req, res) => {
    return User.findAll({
        where: {
            id_user: req.params.id_user
        },
        attributes: { exclude: ["createdAt", "updatedAt"] }
    })
        .then(user => {
                if(!user){
                    return res.status(404).json({message: "user Not Found"})
                }
                return res.status(200).json(user)
            }
        )
        .catch(error => res.status(400).send(error));
}



// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    let updateValues = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };
    User.update(updateValues, {where: {id_user: req.params.id_user}}).then((result) => {
        console.log(req.body);
    });
};