const express = require("express")
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const server = express();
const mongoose = require('mongoose')

// connecto to mongoDB
mongoose.connect("mongodb://localhost:27017/Food");

const staticPath = path.join(__dirname, 'build/client')

const GerichtSchema = new mongoose.Schema({
    name: String,
    //producer: String,
    calories: Number,
    /*fat: Number,
    carbohydrates: Number,
    protein: Number*/
});

//Ingredient DB
const GerichtsListeSchema = new mongoose.Schema({
    title: String,
    list: [GerichtSchema]
    //producer: String,
    //calories: Number,
    /*fat: Number,
    carbohydrates: Number,
    protein: Number*/
});


const GerichtsListeData = mongoose.model('Gerichte', GerichtsListeSchema);




server.use(express.static(staticPath))
server.use(express.json())
server.use(cors())
server.use(bodyParser.urlencoded({ extended: true }))


/*hier werden die einzelnen Objekte in die Datenbank gepackt
der erweiterte Teil definiert die Zusammensetzung des Objektes*/
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

/*hier werden Objekte auf der Datenbank abgefragt
es werden hier alle Gerichte abgefragt*/
server.get("/gerichte/all", async (req, res)=>{
    const gerichte = await GerichtsListeData.find();
    //console.log(gerichte)
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

server.post("/gerichte/liste/add", async (req, res)=>{
    const data = await GerichtsListeData.create(req.body)
    res.send(200)
})

const WorkoutData = mongoose.model('Workouts', WorkoutSchema);

//initial erstellen
server.post("/workouts/add", (req, res) =>{
    //console.log(req.body);
    /*hier werden die Variablen abgefragt, die genutzt werden*/
    const {workout_type, workout_date, duration, exercise} = req.body;
    const {exercise_name, set} = exercise[0];
    //console.log(exercise[0]);
    const {set_number, set_weight, set_repetition} = set[0];
    //console.log(set[0]);

    /*hier drunter wird in die Datenbank geschrieben*/
    WorkoutData.create({
        workout_type: workout_type,
        workout_date: workout_date,
        duration: "5",
        exercise: [{
            exercise_name: exercise_name,
            set: [{
                set_number: set_number,
                set_weight: set_weight,
                set_repetition: set_repetition
            }]
        }]
    })
    res.send("ok")
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