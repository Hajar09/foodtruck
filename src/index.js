import express from "express"
import mongoose from "mongoose"
const app = express()
const { SERVER_PORT, DBurl } = process.env
import "dotenv/config"
import volleyball from "volleyball"
import { truckRouter } from "./routes/trucks"




mongoose.connect(DBurl)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connexion error:'))
db.once('open', () => {
    console.log(`[MongoDB] connected`)
})


app.use(express.json())
app.use(volleyball)
app.use(express.urlencoded({extended:false}))


app.use('/food-truck', truckRouter)
app.use('/', (req, res) => {
    res.send("j'ai faim !")
})



app.listen(SERVER_PORT, () => {
    console.log(`[APP working on port : ${SERVER_PORT}]`)
})

