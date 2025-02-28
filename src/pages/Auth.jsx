/* eslint-disable react/prop-types */
import { useState } from "react";
import { registerStoreUser, loginUser, getLoggedInUserData } from "../Api.js";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'

function Auth({ setPageLoading, isAuthenticated, setLoggedInUserData }) {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    login_username: "",
    login_password: "",
  });

  const [signupData, setSignupData] = useState({
    signup_name: "",
    signup_email: "",
    signup_username: "",
    signup_password: "",
  });

  // onChange Event For Login Data
  const handleOnChangeLoginData = (event) => {
    const { name, value } = event.target;

    setLoginData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Form submit login
  const handleLoginFormSubmit = async (event) => {
    setPageLoading(true);
    event.preventDefault();
    try {
      const response = await loginUser({
        username: loginData.login_username,
        password: loginData.login_password,
      });

      console.log(response);

      setLoginData({
        login_username: "",
        login_password: "",
      });

      localStorage.setItem("token", response.token);
   
     
      isAuthenticated(true);


      //get user Data
      const  loggedInUserData   = {}
      const UserData = await getLoggedInUserData (response.token);
      console.log(UserData);

      loggedInUserData.id = UserData.id;
      loggedInUserData.name = UserData.name;
      loggedInUserData.email = response.user_email;
      loggedInUserData.username = response.user_nicename;

      localStorage.setItem("user_data", JSON.stringify(loggedInUserData));

      toast.success("User logged in successfully!");

      setLoggedInUserData(JSON.stringify(loggedInUserData))

      navigate("/products");

    } catch (error) {
      console.log(error);
      toast.error("Invalid username or password");
    }finally{
      setPageLoading(false);
    }
  };

  // onChange Event For Signup Data
  const handleOnChangeSignupFormData = (event) => {
    const { name, value } = event.target;

    setSignupData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Form submit signup form
  const handleSignupFormSubmit = async (event) => {
    event.preventDefault();
    setPageLoading(true);

    try {
      await registerStoreUser({
        name: signupData.signup_name,
        username: signupData.signup_username,
        email: signupData.signup_email,
        password: signupData.signup_password,
      });

      setSignupData({
        signup_name: "",
        signup_email: "",
        signup_username: "",
        signup_password: "",
      });

      setPageLoading(false);
      toast.success("User registered successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="toast-container"></div>
        <h1 className="my-4 text-center">Login / Signup</h1>
        <div className="row">
          <div className="col-md-6">
            <h2>Login</h2>
            <form onSubmit={handleLoginFormSubmit}>
              <div className="mb-3">
                <label htmlFor="loginUsername" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                  name="login_username"
                  value={loginData.login_username}
                  onChange={handleOnChangeLoginData}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="login_password"
                  value={loginData.login_password}
                  onChange={handleOnChangeLoginData}
                />
              </div>

              <button type="submit" className="btn btn-primary mt-3">
                Login
              </button>
            </form>
          </div>

          <div className="col-md-6">
            <h2>Signup</h2>
            <form onSubmit={handleSignupFormSubmit}>
              <div className="mb-3">
                <label htmlFor="signupName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  name="signup_name"
                  value={signupData.signup_name}
                  onChange={handleOnChangeSignupFormData}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="signupEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  name="signup_email"
                  value={signupData.signup_email}
                  onChange={handleOnChangeSignupFormData}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="signupUsername" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                  name="signup_username"
                  value={signupData.signup_username}
                  onChange={handleOnChangeSignupFormData}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="signupPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="signup_password"
                  value={signupData.signup_password}
                  onChange={handleOnChangeSignupFormData}
                />
              </div>

              <button type="submit" className="btn btn-success mt-3">
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
