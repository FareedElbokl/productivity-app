import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, Bounce, ToastContainer } from "react-toastify";

const Registration = (props) => {
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
  });
  const { email, name, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  async function onSubmitForm(e) {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.status === 401) {
        toast.error("User Already Exists", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        toast.error("Registration Failed", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        return;
        throw new Error(errorText);
      }
      const parseRes = await response.json(); //this is where the jwt token is stored

      //now we want to store the jwt token in local storage
      localStorage.setItem("token", parseRes.token);

      //now change the auth state
      props.setAuth(true);
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <div className="login-box register-box">
      <form onSubmit={onSubmitForm}>
        <div className="login-header register-header">
          <h1>Sign Up</h1>
        </div>
        <div className="input-box">
          <input
            className="input-field"
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="input-box">
          <input
            className="input-field "
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="input-box">
          {" "}
          <input
            className="input-field "
            type="text"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="input-submit input-submit-register">
          <button className="submit-btn" id="submit"></button>
          <label htmlFor="submit">Sign up</label>
        </div>
        <div className=" alr-signed-in-container">
          <p>
            Already a user?{""}
            <Link to="/login" className="already-logged-in">
              {" "}
              Login Here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Registration;
