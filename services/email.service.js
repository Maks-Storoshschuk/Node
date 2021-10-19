const nodemailer = require('nodemailer');

const {NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD} = require('../config/config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NO_REPLY_EMAIL,
        pass: NO_REPLY_EMAIL_PASSWORD
    }
});

// eslint-disable-next-line require-await
const sendMail = async (userMail) => transporter.sendMail({
    from: 'Na reply',
    to: userMail,
    subject: 'Hello World',
    html: 'HELLO WORLD!!!'
});

module.exports = {
    sendMail
};
