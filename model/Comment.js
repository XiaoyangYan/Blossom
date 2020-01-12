const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
        {
                reviewer_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                        required: true,
                },
                rate: {
                        type:Number,
                        required: true,
                        trim: true,
                },
                comments: {
                        type:String,
                        required: true,
                        trim: true,
                }
        }, {timestamps: true},
)

const Comment = mongoose.model("Comment", commentSchema);
module.exports  = Comment; 