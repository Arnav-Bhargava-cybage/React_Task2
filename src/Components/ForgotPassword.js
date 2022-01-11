import React, { useState, useEffect } from "react";
import "./ForgotPassword.css";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const USERLIST = "userlist";
const LOGGEDUSER = "loggeduser";
const ForgotPassword = () => {
  let history = useHistory();

  const [useremail, setUseremail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
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
  const handleConfirmPassword = (e) => {
    setPass2(e.target.value);
  };

  const handleSubmit = (e) => {
    const recordList = JSON.parse(localStorage.getItem(USERLIST));

    if (pass !== pass2) {
      // alert("password didn't match");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords don't match!",
      });
      Swal.fire({
        title: "Oops..!",
        text: "Password don't match...",
        imageUrl: "https://i.imgflip.com/513ppz.png",
        imageWidth: 350,
        imageHeight: 300,
        imageAlt: "Custom image",
      });
      return;
    }
    let userfound = false;

    for (let i = 0; i < recordList.length; i++) {
      if (useremail == recordList[i].email) {
        recordList[i].password = pass;
        recordList[i].confirmPassword = pass;

        userfound = true;
        Swal.fire({
          title: "Yess..!",
          text: "Password is updated successfully...",
          imageUrl:
            "https://memesboy.com/wp-content/uploads/2018/12/Baby-Meme-Success-10.jpg",
          imageWidth: 400,
          imageHeight: 250,
          imageAlt: "Custom image",
        });
        // history.push("/SignInForm");

        break;
      }
    }

    if (!userfound) {
      // alert("user not registered");

      Swal.fire({
        title: "Oops..!",
        text: "User doesn't exist...",
        imageUrl:
          "https://stat2.bollywoodhungama.in/wp-content/uploads/2020/11/On-Set-with-the-Cast-of-Ludo-Behind-the-Scenes-Ludo-Netflix-India-354x199.jpeg",
        imageWidth: 400,
        imageHeight: 250,
        imageAlt: "Custom image",
      });
      return;
    }

    setTimeout(function () {
      if (userfound) {
        history.push("/SignInForm");
        // alert("success");
      }
    }, 2000);
    localStorage.setItem(USERLIST, JSON.stringify(recordList));
  };
  return (
    <div className="main">
      <div className="container">
        <h3>Change your password here...</h3>
        <form>
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
              <b>Enter new Password</b>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="New Password"
              onChange={handlePassword}
            />
          </div>
          <div className="form-item">
            <label htmlFor="password">
              <b>Confirm new Password</b>
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm new Password"
              onChange={handleConfirmPassword}
            />
          </div>
          <div className="form-btns">
            <button
              className="signup"
              type="button"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
            <div className="options">
              <a href="/SignInForm">Login here</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
