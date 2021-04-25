const {Pool} = require('pg');
const pool = new Pool({
    user: 'user',
    host: 'host',
    database: 'database',
    password: 'password',
    port: 5432
});

pool.on('connect', client => {
    client.query('set search_path to weka')
});

module.exports = {
    query: (text, params) => {
        return pool.query(text, params)
    }
};
