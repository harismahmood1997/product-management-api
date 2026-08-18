import mongoose  from "mongoose";

const connectDB = async() =>
{
    try
    {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Database ${connect.connection.name} Connected`)
    }
    catch(error)
    {
        console.error(`${error.message}`)
        process.exit(1);
    }
}
export default connectDB; 