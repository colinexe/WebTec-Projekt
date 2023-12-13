Ingredient/Product -
{
    title:
    producer:
    calories:
    fat:
    carbohydrates:
    protein:
}

{
    Name:
    Ingredient: [
        {
            Name:
            Hersteller:
            Macros:
        }
    ]
}





WorkoutDocument
{
    user: String,
    workout_type: String,
    date: Date,
    exercise: [
        {
        exercise_name: String,
        muscle_group: String,
        set:[
            {
            set_number: Number,
            set_ weight: Number,
            set_repetition: Number
            }
        ]
        }
    ]
}