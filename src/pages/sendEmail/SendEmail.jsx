import React,{useState}  from 'react'
import {sendEmail} from "../../services/auth"
import "./sendemail.css"

function SendEmail() {

  const [email,setEmail] =useState("")


  const handleInput =(e)=>{
    setEmail(e.target.value)
  }

  const handleSubmit= async (e)=>{
    e.preventDefault();

    const body = {clientEmail:email}
    console.log(body)
    const res = await sendEmail(body)

    console.log(res)
  }


  console.log(email)
  
  return (
    <div className="emailContainer">

      <form action="" onSubmit={handleSubmit}>
      <label htmlFor="email">Ingresa tu correo</label>
      <input type="text" id="email" name="email" value={email} onChange={handleInput}/>
      <button type="submit" >Enviar correo</button>
      </form>
     
    </div>
  )
}

export default SendEmail
