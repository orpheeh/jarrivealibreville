const mongoose = require('mongoose');

module.exports = async function () {
    try {
        const result = await mongoose.connect('mongodb://localhost:27017/jarrivealibreville',
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
