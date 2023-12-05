Ingredient/Product -
{
    title:
    producer:
    [comment]: <barcode:>
    calories:
    fat:
    carbohydrates:
    protein:
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