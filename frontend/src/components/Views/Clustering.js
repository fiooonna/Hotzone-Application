import React, { useEffect, useState, useMemo } from "react"
import { createUseStyles } from "react-jss"
import cn from "classnames"
import { useRootState } from "@/App.js"
import { request } from "@/request.js"
import ClickAway from "@/components/Utils/ClickAway"

const clusteringStyle = createUseStyles({
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

const Clustering = (props) => {
    const classes = clusteringStyle()
    const [Dvalue, setDvalue] = useState("")
    const [Tvalue, setTvalue] = useState("")
    const [Cvalue, setCvalue] = useState("")
    const [data, setData] = useState([])

    const clustering_func = async () => {
        if (!Dvalue || !Tvalue || !Cvalue) {
          alert("Missing some fields")
        } else if (isNaN(Dvalue) || isNaN(Tvalue) || isNaN(Cvalue)) {
          alert("All the fields should be a number.")
        } else {
          await request("findCluster", {
            Dvalue: Dvalue,
            Tvalue: Tvalue,
            Cvalue: Cvalue,
          })
          setDvalue("")
          setTvalue("")
          setCvalue("")
          window.alert("You have successfully found a cluster.")
        }
      }
    
    return(
        <div className={classes.root}>
            <div className={classes.bigTitle}>Clustering</div>
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
                Submit
            </div>

            <br />
            <br />
            <br />
        </div>
    )
}
  
export default Clustering