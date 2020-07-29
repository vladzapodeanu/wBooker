module.exports = (sequelize, Sequelize) => {

    const DriverStatus = sequelize.define('driverstatus', {
        id_user: {
            type: 'INTEGER',
            autoIncrement:true,
            primaryKey:true
        },
        online: {
            type: 'BIT'
        },
        status: {
            type: 'STRING'
        },
        lat: {
            type: 'FLOAT'
        },
        longit: {
            type: 'FLOAT'
        }
    });

    return DriverStatus;
}