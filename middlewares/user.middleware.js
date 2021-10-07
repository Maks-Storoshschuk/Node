const User = require('../dataBase/User');

module.exports = {
    createUserMiddleware: async (req,res,next)=>{
        try{
            const userByEmail = await User.findOne({email: req.body.email});
            if (userByEmail){
                throw new Error('Email alredi exists');
            }
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};

module.exports = {
    logInMiddleware: async (req,res,next)=>{
        try{
            const check = await User.findOne({email: req.body.email});

            if (check){
                throw new Error('Wrong email');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
