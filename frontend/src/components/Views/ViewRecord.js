import React, { useEffect, useState, useMemo } from "react"
import { createUseStyles } from "react-jss"
import cn from "classnames"
import { useRootState } from "@/App.js"
import { request } from "@/request.js"
import ClickAway from "@/components/Utils/ClickAway"

import { useTable } from 'react-table'
import '../../table.css'
import MOCK_DATA from '../../MOCK_DATA.json'

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
  // selectionField: {
  //   display: "flex",
  // },
  // selectionLabel: {
  //   fontSize: 20,
  // },
  // nextPage: {
  //   cursor: "pointer",
  //   textDecoration: " underline",
  //   position: "absolute",
  //   bottom: 0,
  //   right: 20,
  // },

})
const ViewRecord = (props) => {
  const classes = tableStyle()
  const COLUMNS = [
    {
      Header: 'CaseId',
      accessor:'case_Id'
    },
    {
      Header:'Patient Name',
      accessor:'patient_name'
    },
    {
      Header:'Virus Name',
      accessor:'virus_name'
    },
    {
      Header:'Date Confirmed',
      accessor:'date_confirmed'
    },
    {
      Header:'URL'
    },
  ]
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])
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
      <div>
        <div className={classes.bigTitle}>View Record</div>
      </div>
      <table>
        <thead>
          {/* <tr>
            <th>CaseID</th>
            <th>PatientName</th>
            <th>Virus</th>
            <th>Date Confirmed</th>
            <th>URL for more details</th>
          </tr> */}
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
          {/* <tr>
            <td>dummy_ID</td>
            <td>Dummy Chan</td>
            <td>CoVID-19</td>
            <td>dd-mm-yyyy</td>
            <td><a href="https://www.gooogle.com">URL</a></td>
          </tr> */}
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
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
    </div>

  )
}

export default ViewRecord