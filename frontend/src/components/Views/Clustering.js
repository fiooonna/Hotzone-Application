import React, { useEffect, useState, useMemo } from "react"
import { createUseStyles } from "react-jss"
import cn from "classnames"
import { useRootState } from "@/App.js"
import { request } from "@/request.js"
import ClickAway from "@/components/Utils/ClickAway"
import { useCookies } from "react-cookie"
import { useTable } from "react-table"

const settingStyle = createUseStyles({
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

const mainStyle = createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    padding: "30px 20px 20px 20px",
  },
  setting: {
    width: "10%",
    height: 40,
    color: "white",
    backgroundColor: "grey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 20,
    cursor: "pointer",
    position: "absolute",
    right: 20,
    top: "30px",
  },
  bigTitle: {
    fontSize: 40,
    fontWeight: 500,
    marginBottom: 10,
    marginRight: 30,
  },
  top: {
    width: "100%",
    borderBottom: "1px solid black",
    display: "flex",
    alignItems: "center",
  },
  option: {
    width: 50,
    height: "40px",
  },
})

const Clustering = (props) => {
  // const classes = clusteringStyle()
  const [cookies, setCookie] = useCookies(["cookie-name"])
  const [currentDisplay, setCurrentDispaly] = useState("data")
  const [clusters, setClusters] = useState(new Array(0))
  const [Dvalue, setDvalue] = useState(cookies.D || 200)
  const [Tvalue, setTvalue] = useState(cookies.T || 3)
  const [Cvalue, setCvalue] = useState(cookies.C || 2)
  const [clusterNo, setClusterNo] = useState(0)

  const data = clusters.length > 0 ? clusters[clusterNo] : []
  const classes = mainStyle()
  const onSettingSaved = (d, t, c) => {
    setDvalue(d)
    setTvalue(t)
    setCvalue(c)
    setCookie("D", d)
    setCookie("T", t)
    setCookie("C", c)
    alert("Setting saved")
    setCurrentDispaly("data")
  }

  useEffect(() => {
    ;(async () => {
      const result = await request("findCluster", {
        Dvalue: Dvalue,
        Tvalue: Tvalue,
        Cvalue: Cvalue,
      })
      if (result) {
        setClusters(result.clusters)
      }
      console.log(result)
    })()
  }, [Dvalue, Tvalue, Cvalue])

  const COLUMNS = [
    {
      Header: "Location Name",
      accessor: "locationName",
    },
    {
      Header: "X",
      accessor: "x",
    },
    {
      Header: "Y",
      accessor: "y",
    },
    {
      Header: "Date of visit",
      accessor: "date",
    },
    {
      Header: "Case Number",
      accessor: "caseNo",
    },
  ]
  const columns = useMemo(() => COLUMNS, [])
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
    <>
      {currentDisplay === "data" && (
        <div className={classes.root}>
          <div
            className={classes.setting}
            onClick={() => setCurrentDispaly("setting")}
          >
            {" "}
            Setting
          </div>
          <div className={classes.top}>
            <div className={classes.bigTitle}>Clusters</div>
            {clusters.length > 0 && (
              <select
                className={classes.option}
                selected={clusterNo}
                onChange={(e) => setClusterNo(e.target.value)}
              >
                {clusters.map((c, i) => (
                  <option value={i}>{i + 1}</option>
                ))}
              </select>
            )}
          </div>

          {clusters.length > 0 && data.length > 0 && (
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
                    <tr {...row.getRowProps()} className={classes.row}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
          {
            clusters.length === 0 &&
            <div>There is no cluster</div> 
          }
        </div>
      )}
      {currentDisplay === "setting" && (
        <Setting onSettingSaved={onSettingSaved} />
      )}
    </>
  )
}

const Setting = (props) => {
  const classes = settingStyle()
  const [Dvalue, setDvalue] = useState("")
  const [Tvalue, setTvalue] = useState("")
  const [Cvalue, setCvalue] = useState("")

  const clustering_func = () => {
    if (!Dvalue || !Tvalue || !Cvalue) {
      alert("Missing some fields")
    } else if (isNaN(Dvalue) || isNaN(Tvalue) || isNaN(Cvalue)) {
      alert("All the fields should be a number.")
    } else {
      props.onSettingSaved(Dvalue, Tvalue, Cvalue)
    }
  }
  return (
    <div className={classes.root}>
      <div className={classes.bigTitle}>Setting</div>
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>D value(in meter): </div>
        <input value={Dvalue} onChange={(e) => setDvalue(e.target.value)} />
      </div>
      <br />
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>T value(in day): </div>
        <input value={Tvalue} onChange={(e) => setTvalue(e.target.value)} />
      </div>
      <br />
      <div className={classes.selectionField}>
        <div className={classes.selectionLabel}>C value(cluster size):</div>
        <input value={Cvalue} onChange={(e) => setCvalue(e.target.value)} />
      </div>
      <br />
      <div className={classes.submitBtn} onClick={clustering_func}>
        Save
      </div>

      <br />
      <br />
      <br />
    </div>
  )
}
export default Clustering
