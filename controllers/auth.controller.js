const userUtil = require('../util/user.util');

module.exports = {
    auth: (req, res) => {
        const user = userUtil.userNormalize(req.user);

        res.json(user);
    }
};
