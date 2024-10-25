import mongoose from 'mongoose'

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.error("Error connecting MongoDB")
        process.exit(1) // exit code 1 means error, 0 means success 

    }
}

export default connectDB