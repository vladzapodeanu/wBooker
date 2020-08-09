module.exports = (sequelize, Sequelize) => {

    const Booking = sequelize.define('booking', {
        id_booking: {
            type: 'INTEGER',
            autoIncrement: true,
            primaryKey: true
        },
        id_company: {
            type: 'INTEGER'
        },
        id_user: {
            type: 'INTEGER'
        },
        id_driver: {
            type: 'INTEGER'
        },
        id_cartype: {
            type: 'INTEGER'
        },
        from_adress: {
            type: 'VARCHAR'
        },
        to_adress: {
            type: 'VARCHAR'
        },
        distance: {
            type: 'DOUBLE'
        },
        duration: {
            type: 'TIME'
        },
        price: {
            type: 'INTEGER'
        },
        payment_method: {
            type: 'VARCHAR'
        },
        created_at: {
            type: 'TIME'
        },
        updated_at: {
            type: 'TIME'
        },
        status: {
            type: 'VARCHAR'
        },
        driver_on_the_way: {
            type: 'VARCHAR'
        },
        driver_at_pickup: {
            type: 'VARCHAR'
        },
        // passenger_on_bord: {
        //     type: 'INTEGER'
        // },
        done: {
            type: 'BIT'
        }},
        {
            freezeTableName: true
        });

    return Booking;
}