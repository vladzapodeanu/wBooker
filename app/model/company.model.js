module.exports = (sequelize, Sequelize) => {

    const Company = sequelize.define('company', {
        id_company: {
            type: 'INTEGER',
            autoIncrement:true,
            primaryKey:true
        },
        name: {
            type: 'VARCHAR'
        }},
        {
            freezeTableName: true
        });


    return Company;
}