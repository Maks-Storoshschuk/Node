const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const fs = require('fs');
const path = require('path');

const {constants} = require('../config');
const {O_auth} = require('../dataBase');
const {emailService} = require('../services');

dayJs.extend(utc);

module.exports = async () => {
    const tenDays = dayJs.utc().subtract(10, 'day');

    const lazyUsers = await O_auth
        .find({updatedAt: {$lt: tenDays}});

    const emailArray = [];

    lazyUsers.forEach(lazyUser => {
        const email = lazyUser.user_id.email;

        emailArray.push(email);
    });

    const setEmail = new Set(emailArray);

    setEmail.forEach(email => {
        fs.readFile(path.join(__dirname, 'mailSent.txt'), ((err, data) => {

            if (err) {
                return;
            }

            const lazyUserArray = data.toString().split(',');

            if (!lazyUserArray.includes(email)) {
                fs.appendFile(path.join(__dirname, 'mailSent.txt'), `${email},`, (error) => {

                    if (error) {
                        return (error);
                    }
                    sendMail(email);
                    Promise.allSettled(email);
                });
            }
        }));
    });
};

async function sendMail(email) {
    try {
        await emailService.sendMail(email, constants.hi, {userName: 'Мамина черешня'});
    } catch (e) {
        return(e);
    }
}
