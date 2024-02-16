const express = require("express")
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const server = express();
const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const session = require("express-session")
const MongoStore = require("connect-mongo")

// connecto to mongoDB
mongoose.connect("mongodb://localhost:27017/Food");

const staticPath = path.join(__dirname, 'build/client')

const GerichtSchema = new mongoose.Schema({
    name: String,
    //producer: String,
    calories: Number,
    fat: Number,
    protein: Number
    fat: Number,
    protein: Number
});

//Ingredient DB
const GerichtsListeSchema = new mongoose.Schema({
    title: String,
    list: [GerichtSchema],
    user_id: String,
    user_id: String,
    date: Date
    //producer: String,
    //calories: Number,
    /*fat: Number,
    carbohydrates: Number,
    protein: Number*/
});


const GerichtsListeData = mongoose.model('Gerichte', GerichtsListeSchema);

const sessionConfig = session({
    secret: "keyboard cat",
    saveUninitialized: true, // don't create session until something stored //don't save session if unmodified
    store: MongoStore.create({
      mongoUrl:  "mongodb://localhost:27017/Food?authSource=admin",
      collectionName: "user_sessions",
    }),
    cookie: {
        expires: 7200000000
    }
  })


server.use(express.static(staticPath))
server.use(express.json())
server.use(cors())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(sessionConfig)
server.use(passport.initialize())
server.use(passport.session())

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
const currentUser = await getUserByEmailOrUsername(user.username, "username not valid");
if(currentUser == null){
        return done(null, false);
}
const { username, email, _id } = currentUser;
console.log(_id)
const userData = {
    auth: true,
    username: username,
    email: email,
    id: _id.toString()
}
done(null, userData);
});

server.get("/auth/checkstatus", (req,res) =>{
    if(req.isAuthenticated()){
        return res.json(req.user)
    } else{
        return res.json({ auth: req.isAuthenticated() });
    }
})

server.get("/logout", async (req, res, next)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
})

/*hier werden die einzelnen Objekte in die Datenbank gepackt
der erweiterte Teil definiert die Zusammensetzung des Objektes*/
/*server.post("/gerichte/add", (req, res) =>{
    const { Gericht, calories, fat, protein } = req.body;
    ProductData.create({
        Gericht: Gericht,
        //producer: producer,
        calories: calories,
        fat: fat,
        protein: protein
    })
    res.send("ok")
})*/

/*hier werden Objekte auf der Datenbank abgefragt
es werden hier alle Gerichte abgefragt*/

server.get("/gerichte/all", async (req, res)=>{
    const gerichte = await GerichtsListeData.find({"user_id": req.user.id});
    console.log(gerichte)
     res.send(gerichte)
})

server.post("/gerichte/deleteMahlzeit", async (req, res) => {
    // Erforderlich: gericht_id
    const { gericht_id } = req.body;
    const filter = { "_id": gericht_id };

    try {
        await GerichtsListeData.deleteOne(filter);
        console.log("Mahlzeit erfolgreich gelöscht.");
        res.status(200).send("Mahlzeit gelöscht");
    } catch (error) {
        console.error("Fehler beim Löschen der Mahlzeit:", error);
        res.status(500).send("Interner Serverfehler");
    }
});


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
    user_id: String,
    workout_type: String,
    workout_date: Date,
    duration: Number,
    exercise: [ExerciseSchema]
})

server.post("/gerichte/liste/add", async (req, res)=>{
    const  user_id = req.user.id||"invalid"
    req.body["user_id"]=user_id 
    const { ... date } = req.body;
    const data = await GerichtsListeData.create({ ... date });
//    const data = await GerichtsListeData.create(req.body)
    res.send(200)
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
        workout_date: workout_date,
        user_id: req.user.id||"invalid"
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
    var testdata = req.body
    const filter = {"_id": testdata.myworkout._id}   
    await WorkoutData.findOneAndUpdate(filter, {$set: testdata.myworkout})
    let data = {}
    data = await WorkoutData.findOne({"_id": testdata.myworkout._id});

    res.send(data)
})


server.get("/workouts/all", async (req, res)=>{
    const filter = {"user_id": req.user.id}
    const workouts = await WorkoutData.find(filter).sort({workout_date: -1});
    //console.log(workouts)
    res.send(workouts)
})

server.get("/workouts/thisDate", async (req, res) => {
    const date = new Date();

    // Set the start of the day (midnight) for the given date
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    // Set the end of the day (23:59:59.999) for the given date
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const thisWorkout = await WorkoutData.find({
        "workout_date": {
            $gte: startOfDay,
            $lt: endOfDay
        }, "user_id": req.user.id
    }).sort({ workout_date: -1 });

    res.send(thisWorkout);
});

// SignUp

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const UserData = mongoose.model('User', UserSchema);


async function getUserByEmailOrUsername(email, username){
    try {
        const user = await UserData.findOne({
            $or: [{ email: email }, { username: username }]
        });

        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        console.error('Fehler bei der Suche nach dem Nutzer:', error);
        throw error;
    }
};


async function registerUser(req, res){
    const{username, email, password} = req.body
    console.log(req.body)
    try{
       var user = await getUserByEmailOrUsername(email, username)
       console.log(user)
       if(user === null){
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = bcrypt.hashSync(password, salt);
        console.log(hashedPassword)
        
        const account = await insertUser(username, email, hashedPassword)
        if(account != null){
            res.redirect("/?register=success")
        }
        }

    }catch(error){
        res.redirect("/?reason="+error)
        console.log(error)
    }
}

async function insertUser(username, email, password) {
    return new Promise(async (resolve, reject) => {
       try {
        
        const newUser = await UserData.create({username: username, email: username, password: password})
        console.log(newUser)
        resolve(newUser);
    } catch (error) {
        reject (error);
    } 
    })
    
}

server.post("/auth/register", registerUser)

passport.use("local", new LocalStrategy(
    async function(username, password, done) {
      const user = await UserData.findOne({ username: username })
        
        if (!user) { return done(null, false); }
        if (user){
            const isPasswordMatched = bcrypt.compare(user.password, password)
            if(!isPasswordMatched){
                return done(null, false, {message: "1"})
            } console.log(user) 
            return done(null, user)
            
        }
        return done(null, user);
      })
    
);

async function loginUser(req, res, next){
    passport.authenticate("local", (err, user, info) => {
        console.log("here in loginUser")
        console.log(user)
        if (err) {
            console.log("1")
            return next(err);
        }
        if (!user) {
            console.log("2")
            return res.redirect("/");
        }
        req.logIn(user, (err) => {
            if (err) {
                console.log("3")
                return next(err);
            }
            console.log("4")
            
            return res.redirect("/Home");
        });
    })(req, res, next);
}

server.post("/auth/login", loginUser)

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

// Login

