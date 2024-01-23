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

server.post("/workouts/deleteExercise", async (req, res) => {
    //Require: workout_id, exercise index (ind), set_id (mit pop)
    const {workout_id, exercise_index, exercise_id} = req.body
    const filter = {"_id": workout_id}
    console.log("Delete in BE")
    console.log(req.body)
    const testUpdate = String("exercise")

    //console.log(WorkoutData.find(filter))

    WorkoutData.updateOne(filter, {$pull: {[testUpdate]: {"_id": exercise_id}}}).then((error, data) => {
       res.send("deleted")
       console.log("Exercise Deletion success") 
       //if error -> send error UND if data -> ...
    })
    //console.log(WorkoutData.find(filter))

})

server.post("/workouts/deleteSet", async (req, res) => {
    //Require: workout_id, exercise index (ind), set_id (mit pop)
    const {workout_id, exercise_index, set_id} = req.body
    const filter = {"_id": workout_id}
    console.log("Delete in BE")
    console.log(req.body)
    const testUpdate = String("exercise."+exercise_index+".set")

    //console.log(WorkoutData.find(filter))

    WorkoutData.updateOne(filter, {$pull: {[testUpdate]: {"_id": set_id}}}).then((error, data) => {
       res.send("deleted")
       console.log("Deletion success") 
       //if error -> send error UND if data -> ...
    })
    //console.log(WorkoutData.find(filter))

})

server.post("/workouts/update", async (req, res) => {
    //Require workout ID, exercise index, set index, setweight/setreps and value
    console.log(req.body)
    console.log("Hallo BE")
    
    const {workout_id, exercise_name, _id, exercise_index, my_set_weight, my_set_repetition, my_set_id} = req.body
    const filter = {"_id": workout_id}; // <- gives full Workout Document
    var obj = {};


    if(_id == undefined){
        var update_exercise_id = String("exercise."+exercise_index+"._id")
        var new_exercise_id = new mongoose.Types.ObjectId()
        Object.assign(obj, {[update_exercise_id]: new_exercise_id})
    }
    
    const testUpdate = String("exercise."+exercise_index+".exercise_name")
    Object.assign(obj, {[testUpdate]: exercise_name})
    
    while (my_set_id.length != my_set_repetition.length){
        my_set_id.push(new mongoose.Types.ObjectId())
    }

    for (let i = 0, len = my_set_repetition.length; i < len; i++){
        var update_reps = String("exercise."+exercise_index+".set."+i+".set_repetition")
        Object.assign(obj, {[update_reps]: my_set_repetition[i]})
        
    }

    for (let i = 0, len = my_set_weight.length; i < len; i++){
        var update_weight = String("exercise."+exercise_index+".set."+i+".set_weight")
        Object.assign(obj, {[update_weight]: my_set_weight[i]})
        
    }
    for (let i = 0, len = my_set_id.length; i < len; i++){
        var update_set_id = String("exercise."+exercise_index+".set."+i+"._id")
        Object.assign(obj, {[update_set_id]: my_set_id[i]})
        
    }
    console.log(obj)
    const update = {$set: obj}
    await WorkoutData.findOneAndUpdate(filter, update);
})


server.get("/workouts/all", async (req, res)=>{
    const workouts = await WorkoutData.find();
    //console.log(workouts)
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