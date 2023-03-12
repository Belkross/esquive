import mongoose from "mongoose"

const databaseName = process.env.APP_NAME || "esquive"

const databaseAddress = process.env.DATABASE_ADDRESS || `mongodb://0.0.0.0:27017/${databaseName}`

export function connectToDatabase(): void {
  mongoose.set("strictQuery", true)
  mongoose
    .connect(databaseAddress)
    .then(() => console.log(`connnected to database : ${databaseName}`))
    .catch((error) => console.log(`error with connection to database : ${databaseName}`, error))
}

//Before Node get updated to version 19, the valid string for the local database address was Node `mongodb://localhost:27017/${databaseName}`
//Now you have to replace "localhost" with "0.0.0.0" to get things work
