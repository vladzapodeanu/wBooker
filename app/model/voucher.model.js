module.exports = (sequelize, Sequelize) => {

    const Voucher = sequelize.define('voucher', {
        code: {
            type: 'STRING',
            autoIncrement:true,
            primaryKey:true
        },
        value: {
            type: 'INTEGER'
        },
        type: {
            type: 'STRING'
        },
        from: {
            type: 'DATE'
        },
        to: {
            type: 'DATE'
        },
        enabled: {
            type: 'BIT'
        }
    });

    return Voucher;
}