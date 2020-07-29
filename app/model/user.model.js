module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define("user", {
        id_user: {
            type: 'INTEGER',
            autoIncrement: true,
            primaryKey: true
        },
        id_company: {
            type: 'INTEGER',
            foreignKey: 'FK_user_company'
        },
        user_type: {
            type: 'STRING',
            allowNull: false
        },
        role: {
            type: 'STRING',
            allowNull: false
        },
        password: {
            type: 'STRING',
            allowNull: false
        },
        type_: {
            type: 'STRING',
            allowNull: false
        },
        id_account: {
            type: 'INTEGER',
            foreignKey: 'FK_user_account'
        },
        name: {
            type: 'STRING',
            allowNull: false
        },
        address: {
            type: 'STRING',
            allowNull: false
        },
        email: {
            type: 'STRING',
            allowNull: false
        },
        phone_number: {
            type: 'STRING',
            validate: {
                min: 10,
                max: 11
            }
        },
        created_at: {
            type: 'DATE'
        },
        updated_at: {
            type: 'DATE'
        }
    });

    return User;
}