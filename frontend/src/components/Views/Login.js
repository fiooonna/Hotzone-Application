import React, { useEffect, useState } from "react"
import { createUseStyles } from "react-jss"
import cn from "classnames"
import LineInput from "@/components/Utils/LineInput.js"
import { request } from "@/request.js"



const useLoginStlye = createUseStyles({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
  },
  loginBox: {
    width: 500,
    padding: "30px 10px 30px 10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid black",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 10,
    width: "100%",
  },
  loginBtn: {
    marginTop: 20,
    width: "60%",
    height:50,
    color:"white",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 25,
  },
})



const Login = (props) => {
  const classes = useLoginStlye()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  const login = async () => {
    if(username !== "" && password !== ""){
      const result = await request("signin",{username: username, password: password})
      if(result.status === "Success"){
        props.onLoginSuccess(result.token)
      }
      else{
        alert("Please enter correct information.")
      }
    }

  }
  return (
    <div className={classes.root}>
      <div className={classes.title}>Hotzone</div>
      <div className={classes.loginBox}>
        <div className={classes.column}>
          <div>Username</div>
          <LineInput onChange={e => setUsername(e.target.value)} />
        </div>
        <div className={classes.column}>
          <div>Password</div>
          <LineInput onChange={e => setPassword(e.target.value)} type="password"/>
        </div>
        <div className={classes.loginBtn} onClick={login}>Login</div>
      </div>
    </div>
  )
}

export default Login
