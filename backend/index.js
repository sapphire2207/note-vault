import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
})
import connectToDB from './db/dbConnect.js'
import app from './app.js'


connectToDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is listening on: ${process.env.PORT}`);
    })
})
.catch((error) => console.log("MONGODB connection failed!!!: ", error))