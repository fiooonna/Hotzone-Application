import React, { useEffect, useState, useMemo } from "react"
import { createUseStyles } from "react-jss"
import cn from "classnames"
import { useRootState } from "@/App.js"
import { request } from "@/request.js"
import ClickAway from "@/components/Utils/ClickAway"

import { useTable } from "react-table"
import "../../table.css"

const tableStyle = createUseStyles({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingLeft: 30,
    position: "relative",
  },
  bigTitle: {
    width: "100%",
    fontSize: 40,
    borderBottom: "1px solid black",
    fontWeight: 500,
    marginBottom: 10,
  },
  row: {
    cursor: "pointer",
  },
})

const useCaseDetailStyle = createUseStyles({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  backBtn: {
    position: "absoulte",
    top: 10,
    left: 0,
    height: 30,
    width: 60,
    borderRadius: 6,
    border: "1px solid black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    marginBottom: 20,
  },
  row: {
    marginBottom: 20,
  },
})
const CaseDetail = (props) => {
  const classes = useCaseDetailStyle()
  const info = props.case
  const [data, setData] = useState([])
  const COLUMNS = [
    {
      Header: "Date From",
      accessor: "date_from",
    },
    {
      Header: "Date To",
      accessor: "date_to",
    },
    {
      Header: "Name of Location",
      accessor: "location_name",
    },
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Header: "Category",
      accessor: "category",
    },
  ]

  const columns = useMemo(() => COLUMNS, [])

  useEffect(() => {
    for (let i = 0; i < info.locations.length; i++) {
      const entry = { ...info.locations[i], ...info.visited[i] }
      setData((data) => data.concat(entry))
    }
  },[])
  // console.log(data)
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
      <div className={classes.backBtn} onClick={props.onBack}>
        Back
      </div>
      <div className={classes.container}>
        <div className={classes.row}>Case ID: {info.case.case_no}</div>
        <div></div>
        <div className={classes.row}>
          Patient Name: {info.patient.patient_name}
        </div>
        <div className={classes.row}>
          Confirmed Date: {info.case.date_confirmed}
        </div>
        <div className={classes.row}>ID number: {info.patient.hkid}</div>
        <div className={classes.row}>
          Local/Imported: {info.case.local_or_imported}
        </div>
        <div className={classes.row}>Virus Name: {info.virus.common_name}</div>
        <div className={classes.row}>Date of birth: {info.patient.birth_date}</div>
      </div>

      {info.locations.length > 0 && (
        <>
          <div className={classes.row}>Location visited:</div>
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
        </>
      )}
    </div>
  )
}
const ViewRecord = (props) => {
  const [data, setData] = useState([])
  const [selectCase, setSelectedCase] = useState(null)

  const classes = tableStyle()
  const COLUMNS = [
    {
      Header: "CaseId",
      accessor: "case_no",
    },
    {
      Header: "Patient",
      accessor: "patient_name",
    },
    {
      Header: "Virus",
      accessor: "virus_name",
    },
    {
      Header: "Date Confirmed",
      accessor: "date_confirmed",
    },
  ]
  const columns = useMemo(() => COLUMNS, [])

  useEffect(() => {
    ;(async () => {
      const result = await request("getAllCase", [])
      setData(result)
    })()
  }, [])
  // console.log(JSON.stringify(request('viewDetail')))
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
  // console.log(rows)

  const showDetails = async (row) => {
    const result = await request("getCaseById", { id: row.values.case_no })
    setSelectedCase(result)
  }
  return (
    <div className={classes.root}>
      <div>
        <div className={classes.bigTitle}>View Record</div>
      </div>
      {data.length > 0 && !selectCase && (
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
                <tr
                  {...row.getRowProps()}
                  onClick={() => {
                    showDetails(row)
                  }}
                  className={classes.row}
                >
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
      {
        data.length === 0 && !selectCase &&
        <div>There is no record</div>
      }
      {selectCase && (
        <CaseDetail case={selectCase} onBack={() => setSelectedCase(null)} />
      )}
    </div>
  )
}

export default ViewRecord
