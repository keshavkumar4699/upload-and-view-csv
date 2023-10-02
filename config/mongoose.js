//require library
const mongoose = require('mongoose');

//connect to database
async function main() {
    const db = await mongoose.connect(`mongodb://127.0.0.1:27017/csv-upload`);
    module.exports = db;
}

main()
.then(() => console.log('database connected')) //if connected
.catch(err => console.log(err)); //if error