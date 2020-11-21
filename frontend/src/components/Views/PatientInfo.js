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

const tableStyle = createUseStyles({
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
/*
const AddPatientInfo = (props) => {
  const [page, setPage] = useState(0)
  const classes = useInputFormStyle()
  const [patientName, setPatientName] = useState("")
  const [patientID, setIDNumber] = useState("")
  const [patientDOB, setPatientDOB] = useState("")
  const [dateConfirmed, setDateConfirmed] = useState("")
  const [localImported, setLocalImported] = useState("")
  const [virusName, setVirusName] = useState("")

  const pinfo = async () => {
    if (!patientName || !patientID || !patientDOB || !dateConfirmed || !localImported || !virusName) {
      alert("Missing some fields")
    } else {
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
  }

  const nextPage = () => {
    const patient = {
      patient_name: patientName,
      hkid: patientID,
      birth_date: patientDOB,
      virus_name: virusName,
      date_confirmed: dateConfirmed,
      local_or_imported: localImported
    }
    props.onPageChange(1,patient)
  }
  return (
    <div className={classes.root}>
      <form>
        <div className={classes.selectionTitle}>Patient Information</div>
        <div className={classes.selectionField}>
          <div className={classes.selectionLabel}>Patient Name:</div>
          <div className={classes.selectionInputField}>
            <LineInput onChange={(e) => setPatientName(e.target.value)} />
          </div>
        </div>
        <div className={classes.selectionField}>
          <div className={classes.selectionLabel}>
            Patient ID Document Number:
          </div>
          <div className={classes.selectionInputField}>
            <LineInput onChange={(e) => setIDNumber(e.target.value)} />
          </div>
        </div>
        <div className={classes.selectionField}>
          <div className={classes.selectionLabel}>Date of Birth:</div>
          <div className={classes.selectionInputField}>
            <DateInput onChange={(e) => setPatientDOB(e.target.value)} />
          </div>
        </div>
        <div className={classes.selectionField}>
          <div className={classes.selectionLabel}>Date Confirmed:</div>
          <div className={classes.selectionInputField}>
            <DateInput onChange={(e) => setDateConfirmed(e.target.value)} />
          </div>
        </div>
        <div className={classes.selectionField}>
          <div className={classes.selectionLabel}>Local/Imported:</div>
          <div className={classes.selectionInputField}>
            <LocImpInput onChange={(e) => setLocalImported(e.target.value)} />
          </div>
        </div>

        <div className={classes.selectionTitle}>Virus Information</div>

        <div className={classes.selectionField}>
          <div className={classes.selectionLabel}>Virus Name:</div>
          <div className={classes.selectionInputField}>
            <SearchInput onChange={(e) => setVirusName(e.target.value)} />
          </div>
        </div>

        <div className={classes.selectionField}>
          <div className={classes.selectionInputField}>
            <SubmitButton onClick={pinfo} onChange={(e) => setVirusName(e.target.value)} />
          </div>
        </div>

        <div className={classes.nextPage} onClick={nextPage}>
          Next Page
        </div>
      </form>
    </div>
  )
}

export default AddPatientInfo
*/

const AddPatientInfo = (props) => {
  const classes = tableStyle()
  const [data, setData] = useState([])
  const [patientName, setPatientName] = useState("")
  const [patientID, setIDNumber] = useState("")
  const [patientDOB, setPatientDOB] = useState("")
  const [dateConfirmed, setDateConfirmed] = useState("")
  const [localImported, setLocalImported] = useState("")
  const [virusName, setVirusName] = useState("")

  const pinfo = async () => {
    if (!patientName || !patientID || !patientDOB) {
      alert("Missing some fields")
    } else {
      await request("addPatientinfo", {
        patient_name: patientName,
        hkid: patientID,
        birth_date: patientDOB,
        virus_name: virusName,
        date_confirmed: dateConfirmed,
        local_or_imported: localImported
      })
      setPatientName("")
      setIDNumber("")
      setPatientDOB("")
      setDateConfirmed("")
      setLocalImported("")
      setVirusName("")
      window.alert("You have successfully input the virus info.")
    }
  }

  const nextPage = () => {
    const patient = {
      patient_name: patientName,
      hkid: patientID,
      birth_date: patientDOB,
      virus_name: virusName,
      date_confirmed: dateConfirmed,
      local_or_imported: localImported
    }
    props.onPageChange(1,patient)
  }

  const COLUMNS = [
    {
      Header: "Patient Name",
      accessor: "patient_name",
    },
    {
      Header: "Patient HKID",
      accessor: "hkid",
    },
    {
      Header: "Patient DOB",
      accessor: "birth_date",
    },
  ]
  const columns = useMemo(() => COLUMNS, [])

  useEffect(() => {
    ;(async () => {
      const result = await request("getPatientInfo", [])
      setData(result)
    })()
  }, [patientName])

  const tableInstance = useTable({
    columns,
    data,
  })
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <div className={classes.root}>
      <div className={classes.selectionTitle}>Patient Information</div>
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>Patient Name:</div>
        <input value={patientName} onChange={(e) => setPatientName(e.target.value)} />
      </div>
      <br />
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>Patient ID Document Number: </div>
        <input value={patientID} onChange={(e) => setIDNumber(e.target.value)} />
      </div>
      <br />
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>Date of Birth:</div>
        <input value={patientDOB} type='date' onChange={(e) => setPatientDOB(e.target.value)} />
      </div>
      <br />
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>Date Confirmed:</div>
        <input value={dateConfirmed} type='date' onChange={(e) => setDateConfirmed(e.target.value)} />
      </div>
      <br />
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>Local/Imported:</div>
        <select value={localImported} required onChange={(e) => setLocalImported(e.target.value)}>
          <option value="local">Local</option>
          <option value="import">Imported</option>
        </select>
      </div>
      <br />
      <div className={classes.selectionTitle}>Virus Information</div>
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>Virus Name:</div>
        <input type="search" value={virusName} onChange={(e) => setVirusName(e.target.value)} />
      </div>
      <br />
      <div className={classes.submitBtn} onClick={pinfo}>
        Submit
      </div>
      <div className={classes.nextPage} onClick={nextPage}>
          Next Page
        </div>

      <br />
      <br />
      <br />

      {data.length > 0 && (
        <table>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AddPatientInfo
