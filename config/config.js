module.exports = {
    MongoConnectUrl: process.env.MongoConnectUrl || 'mongodb://localhost:27017/MongooseDB',
    PORT: process.env.PORT || 5000,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'secret_word',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'secret_word_refresh'
};
