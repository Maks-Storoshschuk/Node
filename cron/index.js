const cron = require('node-cron');

const removeoldTokens = require('../cron/removeOldTokens');

module.exports = () => {
    cron.schedule('*/10 * * * * *', async () => {
        await removeoldTokens();
    });
};
