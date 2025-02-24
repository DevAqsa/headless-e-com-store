import { useState } from 'react'

function Auth() {

    const [loginData, setLoginData] = useState({
        login_username: '',
        login_password: ''
    })

    const [signupData, setSignupData] = useState({
        signup_name: '',
        signup_email: '',
        signup_username: '',
        signup_password: ''
    })

    // onChange Event For Login Data
    const handleOnChangeLoginData = (event) => {

        const { name, value } = event.target;

        setLoginData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }

    // Form submit login 
    const handleLoginFormSubmit = (event) => {
        event.preventDefault();
        console.log(loginData)

        setLoginData({
            login_username: '',
            login_password: ''
        })


    }

    // onChange Event For Signup Data
    const handleOnChangeSignupFormData = (event) => {

        const { name, value } = event.target;

        setSignupData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        })
        )
    }

    // Form submit signup
    const handleSignupFormSubmit = (event) => {
        event.preventDefault();
        console.log(signupData)

        setSignupData({
            signup_name: '',
            signup_email: '',
            signup_username: '',
            signup_password: ''
        })
    }

  return <>
  
  <div className="container">
    <div className="toast-container"></div>
    <h1 className="my-4 text-center">Login / Signup</h1>
    <div className="row">
      <div className="col-md-6">
        <h2>Login</h2>
        <form onSubmit={handleLoginFormSubmit}>
          <div className="mb-3">
            <label htmlFor="loginUsername" className="form-label">Username</label>
            <input
              type="text"
             
              className="form-control"
              placeholder="Enter username"
              name='login_username'
                value={loginData.login_username}
                onChange={handleOnChangeLoginData}
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="loginPassword" className="form-label">Password</label>
            <input
              type="password"
             
              className="form-control"
              placeholder="Enter password"
                name='login_password'
            value={loginData.login_password}
            onChange={handleOnChangeLoginData}
            />
          </div>
  
          <button type="submit" className="btn btn-primary mt-3">Login</button>
        </form>
      </div>
  
      <div className="col-md-6">
        <h2>Signup</h2>
        <form onSubmit={handleSignupFormSubmit}>
          <div className="mb-3">
            <label htmlFor="signupName" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              name='signup_name'
              value={signupData.signup_name}
              onChange={handleOnChangeSignupFormData}
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="signupEmail" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
                name='signup_email'
                value={signupData.signup_email}
                onChange={handleOnChangeSignupFormData}
              />
            </div>
        
        
  
          <div className="mb-3">
            <label htmlFor="signupUsername" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              name='signup_username'
              value={signupData.signup_username}
              onChange={handleOnChangeSignupFormData}
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="signupPassword" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
                name='signup_password'
                value={signupData.signup_password}
                onChange={handleOnChangeSignupFormData}
            />
          </div>
  
          <button type="submit" className="btn btn-success mt-3">Signup</button>
        </form>
      </div>
    </div>
  </div>
  
  
  </>
}

export default Auth