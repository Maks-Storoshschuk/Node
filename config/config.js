module.exports = {
    MongoConnectUrl: process.env.MongoConnectUrl || 'mongodb://localhost:27017/MongooseDB',
    PORT: process.env.PORT || 5000,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'secret_word',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'secret_word_refresh',
    JWT_ACTION_SECRET: process.env.JWT_REFRESH_SECRET || 'shit_in_your_ass',
    JWT_ACTION_FORGOT_SECRET: process.env.JWT_REFRESH_SECRET || 'nice_weather',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD
};
