const jwt = require("jsonwebtoken");
const User = require("../model/User");

const isAuth = async (req, res) => {
        try {
                const token = req.query.token;
                const decoded = jwt.verify(token, "thisismyfavouriteblog");
                const user = await User.findOne({_id: decoded._id, "tokens.token":token});
                if (!user){
                        res.status(500).send({error: "No this user"});
                }
                req.user = user;
                res.status(200).send(user);
        } catch(err) {
                res.status(401).send({error:"Please authenticate"});
        }
};
module.exports = isAuth;