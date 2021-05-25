import express from "express";
import userRoutes from './routes/userRoutes.js';
import mdocumentRoutes from './routes/mdocumentRoutes.js'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors'
import path from "path"
dotenv.config()

const app = express();

const __dirname = path.resolve();

app.use(cors())


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));



mongoose.connect('mongodb+srv://hima_database:Hima1hima2@cluster0.lqa1w.mongodb.net/newarkpolice?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("mongodb connected!!!!"))
.catch(err => console.log(err))

app.use(express.static(path.join(__dirname, "./client")))

app.use("/", userRoutes)
app.use("/", mdocumentRoutes)

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client", "index.html"))
})


const port = process.env.PORT || 5000 


app.listen(port, () => console.log(`server is running on port ${port}!!!`))


