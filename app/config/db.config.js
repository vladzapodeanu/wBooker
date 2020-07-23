module.exports = {
    database: 'insoftdev',
    username: 'root',
    password: 'efecon',
    host: 'localhost',
    port: '1234',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};