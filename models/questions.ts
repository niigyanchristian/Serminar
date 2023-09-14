import {Schema, model, models} from "mongoose";


const questionSchema = new Schema <myQuestion>({
    author:String,
    email:String,
    number: String,
    message:String,
    title:String,
    createdAt: {
        type: Date,
        default: Date.now, // Sets the default value to the current date/time
      },
});


const Question = models.Question || model('Question', questionSchema);
// const Question = model("Question", questionSchema);

export default Question;