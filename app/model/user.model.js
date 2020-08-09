module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define("user", {
        id_user: {
            type: 'INTEGER',
            autoIncrement: true,
            primaryKey: true
        },
        id_company: {
            type: 'INTEGER'
        },
        user_type: {
            type: 'VARCHAR',
            allowNull: false
        },
        role: {
            type: 'VARCHAR',
            allowNull: false
        },
        password: {
            type: 'VARCHAR',
            allowNull: false
        },
        type: {
            type: 'VARCHAR',
            allowNull: false
        },
        id_account: {
            type: 'INTEGER'
        },
        name: {
            type: 'VARCHAR',
            allowNull: false
        },
        adress: {
            type: 'VARCHAR',
            allowNull: false
        },
        email: {
            type: 'STRING',
            allowNull: false
        },
        phone_number: {
            type: 'VARCHAR',
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

    return User;
}