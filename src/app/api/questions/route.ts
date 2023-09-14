import { NextResponse } from 'next/server'
import Question from "../../../../models/questions";
import connectDB from '../../../../utils/connectMongoDB';

export async function GET() {
    console.log('======CONNECTING DATABASE=======');
    connectDB()
    console.log('=======DATABASE CONNECTED========');


    const data: myQuestion[] = await Question.find();
    // console.log(data);
    
 
  return NextResponse.json({massage:'Ok',data:data})
}

export async function POST(request:Request) {
    console.log('======CONNECTING DATABASE=======');
    await connectDB()
    console.log('=======DATABASE CONNECTED========');
    try {
        const {email,author,message,number,title}: Partial<myQuestion> = await request.json();
        
        await Question.create({ message,email,author,number,title:title });
        console.log('email->',email,'author->',author,'message->',message,'number->',number,'title->',title);
        
        
        return NextResponse.json({massage:'Ok',status:"Ok"})
    } catch (error:any) {
     console.log("=>",error.message);
     return NextResponse.json({status:'bad'})
    }
}
