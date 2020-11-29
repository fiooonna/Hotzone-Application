import React, { useEffect, useState, useMemo } from "react"
import { createUseStyles } from "react-jss"
import cn from "classnames"
import { useRootState } from "@/App.js"
import { request } from "@/request.js"
import ClickAway from "@/components/Utils/ClickAway"
import LineInput from "@/components/Utils/LineInput.js"
import DateInput from "@/components/Utils/DateInput.js"
import LocImpInput from "@/components/Utils/LocalImportInput.js"
import SearchInput from "@/components/Utils/SearchInput.js"
import SubmitButton from "@/components/Utils/SubmitButton.js"

import { useTable } from "react-table"
import "../../table_virus.css"

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
  selectionInputField: {
    width: "400px",
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  selectionInputIDField:{
    width: "160px",
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  nextPage: {
    marginTop: 20,
    width: 120,
    height: 40,
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 15,
    borderRadius: 5,
    position: "absolute",
    right: 15,
    border: "1px solid black",
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
  autofillBtn:{
    marginTop: 20,
    height: 20,
    color: "black",
    backgroundColor: "lightgrey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontSize: 13,
    border: "1px solid black",
    borderRadius: 3,
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  autofillBtnContainer:{

  },
  submitBtn: {
    marginTop: 20,
    width: "10%",
    height: 40,
    color: "white",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 20,
  },
  btnContainer: {
    position: "relative",
  },
})

const AddPatientInfo = (props) => {
  const classes = useInputFormStyle()
  const [patientName, setPatientName] = useState(
    props.patient ? props.patient.patientName : ""
  )
  const [patientID, setIDNumber] = useState(
    props.patient ? props.patient.patientID : ""
  )
  const [patientDOB, setPatientDOB] = useState(
    props.patient ? props.patient.patientDOB : ""
  )
  const [dateConfirmed, setDateConfirmed] = useState(
    props.patient ? props.patient.dateConfirmed : ""
  )
  const [localImported, setLocalImported] = useState(
    props.patient ? props.patient.localImported : "Local"
  )
  const [virusName, setVirusName] = useState(
    props.patient ? props.patient.virusName : ""
  )

  // console.log(props.virusList)
  const pinfo = async () => {
    if (
      patientName === "" ||
      patientID === "" ||
      patientDOB === "" ||
      dateConfirmed === "" ||
      localImported === "" ||
      virusName === ""
    ) {
      alert("Missing some field")
      return
    }
    await request("addPatientinfo", {
      patientName: patientName,
      patientID: patientID,
      patientDOB: patientDOB,
      dateConfirmed: dateConfirmed,
      localImported: localImported,
      virusName: virusName,
    })
    setPatientName("")
    setIDNumber("")
    setPatientDOB("")
    setDateConfirmed("")
    setLocalImported("")
    setVirusName("")
    window.alert("You have successfully input the patient and virus info.")
  }
  const autofill= async () => {
    if (patientID!==''){
      var count=0
      const info=await request("getPatientInfo", [])
      for (var i=0;i<info.length;i++){
        if (info[i].hkid==patientID){
          setPatientName(info[i].patient_name)
          setPatientDOB(info[i].birth_date)
          count=1
        }
      }
      if (count==0){
        alert("No matching record")
      }
    }

  }
  const nextPage = () => {
    if (
      patientName === "" ||
      patientID === "" ||
      patientDOB === "" ||
      dateConfirmed === "" ||
      localImported === "" ||
      virusName === ""
    ) {
      alert("Missing some field")
      return
    }
    const patient = {
      patientName: patientName,
      patientID: patientID,
      patientDOB: patientDOB,
      virusName: virusName,
      dateConfirmed: dateConfirmed,
      localImported: localImported,
    }
    props.onPageChange(1, patient, null)
  }

  useEffect(() => {
    if (props.virusList.lengh <= 0) {
      alert("Please add virus first")
      window.location.reload()
    }
  }, [])
  return (
    <div className={classes.root}>
      <div className={classes.selectionTitle}>Patient Information</div>

      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>
          Patient ID Document Number:
        </div>
        <div className={classes.selectionInputIDField}>
          <input
            value={patientID}
            onChange={(e) => setIDNumber(e.target.value)}
          />
        </div>
        <div className={classes.autofillBtnContainer}>
        <div className={classes.autofillBtn} onClick={autofill}>
          Autofill existing patient info
        </div>
        </div>
      </div>
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>Patient Name:</div>
        <div className={classes.selectionInputField}>
          <input
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
        </div>
      </div>
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>Date of Birth:</div>
        <div className={classes.selectionInputField}>
          <DateInput
            value={patientDOB}
            onChange={(e) => setPatientDOB(e.target.value)}
          />
        </div>
      </div>
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>Date Confirmed:</div>
        <div className={classes.selectionInputField}>
          <DateInput
            value={dateConfirmed}
            onChange={(e) => setDateConfirmed(e.target.value)}
          />
        </div>
      </div>
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>Local/Imported:</div>
        <div className={classes.selectionInputField}>
          <LocImpInput
            value={localImported}
            onChange={(e) => setLocalImported(e.target.value)}
          />
        </div>
      </div>

      <div className={classes.selectionTitle}>Virus Information</div>

      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>Virus Name:</div>
        <div className={classes.selectionInputField}>
          <select
            className="category"
            value={virusName}
            onChange={(e) => setVirusName(e.target.value)}
          >
            <option value="" disabled selected hidden>
              Please Choose...
            </option>
            {props.virusList.length > 0 &&
              props.virusList.map((virus, i) => (
                <option key={i} value={virus.virus_name}>
                  {virus.virus_name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className={classes.selectionField}></div>

      <div className={classes.btnContainer}>
        <div className={classes.nextPage} onClick={nextPage}>
          Next Page
        </div>
      </div>
    </div>
  )
}

export default AddPatientInfo
