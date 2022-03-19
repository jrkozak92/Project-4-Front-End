import { useState, useEffect } from "react";

const Login = (props) => {
  const [user, setUser] = useState({ ...props.user });
  const [accountCreate, setAccountCreate] = useState(false);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleCreateUser = (event) => {
    event.preventDefault();
    console.log("Login User: ", user);
    props.handleCreateUser(user);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    props.handleLogin(user);
  };

  const handleLogout = (event) => {
    props.toggleLogout();
    setUser({ ...props.user });
  };

  return (
    <>
      {props.loggedIn ? (
        <>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          {accountCreate ? (
            <>
              <h5>Create Account</h5>
              <form onSubmit={handleCreateUser}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                <input type="text" name="password" placeholder="Password" onChange={handleChange} />
                <p>{props.loginMessage}</p>
                <input type="submit" value="Create Account" />
              </form>
              <button onClick={() => setAccountCreate(!accountCreate)}>I have an Account</button>
            </>
          ) : (
            <>
              <h5>Login</h5>
              <form onSubmit={handleLogin}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} style={{ backgroundColor: "rgb(248,239,212)", marginRight: "5px", border: "1.5px solid rgb(215,56,94)", borderRadius: "5px" }} />
                <input type="text" name="password" placeholder="Password" onChange={handleChange} style={{ backgroundColor: "rgb(248,239,212)", marginLeft: "5px", border: "1.5px solid rgb(215,56,94)", borderRadius: "5px" }} />
                <p>{props.loginMessage}</p>
                <input type="submit" value="Login" style={{ backgroundColor: "rgb(237,201,136)", color: "rgb(19,39,67)", borderRadius: "15px", marginBottom: "10px", fontSize: "1rem", padding: "4px 7px" }} />
              </form>
              <button onClick={() => setAccountCreate(!accountCreate)} style={{ backgroundColor: "rgb(237,201,136)", color: "rgb(19,39,67)", borderRadius: "15px", marginBottom: "10px", fontSize: "1rem", padding: "4px 7px" }}>
                I don't have an Account
              </button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Login;
