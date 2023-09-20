import mongoose from 'mongoose';

const URL = "mongodb://mongo-db:27018";
// const URL = "mongodb://localhost:27017";
const connectToDB = () =>
    mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to Database!'));

export default connectToDB;