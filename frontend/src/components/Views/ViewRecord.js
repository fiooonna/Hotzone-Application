import React, { useEffect, useState, useMemo } from "react"
import { createUseStyles } from "react-jss"
import cn from "classnames"
import { useRootState } from "@/App.js"
import { request } from "@/request.js"
import ClickAway from "@/components/Utils/ClickAway"

import { useTable } from 'react-table'
import '../../table.css'


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

const CaseDetail = (props) => {
  return (
    <div>Test</div>
  )
}
const ViewRecord = (props) => {
  const [data, setData] = useState([])
  const [selectCase, setSelectedCase] = useState(null)

  const classes = tableStyle()
  const COLUMNS = [
    {
      Header: 'CaseId',
      accessor:'case_no'
    },
    {
      Header:'Patient ID',
      accessor:'patient'
    },
    {
      Header:'virus ID',
      accessor:'virus'
    },
    {
      Header:'Date Confirmed',
      accessor:'date_confirmed'
    },
  ]
  const columns = useMemo(() => COLUMNS, [])

  useEffect(() => {
    (async() => {
      const result = await request('getAllCase',[])
      setData(result)
    })()
  },[])

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
  console.log(rows)

  const showDetails = async(row) => {
    console.log(row)
    const result = await request('getCaseById',{id:row.values.case_no})
    setSelectedCase(result)
    console.log(result)
  }
  return (
    <div className={classes.root}>
      <div>
        <div className={classes.bigTitle}>View Record</div>
      </div>
      {
        data.length > 0 && !selectCase &&
        <table>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))
              }
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} onClick={() => {showDetails(row)}} className={classes.row}>
                {
                  row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })
                }
              </tr>
            )
          })
          }
        </tbody>
      </table>
      }
      {
        selectCase &&
        <CaseDetail />
      }

    </div>

  )
}



export default ViewRecord
