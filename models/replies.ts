import {Schema, model, models} from "mongoose";


const repliesSchema = new Schema <myQuestion>({
    questionId:String,
    message:String,
    createdAt: {
        type: Date,
        default: Date.now, // Sets the default value to the current date/time
      },
});


const Reply = models.Reply || model('Reply', repliesSchema);

export default Reply;