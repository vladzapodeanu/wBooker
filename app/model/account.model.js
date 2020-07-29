module.exports = (sequelize, Sequelize) => {

    const Account = sequelize.define('account', {
        id_account: {
            type: 'INTEGER',
            autoIncrement:true,
            primaryKey:true
        },
        id_company: {
            type: 'INTEGER',
            foreignKey:'FK_account_company'
        },
        name: {
            type: 'STRING'
        },
        type: {
            type: 'STRING'
        }
    });

    return Account;
}