const cron = require('node-cron');

const removeoldTokens = require('../cron/removeOldTokens');
const sendMailLazyUsers = require('./sendMailLazyUsers');

module.exports = () => {
    cron.schedule('*/3 * * * * *', async () => {
        await removeoldTokens();
        await sendMailLazyUsers();
    });
};
