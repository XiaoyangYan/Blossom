const dotenv = require("dotenv");
const envFound = dotenv.config();

module.exports = {
        port: process.env.PORT || 8081,
        api: '/season',
}