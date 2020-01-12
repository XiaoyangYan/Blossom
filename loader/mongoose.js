const mongoose = require("mongoose");
const {MongoClient} = require("mongodb");

module.exports = async function(){
        mongoose.Promise = global.Promise;
        console.log(`DB connected... ${process.env.MONGODB_URL}`)
        const connection = await mongoose.connect(process.env.MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
        }).catch((e => console.log("DB error", e)));
        return connection;
}