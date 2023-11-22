const express = require("express")
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const server = express();
const mongoose = require('mongoose')

// connecto to mongoDB
mongoose.connect("mongodb://localhost:27017/Food");

const staticPath = path.join(__dirname, 'build/client')

//Ingredient DB
const ProductSchema = new mongoose.Schema({
    Gericht: String,
    //producer: String,
    calories: Number,
    /*fat: Number,
    carbohydrates: Number,
    protein: Number*/
});

const ProductData = mongoose.model('Gerichte', ProductSchema);




server.use(express.static(staticPath))
server.use(express.json())
server.use(cors())
server.use(bodyParser.urlencoded({ extended: true }))



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


//Exercise DB
const SetSchema = new mongoose.Schema({
    set_number: Number,
    set_weight: Number,
    set_repetition: Number
})

const ExerciseSchema = new mongoose.Schema({
    exercise_name: String,
    exercise_date: Date,
    set_number: Number,
    set_weight: Number,
    set_repetition: Number
})

const SetData = mongoose.model('Sets', SetSchema);
const ExerciseData = mongoose.model('Exercises', ExerciseSchema);


server.post("/exercises/add", (req, res) =>{
    const {exercise_name, exercise_date, set_number, set_weight, set_repetition} = req.body;
    ExerciseData.create({
        exercise_name: exercise_name,
        exercise_date: exercise_date,

            set_number: set_number,
            set_weight: set_weight,
            set_repetition: set_repetition
    
    })
    res.send("ok")
})

server.get("/exercises/all", async (req, res)=>{
    const exercises = await ExerciseData.find();
    console.log(exercises)
    res.send(exercises)
})

// Server Functions

server.get("/test",handleGet)

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