const client = require('./database');

const dataMapper = {
    getAllItems: (callback) =>{
        client.query(`SELECT * FROM "figurine"`, (error, result) => {
            if (error) {
                throw error;
            }
            callback(error, result);
        });
    },
    getOneItem: (id, callback) => {
        id = Number(id);
        client.query(`SELECT * FROM "figurine" WHERE "id"=$1`, [id], (error, result) => {
            if (error) {
                console.log(error);;
            }
            const data = result.rows[0];
            callback(error, data);
        })
    }
}

module.exports = dataMapper;