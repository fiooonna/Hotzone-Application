import React, { useEffect, useState, useMemo } from "react"
import { createUseStyles } from "react-jss"
import cn from "classnames"
import { useRootState } from "@/App.js"
import { request } from "@/request.js"
import ClickAway from "@/components/Utils/ClickAway"

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
  bigTitle: {
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
})

const VirusInfo = (props) => {
  const classes = tableStyle()
  const [vname, setVname] = useState("")
  const [disease, setDisease] = useState("")
  const [maxp, setMaxp] = useState("")
  const [data, setData] = useState([])

  const vinfo = async () => {
    if (!maxp || !vname || !disease) {
      alert("Missing some fields")
    } else if (isNaN(maxp)) {
      alert("Max inflectious period should be a number")
    } else {
      await request("addVinfo", {
        vname: vname,
        disease: disease,
        maxp: maxp,
      })
      setVname("")
      setDisease("")
      setMaxp("")
      window.alert("You have successfully input the virus info.")
    }
  }

  const COLUMNS = [
    {
      Header: "Virus Name",
      accessor: "virus_name",
    },
    {
      Header: "Disease",
      accessor: "common_name",
    },
    {
      Header: "Max. Infectious Period (days)",
      accessor: "max_infect_period",
    },
  ]
  const columns = useMemo(() => COLUMNS, [])

  useEffect(() => {
    ;(async () => {
      const result = await request("getAllVirus", [])
      setData(result)
    })()
  }, [vname])

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
      <div className={classes.bigTitle}>Virus Info Page</div>
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>Virus Name: </div>
        <input value={vname} onChange={(e) => setVname(e.target.value)} />
      </div>
      <br />
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>Disease: </div>
        <input value={disease} onChange={(e) => setDisease(e.target.value)} />
      </div>
      <br />
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>Max. Infectious Period:</div>
        <input value={maxp} onChange={(e) => setMaxp(e.target.value)} />
      </div>
      <br />
      <div className={classes.submitBtn} onClick={vinfo}>
        Submit
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

export default VirusInfo
