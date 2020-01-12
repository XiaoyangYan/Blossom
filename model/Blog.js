const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
        {
                title: {
                        type:String,
                        required: true,
                        trim: true,
                        default:"",
                },
                content: {
                        type: String,
                        required: true,
                        trim: true,
                        default:"",
                },
                tags: [
                        {
                        type: String,
                        trim: true,
                        }
                ],
                user_id :{
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User',
                        required: true,
                },
                comments: [{
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Comment",
                        required: true,
                }],
                status:{type:String, default:"", trim:true}
        }, {timestamps: true},
);

blogSchema.methods.addComments = function (comment) {
        this.comments.push(comment);
        this.save();
}

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;