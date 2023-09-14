import { NextResponse } from 'next/server'
import Question from "../../../../models/questions";
import connectDB from '../../../../utils/connectMongoDB';
import Reply from '../../../../models/replies';

export async function GET() {
    console.log('======CONNECTING DATABASE=======');
    connectDB()
    console.log('=======DATABASE CONNECTED========');


    const data: myReply[] = await Reply.find();
    
 
  return NextResponse.json({massage:'Ok',data:data})
}


export async function POST(request:Request) {
    console.log('======CONNECTING DATABASE=======');
    await connectDB()
    console.log('=======DATABASE CONNECTED========');
    try {
        const {questionId,message}: Partial<myReply> = await request.json();
        
        await Reply.create({ message, questionId });
        console.log('message->',message,'questionId->',questionId);
        
        
        return NextResponse.json({massage:'Done'});
    } catch (error:any) {
     console.log("=>",error.message);
     return NextResponse.json({status:'bad'})
    }
}