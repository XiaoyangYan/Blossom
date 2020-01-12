const status = require("http-status");
const Blog = require("../model/Blog");

exports.indexMe = async (req, res) => {
        const userId = req.params.id;
        const blog = await Blog.find({user_id: userId}, function(err,data){
                if (err) res.status(500).send("error");
                data = data.filter(function(content){
                        return content.status !== "delete";
                })
                res.status(200).send(data);
        })
}

exports.findAll = async (req, res) => {
        try {
                const allBlogs = await Blog.find({});
                res.send(allBlogs);
        } catch(e) {
                res.status(500).send("error");
        }
}

exports.index = async (req, res) => {
        const userId = req.params.id;
        const blog = Blog.find({user_id: userId}, function(err, data) {
                if (err) return res.status(500).send("error");
                res.status(200).send(data);
        })
}

exports.update = async (req, res) => {
        const {id} = req.params;
        try {
                 const blog = await Blog.findByIdAndUpdate({_id:id}, req.body, {new:true});
                res.status(200).send(blog);
        } catch(err) {
                console.log(err);
                res.status(400).send("error");
        }
}

exports.tempDelete = async (req, res) => {
        const {id} = req.params;
        try {
                const blog = await Blog.findByIdAndUpdate({_id: id}, {status: "delete"}, {new:true});
                res.status(200).send(blog)
        } catch(err) {
                console.log(err);
                res.status(400).send("error");
        }
}

exports.delete = async (req, res) => {
        Blog.findByIdAndRemove(ObjectId(req.params.id), function(err){
                if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(status.NO_CONTENT).json({});
                    }
        })
        res.status(status.NO_CONTENT).json({});
}

exports.create = async (req, res) => {
        const blog = new Blog(req.body);
        blog.status = "open";
        try {
                Blog.create(blog, function(err, data) {
                        if (err) {
                                console.log(err);
                                res.status(500).send(err.message.message);
                        }
                        res.status(201).send(data);
                })
        } catch(e){
                res.status(400).send(e);
        }
}
