import React, { useEffect, useState } from "react"
import { createUseStyles } from "react-jss"
import cn from "classnames"

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
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
  },

  username: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
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
  }

})

const InputForm = () => {
  const classes = useInputFormStyle()
  return (
    <div className={classes.root}>
      <div className={classes.selectionTitle}>Patient asdnformation</div>
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>
          Patient Name:
        </div>
        
      </div>
    </div>
  )
}
const HomePage = () => {
  const classes = useHomePageStyle()
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    console.log(selected)
  },[selected])
  const addNewRecord = () => {
    console.log("hi")
    setSelected(true)
  }
  return (
    <div className={classes.root}>
      <div className={classes.flex}>
        <i className={cn("fa fa-bars",classes.menuBtn)}></i>
        <span className={classes.title}>HotZone</span>
      </div>
      <div className={classes.username}>
        <div>YourUsername</div>
      </div>
      <div className={classes.menuPanel}>
        <div
          onClick={addNewRecord}
          className={cn(classes.addNew,classes.menuOptions)}
        >
          New record
        </div>
        <div
          className={cn(classes.addNew,classes.menuOptions)}
        >
          View Records
        </div>
        <div
          className={cn(classes.addNew,classes.menuOptions)}
        >
          Analysis
        </div>
      </div>
      {
        selected?
        <InputForm/>
        :
        <div className={classes.unselected}>
        Please choose from the left options
        </div>
      }
      {

      }
    </div>
  )
}

export default HomePage
