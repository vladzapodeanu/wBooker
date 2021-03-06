const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const app = express();



var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../app')));

const db = require("../app/model/index.js");

db.sequelize.sync();

// drop the table if it already exists
//  db.sequelize.sync({ force: true })
//      .then(() => {
//         console.log("Drop and re-sync db.");
//       })
//      .catch(error => {
//          console.log(error);
//      });

//simple route
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to booker application." });
// });


app.get('/', function(req, res) {
    res.sendFile(path.resolve('app/index.html'));
});

app.get('/login', function(req, res) {
    res.sendFile(path.resolve('app/templates/login.html'));
});

app.get('/booking', function(req, res) {
    res.sendFile(path.resolve('app/templates/booking.html'));
});

app.get('/profile', function(req, res) {
    res.sendFile(path.resolve('app/templates/profile.html'));
});

app.get('/my-booking', function(req, res) {
    res.sendFile(path.resolve('app/templates/mybooking.html'));
});

require("../app/route/account.route")(app);
require("../app/route/booking.route")(app);
require("../app/route/cartype.route")(app);

require("../app/route/company.route")(app);
require("../app/route/driverstatus.route")(app);
require("../app/route/log.route")(app);

require("../app/route/price.route")(app);
require("../app/route/user.route")(app);
require("../app/route/voucher.route")(app);



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


/*
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const events = require('./eventsController');
const app = express();
const rootPath = path.normalize(__dirname + '/../');
const mariadb=require('mariadb');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static( rootPath + '/app'));

app.get('/data/event/:id', events.get);
app.get('/data/event', events.getAll);
app.post('/data/event/:id', events.save);
app.get('*', function(req, res) { res.sendFile(rootPath + '/app/index.html'); });




const pool = mariadb.createPool({
    host: 'localhost',
    user:'root',
    password: 'efecon',
    database: 'insoftdev',
    port: 1234
});
pool.getConnection()
    .then(conn => {

                       conn.query("SELECT 1 as val")
                           .then((rows) => {
                               console.log(rows); //[ {val: 1}, meta: ... ]
                               //Table must have been created before
                               // " CREATE TABLE myTable (id int, val varchar(255)) "
                               return conn.query("INSERT INTO log   value (2, 2, 1)", [1, 1, 'mariadb']);
                           })
                           .then((res) => {
                               console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
                               conn.end();
                           })
                           .catch(err => {
                               //handle error
                               console.log(err);
                               conn.end();
                           })

        console.log('Database works!')

    }).catch(err => {
    console.log('Connection failed')
});


app.listen(3000, () => {
    console.log(`Server it s started on port 3000`);
});

*/
