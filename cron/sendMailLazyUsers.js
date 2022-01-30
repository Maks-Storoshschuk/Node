const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const {constants} = require('../config');
const {O_auth} = require('../dataBase');
const {emailService} = require('../services');

dayJs.extend(utc);

module.exports = async () => {
    const tenDays = dayJs.utc().subtract(10, 'day');

    const lazyUsers = await O_auth.find({updatedAt: {$lt: tenDays}});

    const uniqUsersWithTokens = new Set(lazyUsers.map(item => item.user_id.email));

    await Promise.allSettled(uniqUsersWithTokens.map(async ({ user_id }) => {
        await emailService.sendMail(user_id.email, constants.hi, {userName: 'Мамина черешня'});
    }));
};
