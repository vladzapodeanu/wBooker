module.exports = (sequelize, Sequelize) => {

    const Price = sequelize.define('price', {
        id_price: {
            type: 'INTEGER',
            autoIncrement:true,
            primaryKey:true
        },
        id_company: {
            type: 'INTEGER',
            foreignKey: 'FK_price_company'
        },
        id_cartype: {
            type: 'INTEGER',
            foreignKey: 'FK_price_cartype'
        },
        id_user: {
            type: 'INTEGER',
            foreignKey: 'FK_price_user'
        },
        distance_threshold: {
            type: 'INTEGER'
        },
        charge: {
            type: 'INTEGER'
        },
        type: {
            type: 'STRING'
        },
        created_at: {
            type: 'DATE'
        },
        updated_at: {
            type: 'DATE'
        }
    });

    return Price;
}