import React, { useState } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOrg = (event) => {
    setOrg(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleAPI = () => {
    console.log(org, email, password);
    axios.post("http://localhost:5000/api/company", {
      org: org,
      email: email,
      password: password,
    }).then((res)=>{
      alert("Successfully registered")
    }).catch((err) => {
      alert('Please write valid credentials')
    });
  };

  return (
    <>
      <div className="row fnt" style={{ height: "100vh" }}>
        <div className="col-6 backColor text-center ">
          <h1 className="m-auto">XYZ Providers</h1>
          <p className="mt-2">Providing secure authentication solutions!</p>
          <button className="btn btn-primary rounded-3">Read More</button>
        </div>
        <div className="col-6 m-auto" style={{ paddingLeft: "11.5rem" }}>
          <h1>Hello!</h1>
          <p>Register Your Organization</p>
          <form>
            <input
              className="mainLoginInput rounded-3 ps-2"
              type="text"
              // value={user}
              name="org"
              value={org}
              onChange={handleOrg}
              placeholder="&#61447; Organisation Name"
            />{" "}
            <br />
            <input
              className="mainLoginInput rounded-3 ps-2"
              type="text"
              name="email"
              value={email}
              onChange={handleEmail}
              placeholder="&#61442; Email Address"
            />{" "}
            <br />
            <input
              className="mainLoginInput rounded-3 ps-2"
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
              placeholder="&#61475; Password"
            />{" "}
            <br />
            <button
              className=" btn btn-primary rounded-3 mt-2"
              type="btn bg-primary"
              style={{ width: "45%" }}
              onClick={handleAPI}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
