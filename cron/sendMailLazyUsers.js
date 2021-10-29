const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const {constants} = require('../config');
const {emailService} = require('../services');
const fs = require('fs');
const path = require('path');

dayJs.extend(utc);

const {O_auth} = require('../dataBase');

module.exports = async () => {
    const tenDays = dayJs.utc().subtract(10, 'day');

    const lazyUsers = await O_auth
        .find({updatedAt: {$lt: tenDays}});

    lazyUsers.forEach(lazyUser => {
        const email = lazyUser.user_id.email;

        fs.readFile(path.join(__dirname,'mailSent.txt'),((err, data) => {

            if (err) {
                return;
            }

            const lazyUserArray = data.toString().split(',');

            if (!lazyUserArray.includes(email)) {
                fs.appendFile(path.join(__dirname,'mailSent.txt'),`${email},`,(error)=>{

                    if (error){
                        return;
                    }
                    sendMail(email);
                });
            }
        }));
    });
};

async function sendMail(email) {
    try {

        await emailService.sendMail(email, constants.hi, {userName: 'Мамина черешня'});

    } catch (e) {
        console.log(e);
    }
}
