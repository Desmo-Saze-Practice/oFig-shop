const client = require('./database');

const dataMapper = {
    getAllItems: (callback) =>{
        client.query(`SELECT figurine.id as itemid, 
        figurine.name, 
        figurine.description, 
        figurine.size, 
        figurine.price, 
        figurine.category 
        FROM figurine`, (error, result) => {
            if (error) {
                throw error;
            }
            callback(error, result);
        });
    },
    getOneItem: (id, callback) => {
        id = Number(id);
        client.query(`SELECT figurine.id as itemid, 
        figurine.name, 
        figurine.description, 
        figurine.size, 
        figurine.price, 
        figurine.category 
        FROM figurine
        WHERE figurine.id=$1`, [id], (error, result) => {
            if (error) {
                console.log(error);
            }
            const data = result.rows[0];
            console.log('from datamapper ', result.rows[0]);
            callback(error, data);
        })
    },

    getOneItemReview: (id, callback) => {
        id = Number(id);
        client.query(`SELECT
        figurine.id as itemid, 
        figurine.name, 
        figurine.description, 
        figurine.size, 
        figurine.price, 
        figurine.category,
		review.author,
		review.note,
		review.title,
		review.message	 
        FROM figurine --ALIAS
        JOIN review ON review.figurine_id = figurine.id
        WHERE figurine.id=$1`, [id], (error, result) => {
            if (error) {
                console.log(error);
            }
            console.log('my fuckin data are : ', result.rows[0]);
            const data = result.rows[0];
            
            data.reviews = [];

            // on boucle pour remplir le tableau avec les données vouluent
            for (const row of result.rows) {
                data.reviews.push({
                    author: row.author,
                    note: row.note,
                    title: row.title,
                    message: row.message
                })
            }
            // on nettoie les données obtenu
            delete result.author;
            delete result.note;
            delete result.title;
            delete result.message;
console.log('my fuckin reviews are : ', data.reviews);
            callback(error, data);
        })
    }
}

module.exports = dataMapper;