const mongoose = require('mongoose');

console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/javascriptdb",{
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(db=>console.log('DB is connected')) //si todo va bien
    .catch(err =>console.error(err)); //si lanza un error