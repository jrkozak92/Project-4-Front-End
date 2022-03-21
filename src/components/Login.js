import { useState, useEffect } from "react";
import axios from "axios";

const Login = (props) => {
  const [user, setUser] = useState({ ...props.currentUser });
  const [accountCreate, setAccountCreate] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

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

  const toggleShowSettings = () => {
    setShowAccountSettings(!showAccountSettings);
  };

  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
  };

  const handleUpdatePassword = (changeEvent, changedUser) => {
    changeEvent.preventDefault();
    console.log("Props current user: ", props.currentUser, "userobject being passed: ", changedUser);
    const updateUser = { username: changedUser.username, password: changedUser.password };
    axios.put("http://localhost:8000/api/user/" + props.currentUser.id, updateUser).then(
      (response) => {
        alert("Your Password has been updated");
        togglePasswordForm();
      },
      (error) => {
        console.error("User not found", error.toJSON());
      }
    );
  };

  return (
    <>
      {props.loggedIn ? (
        <>
          {!showAccountSettings ? (
            <>
              <button onClick={handleLogout} style={{ backgroundColor: "rgb(237,201,136)", color: "rgb(19,39,67)", borderRadius: "15px", marginBottom: "20px", fontSize: "1rem", padding: "4px 7px" }}>
                Logout
              </button>
              <br />
              <button onClick={toggleShowSettings} style={{ backgroundColor: "rgb(237,201,136)", color: "rgb(19,39,67)", borderRadius: "15px", marginBottom: "30px", fontSize: "1rem", padding: "4px 7px" }}>
                Account Settings
              </button>
              <br />
            </>
          ) : (
            <>
              <button onClick={props.handleDeleteUser} style={{ backgroundColor: "rgb(237,201,136)", color: "rgb(215,56,94)", borderRadius: "15px", marginBottom: "10px", fontSize: "1rem", padding: "4px 7px" }}>
                Delete Account
              </button>
              <br />
              {showPasswordForm ? (
                <>
                  <form onSubmit={(event) => handleUpdatePassword(event, user)}>
                    <input type="password" name="password" onChange={handleChange} value={user.password} style={{ backgroundColor: "rgb(248,239,212)", marginRight: "5px", border: "1.5px solid rgb(215,56,94)", borderRadius: "5px", marginBottom: "10px" }} />
                    <br />
                    <input type="submit" value="Update Password" style={{ backgroundColor: "rgb(237,201,136)", color: "rgb(19,39,67)", borderRadius: "15px", marginBottom: "10px", fontSize: "1rem", padding: "4px 7px" }} />
                  </form>
                  <button onClick={togglePasswordForm} style={{ backgroundColor: "rgb(237,201,136)", color: "rgb(19,39,67)", borderRadius: "15px", fontSize: "1rem", padding: "4px 7px" }}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button onClick={togglePasswordForm} style={{ backgroundColor: "rgb(237,201,136)", color: "rgb(19,39,67)", borderRadius: "15px", fontSize: "1rem", padding: "4px 7px" }}>
                    Change Password
                  </button>
                </>
              )}
              <br />

              <button onClick={toggleShowSettings} style={{ backgroundColor: "rgb(237,201,136)", color: "rgb(19,39,67)", borderRadius: "15px", marginBottom: "30px", marginTop: "20px", fontSize: "1rem", padding: "4px 7px" }}>
                Back
              </button>
            </>
          )}
        </>
      ) : (
        <>
          {accountCreate ? (
            <>
              <h5>Create Account</h5>
              <form onSubmit={handleCreateUser}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} style={{ backgroundColor: "rgb(248,239,212)", marginRight: "5px", border: "1.5px solid rgb(215,56,94)", borderRadius: "5px" }} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} style={{ backgroundColor: "rgb(248,239,212)", marginLeft: "5px", border: "1.5px solid rgb(215,56,94)", borderRadius: "5px" }} />
                <p>{props.loginMessage}</p>
                <input type="submit" value="Create Account" style={{ backgroundColor: "rgb(237,201,136)", color: "rgb(19,39,67)", borderRadius: "15px", marginBottom: "10px", fontSize: "1rem", padding: "4px 7px" }} />
              </form>
              <button onClick={() => setAccountCreate(!accountCreate)} style={{ backgroundColor: "rgb(237,201,136)", color: "rgb(19,39,67)", borderRadius: "15px", marginBottom: "30px", fontSize: "1rem", padding: "4px 7px" }}>
                I have an Account
              </button>
            </>
          ) : (
            <>
              <h5>Login</h5>
              <form onSubmit={handleLogin}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} style={{ backgroundColor: "rgb(248,239,212)", marginRight: "5px", border: "1.5px solid rgb(215,56,94)", borderRadius: "5px" }} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} style={{ backgroundColor: "rgb(248,239,212)", marginLeft: "5px", border: "1.5px solid rgb(215,56,94)", borderRadius: "5px" }} />
                <p>{props.loginMessage}</p>
                <input type="submit" value="Login" style={{ backgroundColor: "rgb(237,201,136)", color: "rgb(19,39,67)", borderRadius: "15px", marginBottom: "10px", fontSize: "1rem", padding: "4px 7px" }} />
              </form>
              <button onClick={() => setAccountCreate(!accountCreate)} style={{ backgroundColor: "rgb(237,201,136)", color: "rgb(19,39,67)", borderRadius: "15px", marginBottom: "30px", marginTop: "20px", fontSize: "1rem", padding: "4px 7px" }}>
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
