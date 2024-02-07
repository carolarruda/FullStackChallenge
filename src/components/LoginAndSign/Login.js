/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../client/App";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import classes from "./Sign.module.css";

const Login = ({ setClients, clients, register }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useContext(Context);
  const [status, setStatus] = useState("");
  const [failed, setFailed] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [red, setRed] = useState("");
  const [redTwo, setRedTwo] = useState("");
  const [shake, setShake] = useState("");
  const [shakeTwo, setShakeTwo] = useState("");
  const [active, setActive] = useState(true);

  const sk = "shake 0.2s ease-in-out 0s 2";

  const navigate = useNavigate();

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="http://localhost:3000/">
          ZuperTech
        </Link>{" "}
        {new Date().getFullYear()}
      </Typography>
    );
  }

  useEffect(() => {
    setLoggedIn(false);
    localStorage.clear();
    if (register) {
      setActive(false);
    }
  }, [setLoggedIn, register]);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    setActive(false);
    navigate(`/register`);
  };
  const handleLogin = () => {
    setActive(true);
    navigate(`/`);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };


    async function loginUser() {
      try {
        if(register){
          const registerResponse = await fetch(
            "http://localhost:4000/register",
            opts
          );
          const data = await registerResponse.json();
          setStatus(registerResponse.status);
          if (registerResponse.status === 201) {
            console.log("success");
          }
        }
        const loginResponse = await fetch("http://localhost:4000/login", opts);
        const data = await loginResponse.json();
        setStatus(loginResponse.status);

        if (loginResponse.status === 200) {
          setLoggedIn(true);
          localStorage.setItem("token", data.data.token);

          localStorage.setItem("userId", data.data.userId);
          localStorage.setItem("username", data.data.username);
          const clientsResponse = await fetch(`http://localhost:4000/clients`);
          const clientsData = await clientsResponse.json();
          const productsResponse = await fetch(`http://localhost:4000/products`);
          const productsData = await productsResponse.json();
          console.log(clientsData.clients);
          setClients(clientsData.clients)
          navigate(`/home`);
        } else if (loginResponse.status === 404) {
          setFailed(true);
          setRed("red");
          setRedTwo("red");
          setShake(sk);
          setShakeTwo(sk);
          console.log("Please use register to create a new user");
        } else if (loginResponse.status === 401) {
          setWrong(true);
          setFailed(false);
          setRedTwo("red");
          setRed("red");
          setShakeTwo(sk);
          setShake(sk);
        }
      } catch (error) {
        console.error("Error occurred during login: ", error);
      }
    }

    loginUser();
  };

  return (
    <div className={classes.background}>
      <div className={classes.formContainer}>
        <h1 className={classes.titleForm}>
        <button
            onClick={handleLogin}
            className={active ? `${classes.active}` : `${classes.inactive}`}
          >
            {" "}
            Login
          </button>{" "}
          |{" "}
          <button
            onClick={handleRegister}
            className={active ? `${classes.inactive}` : `${classes.active}`}
          >
            Signup
          </button>
        </h1>
        <div className={classes.register}>
        {!register ? (
            <p className={classes.undertext}>Login to access your account</p>
          ) : (
            <p className={classes.undertext}>
              Create your free account and start browsing
            </p>
          )}
        </div>

        <form
          className={`${classes.formy} ${classes.log}`}
          onSubmit={handleSubmit}
        >
          <input
            style={{
              color: `${red}`,
              animation: `${shake}`,
            }}
            type="text"
            id="username"
            placeholder={`Username`}
            required
            value={username}
            onChange={handleUsername}
          />

          <input
            style={{
              color: `${redTwo}`,
              animation: `${shakeTwo}`,
            }}
            type="password"
            id="password"
            placeholder="Password"
            required
            value={password}
            onChange={handlePassword}
          />
          {!failed && !wrong && <div></div>}
          {failed && (
            <div className={classes.error}>
              Invalid email and/or password provided
            </div>
          )}
            {!register ? (
            <button className={classes.logBut} type="submit">
              LOGIN
            </button>
          ) : (
            <button className={classes.logBut} type="submit">
              SIGNUP
            </button>
          )}
          <Copyright sx={{ mt: 5, color: "white" }} />
        </form>
      </div>
    </div>
  );
};

export default Login;
