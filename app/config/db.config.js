module.exports = {
    database: 'webbooker',
    username: 'root',
    password: 'root',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
        timezone: 'Etc/GMT0',
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
// mysql -u insoftdev_root -p insoftdev -h db4free.net -P 3306 -D insoftdev