const mongoose = require('mongoose');

const mongoDB = process.env.MONGOADDR || "localhost";

module.exports = async function () {
    try {
        const result = await mongoose.connect('mongodb://'+ mongoDB +':27017/jarrivealibreville',
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });
        console.log("MongoDB OK!");
    } catch (err) {
        console.log(err);
    }
}
