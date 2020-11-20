import React, { useEffect, useState } from "react"
import { createUseStyles } from "react-jss"
import cn from "classnames"
import { useRootState } from "@/App.js"
import { request } from "@/request.js"
import ClickAway from "@/components/Utils/ClickAway"
import LineInput from "@/components/Utils/LineInput.js"
import DateInput from "@/components/Utils/DateInput.js"
import LocImpInput from "@/components/Utils/LocalImportInput.js"
import SearchInput from "@/components/Utils/SearchInput.js"

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
  selectionInputField:{
    width: "400px",
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  nextPage: {
    cursor: "pointer",
    textDecoration: " underline",
    position: "absolute",
    bottom: 0,
    right: 20,
  },
  input: {
    width: "50%",
    background: "grey",
    border: "0px none",
    outline: "none",
    "& :focus": {
      outline: "none",
    },
    lineHeight: "28px",
  },

})

const AddPatientInfo = (props) => {
  const [page, setPage] = useState(0)
  const classes = useInputFormStyle()
  const [patientName, setPatientName] = useState("")
  const [patientID, setIDNumber] = useState("")
  const [patientDOB, setPatientDOB] = useState("")
  const [dateConfirmed, setDateConfirmed] = useState("")
  const [localImported, setLocalImported] = useState("")
  const [virusName, setVirusName] = useState("")

  return (
    <div className={classes.root}>
      <div className={classes.selectionTitle}>Patient Information</div>
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>Patient Name:</div>
        <div className={classes.selectionInputField}>
          <LineInput onChange={e => setPatientName(e.target.value)} />
        </div>
      </div>
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>Patient ID Document Number:</div>
        <div className={classes.selectionInputField}>
          <LineInput onChange={e => setIDNumber(e.target.value)} />
          </div>
      </div>
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>Date of Birth:</div>
        <div className={classes.selectionInputField}>
          <DateInput onChange={e => setPatientDOB(e.target.value)} />
        </div>
      </div>
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>Date Confirmed:</div>
        <div className={classes.selectionInputField}>
          <DateInput onChange={e => setDateConfirmed(e.target.value)} />
        </div>
      </div>
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>Local/Imported:</div>
        <div className={classes.selectionInputField}>
          <LocImpInput onChange={e => setLocalImported(e.target.value)} />
        </div>
      </div>

      <div className={classes.selectionTitle}>Virus Information</div>

      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>Virus Name:</div>
        <div className={classes.selectionInputField}>
          <SearchInput onChange={e => setVirusName(e.target.value)} />
        </div>
      </div>

      <div className={classes.nextPage} onClick={() => props.onPageChange(1)}>
        Next Page
      </div>
    </div>
  )
}

export default AddPatientInfo