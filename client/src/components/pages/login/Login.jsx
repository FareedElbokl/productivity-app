import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { toast, Bounce, ToastContainer } from "react-toastify";

const Login = (props) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = inputs;

  async function onSubmitForm(e) {
    e.preventDefault();

    const body = { email, password };
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.status === 401) {
        toast.error("Invalid Credentials", {
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

      const parseRes = await response.json();

      //store token in local storage
      localStorage.setItem("token", parseRes.token);

      props.setAuth(true);
    } catch (error) {
      console.error(error.message);
    }
  }
  function onChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="login-page-container">
      <div className="login-box">
        <form onSubmit={onSubmitForm} className="login-form">
          <div className="login-header">
            <h1>Login</h1>
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
          <div className="input-box ">
            <div className="password-container">
              <input
                className="input-field "
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                value={password}
                onChange={(e) => onChange(e)}
              />
              <FontAwesomeIcon
                className="password-icon"
                icon={showPassword ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>

          <div className="input-submit">
            <button className="submit-btn" id="submit"></button>
            <label htmlFor="submit">Sign in</label>
          </div>
          <div className="sign-up-link">
            <p>
              Don't have an account?{" "}
              <Link className="register-link" to="/register">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
