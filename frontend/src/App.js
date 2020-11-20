import { createUseStyles } from "react-jss"
import HomePage from "@/components/Views/HomePage"
import Login from "@/components/Views/Login"
import React, { useEffect, useState, useReducer, createContext, useContext } from "react"
import { useCookies } from "react-cookie"
import _ from "lodash"


const RootStateContext = createContext({})

const reducer = (state, action) => {
  if (action.type === "SET_USER") {
    const update = _.pick(action, ["username", "name"])
    return { ...state, ...update }
  } else {
    return state
  }
}

const initialState = { username:"", name: ""}

function App() {
  const [logined, setLogined] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"])
  const [state, dispatch] = useReducer(reducer, initialState)

  const onLoginSuccess = (token) => {
    setLogined(true)
    setCookie("token", token)
  }

  useEffect(() => {
    if (cookies.token) {
      setLogined(true)
    }
  }, [])

  return (
    <>
      <RootStateContext.Provider value={[state, dispatch]} >
        <div>
          {logined ? (
            <HomePage />
          ) : (
            <Login onLoginSuccess={(token) => onLoginSuccess(token)} />
          )}
        </div>
      </RootStateContext.Provider>
    </>
  )
}
export const useRootState = () => {
  const obj = useContext(RootStateContext)
  return obj
}
export default App
