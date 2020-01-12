const User  = require("../model/User");


exports.index = async (req, res) => {
        try {
                const users = await User.find({});
                res.send(users);
        } catch(e) {
                res.status(500).send("error");
        }
}
exports.signIn = async (req, res) => {
        try {
                const user = await User.findByCredentials(req.body.email, req.body.password);
                const token = await user.generateAuthToken();
                res.send({user, token});
        } catch(e) {
                console.log(e);
                res.status(e.toString().split(": ")[1]).send(e.toString());
        }
}

exports.signUp = async(req, res) => {
        try{
            var postData = {
                email: req.body.email,
                password: req.body.password
            };
            User.findOne({email: postData.email}, function(err, data){
                if (data){
                    res.status(302).send('the email is already taken.');
                } else {
                        User.create(postData, function(err, data) {
                                if (err) {console.log(err);res.status(500).send(err.message.message);}
                                res.status(201).send(data);
                            })
                }
            })
        } catch(e) {
            res.status(400).send(e);
        }
}

 exports.indexMe = async (req, res) => {
        const id = req.params.id;
        const user = await User.findOne({_id: id}, function(err,data){
                if (err) {console.log(err);res.status(500).send('server has exceptions');}
                if (data == null){
                res.status(400).send("error");
                } else {
                res.status(200).send(data);
                }
        }).exec();
}

exports.indexDefault = async (req, res) => {
        const email = req.params.email;
        const user = await User.findOne({email: email}, function(err,data){
                if (err) {console.log(err);res.status(500).send('server has exceptions');}
                if (data == null){
                res.status(400).send("error");
                } else {
                res.status(200).send(data);
                }
        }).exec();
}

exports.update = async (req, res) => {
        const id = req.param.id;
        await User.findByIdAndUpdate({_id: id}, {$set: req.body}, function(err, data) {
                if (err) res.status(500).send("sever has exceptions");
        }).exec();
        const user = await User.findById({_id: id}, function(err, data) {
                if (err){res.status(500).send("server has exceptions");}
        })
        const token = await user.generateAuthToken();
        res.send({user, token});
}