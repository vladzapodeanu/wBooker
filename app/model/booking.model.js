module.exports = (sequelize, Sequelize) => {

    const Booking = sequelize.define('booking', {
        id_booking: {
            type: 'INTEGER',
            autoIncrement: true,
            primaryKey: true
        },
        id_company: {
            type: 'INTEGER',
            foreignKey: 'FK_booking_company'
        },
        id_user: {
            type: 'INTEGER',
            foreignKey: 'FK_booking_user'
        },
        id_driver: {
            type: 'INTEGER'
        },
        id_cartype: {
            type: 'INTEGER'
        },
        from_address: {
            type: 'STRING'
        },
        to_address: {
            type: 'STRING'
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
            type: 'STRING'
        },
        created_at: {
            type: 'TIME'
        },
        updated_at: {
            type: 'TIME'
        },
        status: {
            type: 'STRING'
        },
        driver_on_the_way: {
            type: 'STRING'
        },
        driver_at_pickup: {
            type: 'STRING'
        },
        passenger_on_bord: {
            type: 'INTEGER'
        },
        done: {
            type: 'BIT'
        }
    });

    return Booking;
}