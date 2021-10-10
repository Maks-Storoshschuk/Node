module.exports = {
    auth: (req, res) => {
        res.json(req.user);
    }
};
