import React, { useState, useEffect } from "react";
import "./RegistrationForm.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const USERLIST = "userlist";
const LOGGEDUSER = "loggeduser";

const RegistrationForm = () => {
  let history = useHistory();

  const [userRegistration, setUserRegistration] = useState({
    name: "",
    email: "",
    mobile: "",
    country: "",
    password: "",
    confirmPassword: "",
  });
  const [country, setCountry] = useState([]);
  const [focusedName, setFocusedName] = useState(false);
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedMobile, setFocusedMobile] = useState(false);
  const [focusedCountry, setFocusedCountry] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [focusedConfirm, setFocusedConfirm] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (localStorage.getItem(LOGGEDUSER) != "") {
      history.push("/Home");
    }
    const axiosPost = async () => {
      const response = await axios("https://restcountries.com/v2/all");
      setCountry(response.data);
    };
    axiosPost();
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserRegistration({ ...userRegistration, [name]: value });
  };

  const handleFocusName = (e) => {
    setFocusedName(true);
  };
  const handleFocusEmail = (e) => {
    setFocusedEmail(true);
  };
  const handleFocusMobile = (e) => {
    setFocusedMobile(true);
  };
  const handleFocusCountry = (e) => {
    setFocusedCountry(true);
  };
  const handleFocusPassword = (e) => {
    setFocusedPassword(true);
  };
  const handleFocusConfirm = (e) => {
    setFocusedConfirm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecord = {
      ...userRegistration,
      id: new Date().getTime().toString(),
    };

    let recordList = JSON.parse(localStorage.getItem(USERLIST)) || [];

    if (
      recordList == [] ||
      !recordList.find((record) => record.email == newRecord.email)
    ) {
      recordList.push(newRecord);

      localStorage.setItem(USERLIST, JSON.stringify(recordList));
      Swal.fire({
        title: "Congrats!",
        text: "You're now registered...",
        imageUrl:
          "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX20519886.jpg",
        imageWidth: 400,
        imageHeight: 250,
        imageAlt: "Custom image",
      });
      console.log(localStorage.getItem(USERLIST));
    } else {
      // alert("user already exists");
      Swal.fire({
        title: "Oops..!",
        text: "It seems that you're already registered...",
        imageUrl:
          "https://media.istockphoto.com/photos/confused-and-pensive-expression-of-a-boy-with-many-questions-cyan-picture-id1272862482?b=1&k=20&m=1272862482&s=170667a&w=0&h=Z4b1u2g3EzxJ1G-4WIat_T0z2OtD4_VJ4MkyM2j60GQ=",
        imageWidth: 400,
        imageHeight: 250,
        imageAlt: "Custom image",
      });
      return;
    }

    setUserRegistration({
      name: "",
      email: "",
      mobile: "",
      country: "",
      password: "",
      confirmPassword: "",
    });
  };

  const Items = [
    {
      title: "Enter your full name",
      type: "text",
      value: userRegistration.name,
      name: "name",
      id: "name",
      required: true,
      onFocusHandler: handleFocusName,
      focused: focusedName,
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      pattern: "^[A-Za-z0-9]{3,16}$",
      placeholder: "Full Name",
    },

    {
      title: "Enter your Email Id",
      type: "email",
      value: userRegistration.email,
      name: "email",
      id: "email",
      required: true,
      onFocusHandler: handleFocusEmail,
      focused: focusedEmail,
      errorMessage: "It should be a valid email address!",
      placeholder: "Email",
    },

    {
      type: "tel",
      value: userRegistration.mobile,
      name: "mobile",
      id: "mobile",
      required: true,
      onFocusHandler: handleFocusMobile,
      focused: focusedMobile,
      errorMessage: "It should be a valid mobile number!",
      pattern: "^[0-9]{10}$",
      placeholder: "Enter your Mobile Number",
      country: {
        type: "country",
        name: "country",
        id: "mobile",
        value: userRegistration.country,
        required: true,
        onFocusHandler: handleFocusCountry,
        focused: focusedCountry,
        errorMessage: "Select your country!",
      },
    },
    {
      title: "Enter the password",
      type: "password",
      value: userRegistration.password,
      name: "password",
      id: "password",
      required: true,
      onFocusHandler: handleFocusPassword,
      focused: focusedPassword,
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      placeholder: "Password",
    },
    {
      title: "Confirm the password",
      type: "password",
      value: userRegistration.confirmPassword,
      name: "confirmPassword",
      id: "confirmPassword",
      required: true,
      onFocusHandler: handleFocusConfirm,
      focused: focusedConfirm,
      errorMessage: "Passwords don't match!",
      pattern: userRegistration.password,
      placeholder: "Confirm Password",
    },
  ];

  return (
    <div className="main">
      <div className="container">
        <h2>Register Here</h2>

        <form onSubmit={handleSubmit}>
          {Items.map((item) => {
            return item.id === "mobile" ? (
              <div>
                <label>
                  <b>Enter your mobile number</b>
                </label>
                <br />
                <div className="form-item-mobile">
                  <div className="form-item-country" key={item.id}>
                    <select
                      name={item.country.name}
                      value={item.country.value}
                      onChange={handleInput}
                      onBlur={item.country.onFocusHandler}
                      required={item.country.required}
                    >
                      {country.map((code) => {
                        return (
                          <option value={code.callingCodes[0]}>
                            {"+" + code.callingCodes[0] + " " + code.alpha3Code}
                          </option>
                        );
                      })}
                    </select>
                    <span
                      style={{
                        display:
                          item.focused == true && item.value == ""
                            ? "block"
                            : "none",
                      }}
                    >
                      {item.country.errorMessage}
                    </span>
                  </div>

                  <div className="form-item-number" key={item.id}>
                    <input
                      type={item.type}
                      onChange={handleInput}
                      onBlur={item.onFocusHandler}
                      value={item.value}
                      autoComplete="off"
                      name={item.name}
                      id={item.id}
                      placeholder={item.placeholder}
                      pattern={item.pattern}
                      minLength="10"
                      required={item.required}
                    />
                    <span
                      style={{
                        display:
                          item.focused == true && item.value == ""
                            ? "block"
                            : "none",
                      }}
                    >
                      {item.errorMessage}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="form-item" key={item.id}>
                <label htmlFor={item.name}>
                  <b>{item.title}</b>
                </label>
                <input
                  type={item.type}
                  onChange={handleInput}
                  onBlur={item.onFocusHandler}
                  value={item.value}
                  autoComplete="off"
                  name={item.name}
                  id={item.id}
                  placeholder={item.placeholder}
                  pattern={item.pattern}
                  required={item.required}
                  onFocus={() =>
                    userRegistration.name === "confirmPassword" &&
                    setFocusedConfirm(true)
                  }
                  focusedConfirm={focusedConfirm.toString()}
                />
                <span
                  style={{
                    display:
                      item.focused == true && item.value == ""
                        ? "block"
                        : "none",
                  }}
                >
                  {item.errorMessage}
                </span>
              </div>
            );
          })}

          <div className="form-btns">
            <button className="signup" type="submit">
              Submit
            </button>

            <div className="options">
              Already have an account? <a href="/SignInForm">Login here</a>
            </div>
          </div>
        </form>
        <p>Copyright &copy; cyabge.com</p>
      </div>
    </div>
  );
};

export default RegistrationForm;
