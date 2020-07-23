module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorial", {
        id_user: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_company: {
            type: Sequelize.INTEGER,
            foreignKey: 'FK_user_company'
        },
        user_type: {
            type: Sequelize.STRING('driver','webclient', 'backoffice'),
            allowNull: false
        },
        role: {
            type: Sequelize.STRING('admin', 'standard', 'manager'),
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type_: {
            type: Sequelize.STRING('business', 'personal'),
            allowNull: false
        },
        id_account: {
            type: Sequelize.STRING,
            foreignKey: 'FK_user_account'
        },

        name: {
            type: Sequelize.STRING,
            allowNull: false // name MUST have a value
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone_number: {
            type: Sequelize.STRING,
            validate: {
                min: 10,
                max: 11
            }
        },
        created_at: {
            type: Sequelize.DATE
        },
        updated_at: {
            type: Sequelize.DATE
        }
    });

    return Tutorial;
};