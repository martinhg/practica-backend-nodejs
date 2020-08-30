const db = require('mongoose');

db.Promise = global.Promise;

async function connect(url) {
    await db.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'practica_db'
    })
        .then( () => console.log('[db] Conectada con exito'))
        .catch( error => console.log('[db]', error)
    );
}

module.exports = connect;
