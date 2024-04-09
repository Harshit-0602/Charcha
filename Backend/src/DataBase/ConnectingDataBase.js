import mongoose from "mongoose";

const connectdb = async () => {
    await mongoose.connect(`${process.env.mongo}/Charcha`)
    .then(() => {
        console.log("Database Connection Successfull !!!!");
    })
        .catch((err) => {
            console.log("Error Occurred while connecting to database !!!");
    })
};

export { connectdb };
