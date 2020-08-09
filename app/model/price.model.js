module.exports = (sequelize, Sequelize) => {

    const Price = sequelize.define('price', {
        id_price: {
            type: 'INTEGER',
            autoIncrement:true,
            primaryKey:true
        },
        id_company: {
            type: 'INTEGER'
        },
        id_cartype: {
            type: 'INTEGER'
        },
        id_user: {
            type: 'INTEGER'
        },
        distance_threshold: {
            type: 'INTEGER'
        },
        charge: {
            type: 'INTEGER'
        },
        type: {
            type: 'VARCHAR'
        },
        created_at: {
            type: 'DATE'
        },
        updated_at: {
            type: 'DATE'
        }},
        {
            freezeTableName: true
        });


    return Price;
}