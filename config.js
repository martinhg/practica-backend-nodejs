const config = {
    dbUrl: process.env.DB_URL || 'mongodb+srv://db_user_practica:Gustavo96@cluster0.5diyu.mongodb.net/practica_db?retryWrites=true&w=majority',
    port: process.env.PORT || 3000,
    host: process.envHOST || 'http://localhost'
};

module.exports = config;
