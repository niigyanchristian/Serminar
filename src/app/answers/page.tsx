"use client";
import { useEffect, useState } from "react";
import Header from "../component/Header";
import Image from 'next/image'
import Link from "next/link";


const datat = [
    {id:1,author:'Christian',message:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque itaque debitis consectetur nemo laborum. Saepe, at? Veritatis magni ab pariatur repellendus! Incidunt perferendis itaque dicta eius iusto amet cupiditate saepe!'},
    {id:2,author:'Ben',message:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque itaque debitis consectetur nemo laborum. Saepe, at? Veritatis magni ab pariatur repellendus! Incidunt perferendis itaque dicta eius iusto amet cupiditate saepe!'},
    {id:3,author:'Jaymills',message:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque itaque debitis consectetur nemo laborum. Saepe, at? Veritatis magni ab pariatur repellendus! Incidunt perferendis itaque dicta eius iusto amet cupiditate saepe!'},
    {id:4,author:'Fafa',message:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque itaque debitis consectetur nemo laborum. Saepe, at? Veritatis magni ab pariatur repellendus! Incidunt perferendis itaque dicta eius iusto amet cupiditate saepe!'},
]

async function getAnswers() {
    const response = await fetch('/api/replies');
    const data = await response.json();
    return data
}

async function getQuestions() {
    const response = await fetch('/api/questions');
    const data = await response.json();
    return data
}
export default function page() {
    const [isReply,setReply]= useState(false);
    const [selected, setSelected] = useState<number | null>(null);
    const [loading,setLoading]= useState(false);
    const [questions,setQuestion]= useState([]); 
    const [answers,setAnswer]= useState([]); 
    
    useEffect(() => {
        setLoading(true)
        async function fetchData() {
            const response1 = await getAnswers();
            const response2 = await getQuestions();
            setQuestion(response2.data);
            setAnswer(response1.data);
            setLoading(false)
        } 
        fetchData();
      }, []);
  return (
    <>
    <Header active={'answers'}/>
    <div  style={{marginTop:'10%',marginBottom:'5%'}}>

    {questions.map((item:myQuestion,index)=>(
    <div key={item._id} style={{minHeight:0}} className="questions">
        <div className="subContain" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h1>{item.title}</h1>
            <h3 style={{fontSize:15,color:'#fff'}}>{item.createdAt.toString().substring(0,10)}</h3>
        </div>
        <div>
            <p style={{fontSize:18}}>{item.message}</p>

            <div style={{display:'flex',justifyContent:'flex-end',marginTop:10}}>
            <input onClick={()=>{
                
                if(selected == item._id){
                    setSelected(null)
                }else{
                    setSelected(item._id)
                }
                }} type="submit" value={selected == item._id ?'Cancel':'Answers'} className="btn1"/>
            </div>
            {item._id == selected &&<form action="#">
            
            <div className="answers">
                {answers.map((ans:myReply,index)=>{
                    if(ans.questionId === item._id)
                        return(
                            <div key={ans._id} className="div3">
                                <div className="div2">
                                    <div style={{flexDirection:'row',alignItems:'center',display:'flex'}}>
                                        <div style={{flexDirection:'row',display:'flex',alignItems:'center'}}>
                                        <p style={{fontSize:20,marginLeft:10,fontWeight:'bold',color:'#fff'}}>Answer</p>
                                        </div>
                                    </div>

                                    <div style={{flexDirection:'row',alignItems:'flex-end',display:'flex'}}>
                                    <p style={{fontSize:15,color:'#fff'}}>{ans.createdAt.toString().substring(0,10)}</p>
                                    </div>
                                </div>
                                <div style={{padding:'2%'}}>
                                    <p style={{fontSize:18}}>{ans.message}</p>
                                </div>
                            </div>
                    )
                })}
            </div>
            </form>}
        </div>
    </div>

    ))}
    </div>
    {loading&& <div style={{position:'absolute',top:0,width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',background:'#e5e5e5'}}>
    <div id="loader"></div>
</div> }
    </>
  )
}