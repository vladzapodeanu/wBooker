module.exports = (sequelize, Sequelize) => {

    const CarType = sequelize.define('cartype', {
        id_cartype: {
            type: 'INTEGER',
            autoIncrement:true,
            primaryKey:true
        },
        id_company: {
            type: 'INTEGER',
            foreignKey: 'FK_cartype_company'
        },
        type: {
            type: 'STRING'
        },
        picture: {
            type: 'BLOB'
        },
        description: {
            type: 'TEXT'
        },
        capacity: {
            type: 'INTEGER'
        },
        created_at: {
            type: 'DATE'
        },
        updated_at: {
            type: 'DATE'
        }
    });

    return CarType;
}