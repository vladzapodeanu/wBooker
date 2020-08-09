module.exports = (sequelize, Sequelize) => {

    const Account = sequelize.define('account', {
        id_account: {
            type: 'INTEGER',
            autoIncrement:true,
            primaryKey:true
        },
        id_company: {
            type: 'INTEGER'
        },
        name: {
            type: 'VARCHAR'
        },
        type: {
            type: 'VARCHAR'
        }},
        {
            freezeTableName: true
        });


    return Account;
}