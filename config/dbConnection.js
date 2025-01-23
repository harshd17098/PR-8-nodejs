const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect("mongodb+srv://harshdesai600:harsh9153%40%23@cluster0.vi4yr.mongodb.net/BookStore-With-Admin")
        .then(() => console.log('DB Connected!!'))
        .catch((err) => console.log(err));
}

module.exports = dbConnect();