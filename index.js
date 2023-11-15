const express = require("express")
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const server = express();
const app = express()
const mongoose = require('mongoose')



const staticPath = path.join(__dirname, 'build/client')

const ProductSchema = new mongoose.Schema({
    Gericht: String,
    //producer: String,
    calories: Number,
    /*fat: Number,
    carbohydrates: Number,
    protein: Number*/
});

const ProductData = mongoose.model('Gerichte', ProductSchema);

// connecto to mongoDB
mongoose.connect("mongodb://localhost:27017/Food");


server.use(express.static(staticPath))
server.use(express.json())
server.use(cors())
server.use(bodyParser.urlencoded({ extended: true }))


server.get("/test",handleGet)


server.post("/gerichte/add", (req, res) =>{
    const { Gericht, calories } = req.body;
    ProductData.create({
        Gericht: Gericht,
        //producer: producer,
        calories: calories
        /*fat: fat,
        carbohydrates: carbohydrates,
        protein: protein*/
    })
    res.send("ok")
})

server.get("/gerichte/all", async (req, res)=>{
    const gerichte = await ProductData.find();
    console.log(gerichte)
     res.send(gerichte)
})

function handleGet(req, res){
    console.log("Hier bin ich")
    res.send({"message": "received"})
}

server.get('/*', (req , res) => {
    console.log(__dirname)
    const indexPath = path.resolve(__dirname, './build/client', 'index.html')  
    res.sendFile(indexPath)
})

server.listen(10000, () => { console.log("Server listening")})