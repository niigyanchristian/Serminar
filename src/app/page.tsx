"use client"
import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import Header from './component/Header'
import { useState } from 'react';
import Footer from './component/Footer'

interface FormData {
  author: string;
  email: string;
  number: string;
  title: string;
  message: string;
}

export default function Home() {

  const [formData, setFormData] = useState <Partial <myQuestion>>({
    author: '',
    email: '',
    number: '',
    title: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the appropriate content type
        },
        body: JSON.stringify(formData), // Convert your form data to JSON
      });

      if (response.ok) {
        // Request was successful
        // You can handle the response data here if needed
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
    <div>
     <Header active={'home'} /> 
    <section className="contact" id="contact">
        <h2 className="heading">Questions <span>Portal</span></h2>
        <div className="title">
          <p>
          Please for direct answers, contact 0245351832. However, questions will be answered at the seminar (DLCF REGENT, MENDSKROM)
          </p>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="input-box">
                <input type="text" name='author' value={formData.author} onChange={handleInputChange} placeholder="Name" required/>
                <input type="email" name='email' value={formData.email} onChange={handleInputChange} placeholder="Email" required/>
            </div>
            <div className="input-box">
                <input type="text" name='number' value={formData.number} onChange={handleInputChange} placeholder="Mobile Number" required/>
                <input type="text" name='title' value={formData.title} onChange={handleInputChange} placeholder="Title"required />
            </div>
            <textarea name="message" value={formData.message} onChange={handleInputChange}  cols={30} rows={10} placeholder="Your Question" required></textarea>
            <input  type="submit"  value="Send Message" className="btn"/>
        </form>
    </section>
    <Footer/>
    </div>
  )
}
