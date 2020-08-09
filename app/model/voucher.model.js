module.exports = (sequelize, Sequelize) => {

    const Voucher = sequelize.define('voucher', {
        code: {
            type: 'VARCHAR',
            autoIncrement:true,
            primaryKey:true
        },
        value: {
            type: 'INTEGER'
        },
        type: {
            type: 'VARCHAR'
        },
        from: {
            type: 'DATE'
        },
        to: {
            type: 'DATE'
        },
        enabled: {
            type: 'BIT'
        }},
        {
            freezeTableName: true
        });

    return Voucher;
}