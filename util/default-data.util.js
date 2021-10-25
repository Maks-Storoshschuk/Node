const User = require('../dataBase/User');
const {ADMIN} = require('../config/constans');

module.exports = async () =>{
    const user = await User.findOne({role: ADMIN});

    if(!user){
        await User.createUserWithHashPassword({
            name: 'Maks',
            email: 'bigdick@gmail.com',
            password:'superPassword7',
            role: ADMIN
        });
    }
};
