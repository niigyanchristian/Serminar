"use client";
import { useState,useEffect } from "react";
import Image from "next/image";


async function getQuestions() {
    const response = await fetch('/api/questions');
    const data = await response.json();
    return data
}
export default function page() {
    const [loading,setLoading]= useState(false);
    const [selected, setSelected] = useState<number | null>(null);
    const [data,setData]= useState([]);


    useEffect(() => {
        setLoading(true)
        async function fetchData() {
            const response = await getQuestions();
            setData(response.data);
            setLoading(false)
        } 
        fetchData();
      }, []);
    
      const [formData, setFormData] = useState <Partial <myReply>>({
        questionId:'',
        message: '',
      });
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
          const response = await fetch('/api/replies', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Set the appropriate content type
            },
            body: JSON.stringify(formData), // Convert your form data to JSON
          });
    
          if (response.ok) {
            // Request was successful
            // You can handle the response data here if needed
            setFormData({
             questionId:'',
              message: ''
            });
            window.location.reload();
          } else {
            // Handle errors here
            console.error('Error:', response.statusText);
          }
        } catch (error) {
          // Handle any network errors here
          console.error('Network error:', error);
        }
      };
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
  return (
    <>
    <header className="header">
      <div style={{display:'flex',alignItems:'center'}}>
      <Image height={50} width={50} alt="Logo" src={'/images/logo.jpg'}/>
      <div>
      <a href="#" className="logo">
        DLCF 
      </a>
      <p className="logo">Weija Division</p>
      </div>
      </div>
    </header>
    {!loading&&<div className="container">

    {data.map((item:myQuestion)=>(
    <div key={item._id} className="questions">
        <div className="subContain">
            <h1>{item.title}</h1>
            <p>{item.createdAt.toString().substring(0,10)}</p>
        </div>
        <div style={{width:'100%'}}>
            <div>
            <p>{item.message}</p>
            </div>

            <div style={{display:'flex',justifyContent:'flex-end',marginTop:10}}>
            <input onClick={()=>{
                if(selected == item._id){
                    setSelected(null)
                }else{
                    setSelected(item._id)
                }
                    setFormData({ ...formData, ['questionId']: item._id });
                }} type="submit" value={selected == item._id?'Cancel':'Reply'} className="btn1"/>
            </div>
            {item._id == selected &&<form onSubmit={handleSubmit}>
            <textarea name="message" value={formData.message} onChange={handleInputChange} id="" cols={30} rows={10} placeholder="Your reply" required></textarea>
            {/* <input type="text" value={item._id} name="questionId" hidden/> */}
            <input type="submit" value="Sendg Message" className="btn"/>
            
            </form>}
        </div>
    </div>

    ))}
    </div>}
    {loading&& <div className="loaderContainer">
    <div id="loader"></div>
</div> }
    </>
  )
}