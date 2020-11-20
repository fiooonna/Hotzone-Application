import React, { useEffect, useState } from "react"
import { createUseStyles } from "react-jss"
import cn from "classnames"
import { useRootState } from "@/App.js"
import { request } from "@/request.js"
import ClickAway from "@/components/Utils/ClickAway"



const useInputFormStyle = createUseStyles({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingLeft: 30,
    position: "relative",
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
  nextPage: {
    cursor: "pointer",
    textDecoration: " underline",
    position: "absolute",
    bottom: 0,
    right: 20,
  },

})



const AddPatientInfo = (props) => {
  const [page, setPage] = useState(0)
  const classes = useInputFormStyle()
  return (
    <div className={classes.root}>
      <div className={classes.selectionTitle}>Patient Information</div>
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>Patient Name:</div>
      </div>
      <div className={classes.nextPage} onClick={() => props.onPageChange(1)}>
        Next Page
      </div>
    </div>
  )
}

export default AddPatientInfo