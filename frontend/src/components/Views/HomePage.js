import React, { useEffect, useState}from "react"
import { createUseStyles } from "react-jss"
import cn from "classnames"
import { useRootState } from "@/App.js"
import { request } from "@/request.js"
import ClickAway from "@/components/Utils/ClickAway"
import { useCookies } from "react-cookie"
import AddNewRecord from "@/components/Views/AddNewRecord"
import ViewRecord from "@/components/Views/ViewRecord"
import VirusInfo from "./VirusInfo"
import Clustering from "./Clustering"

// import ReactTable from "react-table";
// import "react-table/react-table.css"

const useHomePageStyle = createUseStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "1.25fr 6fr",
    gridTemplateRows: "1fr 8fr",
    padding: "30px 20px 20px 20px",
  },
  menuPanel: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    paddingTop: 20,
  },
  searchResult: {
    "& > div": {
      marginBottom: 10,
    },
  },
  inputBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "3px 10px 3px 10px",
    border: "1px solid gray",
    borderRadius: 15,
    height: 30,
    width: 200,
    marginBottom: 20,
  },
  input: {
    border: "0px none",
    outline: "none",
    "& :focus": {
      outline: "none",
    },
  },
  submitBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: "3px 10px 3px 10px",
    border: "1px solid gray",
    borderRadius: 15,
    height: 30,
    width: 100,
    marginBottom: 20,
    backgroundColor: "greenyellow",
    cursor: "pointer",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputs: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    gridTemplateRows: "1fr 1fr 1fr 1fr 1fr",
    rowGap: "1em",
    width: "100%",
    marginBottom: 10,
    "& div": {
      marginRight: 15,
      fontSize: 30,
    },
  },

  menuOptions: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
    height: "1.5em",
    cursor: "pointer",
  },
  sectionTitle: {
    fontSize: 45,
    width: "100%",
    borderBottom: "1px solid grey",
    marginBottom: "10px",
  },
  addNew: {
    boxShadow: "1px 2px",
    border: "1px solid grey",
    borderRadius: "20px",
  },
  menuBtn: {
    fontSize: 25,
    cursor: "pointer",
    marginRight: 5,
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    cursor: "pointer",
  },

  account: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    position: "relative",
    alignItems: "center",
  },
  username: {
    cursor: "pointer",
    textDecoration: " underline",
  },
  accountOption: {
    position: "absolute",
    top: 0,
    right: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    boxShadow: "1px 2px",
    border: "1px solid grey",
    backgroundColor: "lightgrey",
    width: 200,
    height: 50,
    borderRadius: 5,
    padding: 5,
    "& > *:not(:first-child)": {
      marginTop: 10,
    },
    "& div": {
      cursor: "pointer",
      textDecoration: " underline",
    },
  },
  searchBtn: {
    fontSize: 20,
    cursor: "pointer",
  },
  unselected: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 50,
  },
})

const useInputFormStyle = createUseStyles({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingLeft: 30,
  },
  selectionTitle: {
    width: "100%",
    fontSize: 40,
    borderBottom: "1px solid black",
    fontWeight: 500,
    marginBottom: 10,
  },
  selectionField: {
    display: "flex",
  },
  selectionLabel: {
    fontSize: 20,
  },
})

const InputForm = () => {
  const classes = useInputFormStyle()
  return (
    <div className={classes.root}>
      <div className={classes.selectionTitle}>Patient Information</div>
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>Patient Name:</div>
      </div>
    </div>
  )
}
const ViewTable = () => {
  return (
    <div><h1>Table for Records</h1></div>
  );
}
const HomePage = () => {
  const classes = useHomePageStyle()
  const [currentDisplay, setCurrentDisplay] = useState("")
  const [{ username }, dispatch] = useRootState()
  const [modal, setModal] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"])

  useEffect(() => {
    ;(async () => {
      const result = await request("getUserInfo")
      if (result.status === "Success") {
        const username = result.username
        const name = result.first + " " + result.last
        dispatch({ type: "SET_USER", username, name })
        // console.log(result)
      }
    })()
  }, [])

  const addNewRecord = () => {
    setCurrentDisplay("addNewRecord")
  }

  const viewRecord = () => {
    setCurrentDisplay("viewRecord")
  }
  const onClick = (state) => {
    setModal(!state)
  }

  const logout = async () => {
    const result = await request("signout")
    if (result.status === "Success") {
      removeCookie("token")
      window.location.reload()
    }
  }
  return (
    <div className={classes.root}>
      <div className={classes.flex}>
        <span className={classes.title} onClick={() => setCurrentDisplay("")}>HotZone</span>
      </div>
      <div className={classes.account}>
        {modal && (
          <ClickAway onClick={onClick}>
            <div className={classes.accountOption}>
              {/* <div>Change Password</div> */}
              <div onClick={logout}>Logout</div>
            </div>
          </ClickAway>
        )}
        <div className={classes.username} onClick={() => setModal(true)}>
          {username}
        </div>
      </div>
      <div className={classes.menuPanel}>
        <div
          onClick={addNewRecord} value="add"
          className={cn(classes.addNew, classes.menuOptions)}
        >
          New record
        </div>
        <div
          className={cn(classes.addNew, classes.menuOptions)}
          onClick={() => setCurrentDisplay("viewRecord")}
        >
          View Records
        </div>
        <div className={cn(classes.addNew, classes.menuOptions)} onClick={() => setCurrentDisplay("virusInfo")}>
          Virus Info
        </div>
        <div className={cn(classes.addNew, classes.menuOptions)} onClick={() => setCurrentDisplay("clustering")}>
          Clustering
        </div>
      </div>
      {currentDisplay === "" && (
        <div className={classes.unselected}>
          Please choose from the left options
        </div>
      )}
      {currentDisplay === "addNewRecord" && <AddNewRecord />}
      {currentDisplay === "viewRecord" && <ViewRecord />}
      {currentDisplay === "virusInfo" && <VirusInfo />}
      {currentDisplay === "clustering" && <Clustering />}
    </div>
  )
}

export default HomePage
