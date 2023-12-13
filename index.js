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
    set_weight: Number,
    set_repetition: Number
})

const ExerciseSchema = new mongoose.Schema({
    exercise_name: String,
    //muscle_group: String,
    set: [SetSchema]
})

const WorkoutSchema = new mongoose.Schema({
    //user: String,
    workout_type: String,
    workout_date: Date,
    duration: Number,
    exercise: [ExerciseSchema]
})

const WorkoutData = mongoose.model('Workouts', WorkoutSchema);

//initial erstellen
server.post("/workouts/add", (req, res) =>{
    //console.log(req.body);
    const {workout_type, workout_date, duration, exercise} = req.body;
    const {exercise_name, set} = exercise[0];
    //console.log(exercise[0]);
    const {set_weight, set_repetition} = set[0];
    //console.log(set[0]);
    WorkoutData.create({
        workout_type: workout_type,
        workout_date: workout_date,
        duration: "5",
        exercise: [{
            exercise_name: exercise_name,
            set: [{
                set_weight: set_weight,
                set_repetition: set_repetition
            }]
        }]
    })
    res.send("ok")
})

server.post("/workouts/update", async (req, res) => {
    //Require workout ID, exercise index, set index, setweight/setreps and value


    const filter = {_id: "656ef1d43d969dcc580783e7"};
    
    //Edit with indexes
    const exercise_index = 0
    const set_index = 0
    const testUpdate = String("exercise."+exercise_index+".set."+set_index+".set_weight")

    //const update = {$set: {"exercise.0.set.0.set_weight": 200}}
    const update = {$set: {[testUpdate]: 100}}
    const doc = await WorkoutData.findOneAndUpdate(filter, update);
    res.send(doc);
})


server.get("/workouts/all", async (req, res)=>{
    const workouts = await WorkoutData.find();
    console.log(workouts)
    res.send(workouts)
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