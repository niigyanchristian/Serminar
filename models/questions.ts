import {Schema, model, models} from "mongoose";


const questionSchema = new Schema <myQuestion>({
    author:{
      type:String,
      required: true
    },
    email:{
      type:String,
      required: true
    },
    number: {
      type:String,
      required: true
    },
    message:{
      type:String,
      required: true
    },
    title:{
      type:String,
      required: true
    },
    createdAt: {
        type: Date,
        default: Date.now, // Sets the default value to the current date/time
      },
});


const Question = models.Question || model('Question', questionSchema);
// const Question = model("Question", questionSchema);

export default Question;