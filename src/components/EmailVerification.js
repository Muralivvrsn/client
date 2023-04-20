import axios from 'axios'
import React,{useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'
const EmailVerification = () => {
  const [otp , setOTP] = useState(null);
  const [sentOTP, setSentOTP] = useState(false);
  const navigate = useNavigate()
  const [Otp, recievedOTP] = useState();
  const location = useLocation();
  const resendOTP = async()=>{
    const res = await axios.post("https://job-portal-poo4.onrender.com/api/send-otp",{
        email:location.state.email
    }).then((res)=>{
      return res.data
    }).catch((err)=>{
      console.log(err);
    })
    console.log(res)
   setOTP(res)
  }
  if(!sentOTP){
    resendOTP();
    setSentOTP(true);
  }
  
  const onSubmit = ()=>{
    if(parseInt(Otp)===otp){
      console.log("verification successfulll")
      navigate("/login")
    }else{
      console.log("invalid otp")
    }
  }
  console.log("location",location)
  return (
    <motion.div className='text-center'
    initial={{opacity:0, x:"100vw"}}
    animate={{opacity:1, x:0}}
    transition={{duration:1, ease:"easeInOut"}}
    >
      <h1>Email verification</h1>
      <p className="">An otp sent to your email. Please enter the otp</p>
      <input type="text" onChange={(e)=>recievedOTP(e.target.value)}/>
      <button onClick={()=>onSubmit()}>submit</button>
      <br />
      <small>Not recieve?<button onClick={()=>resendOTP()}>resend</button></small>
    </motion.div>
  )
}

export default EmailVerification
