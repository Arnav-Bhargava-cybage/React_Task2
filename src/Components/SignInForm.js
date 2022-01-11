import React, { useState, useEffect } from "react";
import "./SignInForm.css";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const USERLIST = "userlist";
const LOGGEDUSER = "loggeduser";
const SignInForm = () => {
  let history = useHistory();
  const [useremail, setUseremail] = useState("");
  const [pass, setPass] = useState("");
  const [signedIn, setSignedIn] = useState([]);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (localStorage.getItem(LOGGEDUSER) != "") {
      history.push("/Home");
    }
  }, []);

  const handleEmail = (e) => {
    setUseremail(e.target.value);
  };
  const handlePassword = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = (e) => {
    const recordList = JSON.parse(localStorage.getItem(USERLIST));
    const record = recordList.find(
      (record) => record.email == useremail && record.password == pass
    );
    console.log(record);
    if (record) {
      // alert("Success");
      setSuccess(true);
      signedIn.push({ email: useremail, name: record.name });
      setSignedIn(signedIn);
      localStorage.setItem(LOGGEDUSER, JSON.stringify(signedIn));

      history.push("/Home");
    } else {
      e.preventDefault();
      // alert("records not found");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login failed, Check your credentials!",
      });

      setSuccess(false);
      return;
    }
  };
  return (
    <div className="main">
      <div className="container">
        <h2>Sign In</h2>
        <form action="">
          <div className="form-item">
            <label htmlFor="email">
              <b>Enter your Email Id</b>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleEmail}
            />
          </div>
          <div className="form-item">
            <label htmlFor="password">
              <b>Enter your Password</b>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handlePassword}
            />
          </div>
          <div className="form-btns">
            <button className="signup" type="submit" onClick={handleSubmit}>
              Submit
            </button>

            <div className="options">
              New User? <a href="/">Register here</a>
              <br />
              Forgot Password? <a href="/ForgotPassword">Change here...</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
