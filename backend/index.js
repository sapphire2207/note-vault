import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
})

console.log("Mongo URI exists:", !!process.env.MONGODB_URI);
console.log("Mongo URI value:", process.env.MONGODB_URI ? "FOUND" : "MISSING");

import connectToDB from './db/dbConnect.js'
import app from './app.js'


connectToDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is listening on: ${process.env.PORT}`);
    })
})
.catch((error) => console.log("MONGODB connection failed!!!: ", error))
