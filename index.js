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
server.post("/workouts/add", async (req, res) =>{
    console.log(req.body);
    var _id = new mongoose.Types.ObjectId();
    var workout_date = new Date().toJSON()
    WorkoutData.create({
        workout_type: "Neues Workout",
        _id: _id,
        workout_date: workout_date
    })

    let data = {}
    data = await WorkoutData.findOne({"_id": _id});      
    console.log(data)
    res.send(data)
})
server.post("/workouts/deleteWorkout", async (req, res) => {
    //Require: workout_id, exercise index (ind), set_id (mit pop)
    const {workout_id} = req.body
    const filter = {"_id": workout_id}
    console.log("Delete in BE")
    console.log(req.body)
    const testUpdate = String("exercise")

    //console.log(WorkoutData.find(filter))

    WorkoutData.deleteOne(filter).then((error, data) => {
       res.send("deleted")
       console.log("Exercise Deletion success") 
       //if error -> send error UND if data -> ...
    })
    //console.log(WorkoutData.find(filter))
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
    console.log("Hallo BE")
    
    var testdata = req.body
    const filter = {"_id": testdata.myworkout._id}
    
    await WorkoutData.findOneAndUpdate(filter, {$set: testdata.myworkout})
    console.log("Update Finished in BE")

    let data = {}

    data = await WorkoutData.findOne({"_id": testdata.myworkout._id});

    res.send(data)
})


server.get("/workouts/all", async (req, res)=>{
    const workouts = await WorkoutData.find().sort({workout_date: -1});
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