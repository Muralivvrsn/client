import React, { useEffect, useState } from "react";
import axios from "axios";
import Home from "./Home";
import Job from "./Job";
function Jobs() {

  const [response, setResponse] = useState(null);
  useEffect(() => {
    const Res = axios
      .get("https://job-portal-poo4.onrender.com/api/jobs")
      .then((res) => {
        console.log("SUCCESS")
        return res;
      }).then((data)=>{
        setResponse(data)
      })
      .catch((err) => {
        console.log("FAILURE");
      });
      console.log(Res)
      
  },[]);
  return (
    <div>
      <Home />
      <Job data={"HELLO"}/>
      <div className="jobs">
        {response && response.data &&
          response.data.map((data) => <Job data={data} />)}
      </div>
    </div>
  );
}

export default Jobs;
