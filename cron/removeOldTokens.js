const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJs.extend(utc);

const O_auth = require('../dataBase/O_auth');

module.exports = async () => {
    const previousMonth = dayJs.utc().subtract(1, 'month');

    await O_auth.deleteMany({
        createdAt: {$lt: previousMonth}
    });
};
