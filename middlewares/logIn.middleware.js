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
