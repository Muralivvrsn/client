import axios from 'axios'
import React,{useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
const EmailVerification = () => {
  const [otp , setOTP] = useState(null);
  const navigate = useNavigate()
  const [Otp, recievedOTP] = useState();
  const location = useLocation();
  const resendOTP = async()=>{
    const res = await axios.post("http://localhost:4000/api/send-otp",{
        email:location.state.email
    }).then((res)=>{
      return res.data
    }).catch((err)=>{
      console.log(err);
    })
    console.log(res)
   setOTP(res)
  }
  const onSubmit = ()=>{
    if(Otp == otp){
      console.log("verification successfulll")
      navigate("/login")
    }else{
      console.log("invalid otp")
    }
  }
  console.log("location",location)
  return (
    <div className='text-center'>
      <h1>Email verification</h1>
      <p className="">An otp sent to your email. Please enter the otp</p>
      <input type="text" onChange={(e)=>recievedOTP(e.target.value)}/>
      <button onClick={()=>onSubmit()}>submit</button>
      <br />
      <small>Not recieve?<button onClick={()=>resendOTP()}>resend</button></small>
    </div>
  )
}

export default EmailVerification
