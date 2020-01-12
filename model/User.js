const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
        {
                name: {
                        firstName: { type: String, default: "", trim: true },
                        lastName: { type: String, default: "", trim: true },
                },
                email: {
                        type: String,
                        unique: true,
                        required: true,
                        trim: true,
                        validate(value) {
                                if (!validator.isEmail(value)) {
                                        throw new Error('Email is invalid');
                                }
                        }
                },
                password: {
                        type: String,
                        required: true,
                        minlength: 7,
                        trim: true,
                        validate(value) {
                                if (value.toLowerCase().includes('password')) {
                                        throw new Error('Password cannot contain password');
                                }
                        }
                },
                birthday: {
                        date: { type: String, default: "" },
                        month: { type: String, default: "" },
                        year: { type: String, default: "" },
                },
                address: {
                        suburb: { type: String, default: "" },
                        state: { type: String, default: "" },
                        country: { type: String, default: "" }
                },
                userImage: {
                        type: String,
                        default: ""
                },
                rating: {
                        type: Number,
                        default: 0
                },
                totalPeople: {
                        type: Number,
                        default: 0
                },
                totalRating: {
                        type: Number,
                        default: 0
                },
                tags: [
                        {
                                type: String,
                                trim: true,
                        }
                ],
                about:{
                        tagLine:{type:String,default:""},
                        description:{type:String,default:""},
                },
                FaceBook: {
                        fbEmail:{type:String, default:"", trim:true},
                        FaceBookID: { type: String, default: "" },
                        accessToken: { type: String, default: "" }
                },
                Google: {
                        gEmail:{type:String, default:"",  trim:true},
                        GoogleID: { type: String, default: "" },
                        accessToken: { type: String, default: "" }
                },
                phoneNumber: { type: String, default: "" },
                tokens: [{
                        token: {
                            type: String,
                            required: true,
                        }
                }]
        }, {timestamps: true},
);
userSchema.methods.toJSON = function () {

        const user = this;
        const userObject = user.toObject();
    
        delete userObject.password;
        delete userObject.tokens;
    
        return userObject;
    };
userSchema.methods.calculateRating = async function (rate) {
        const user = this;
        user.totalRating  += parseInt(rate);
        user.totalPeople += 1;
        user.rating = user.totalRating/user.totalPeople;
        return user;
}

userSchema.virtual('fullName').get(function () {
        return this.name.firstName + ' ' + this.name.lastName;
});

userSchema.pre('save', async function(next){
        const user = this;
        if (user.isModified("password")){
                user.password = await bcrypt.hash(user.password, 8);
        }
        next();
});

userSchema.methods.generateAuthToken = async function (){
        const user = this;
        const token = jwt.sign({_id: user._id.toString()}, "thisismyfavouriteblog", {expiresIn: '1h'});
        user.tokens = user.tokens.concat({token});
        await user.save();
        return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
        const user = await User.findOne({email});
        if (user == null){
                throw new Error("401");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
                throw new Error("401");
        }
        return user;
}

const User = mongoose.model("User", userSchema);
module.exports = User;