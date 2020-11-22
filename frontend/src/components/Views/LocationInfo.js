import React, { useEffect, useState } from "react"
import { render } from "react-dom"
import { createUseStyles } from "react-jss"
import cn from "classnames"
import { useRootState } from "@/App.js"
import { request } from "@/request.js"
import ClickAway from "@/components/Utils/ClickAway"
import _ from "lodash"
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
  searchBtn: {
    marginLeft: 10,
    cursor: "pointer",
  },
  locationBox: {},
  backBtn: {
    marginTop: 20,
    width: 60,
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
    left: 0,
    border: "1px solid black",
  },
  submitBtn: {
    marginTop: 20,
    width: 60,
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
    right: 30,
    border: "1px solid black",
  },
  addBtn: {
    marginTop: 20,
    width: 150,
    height: 40,
    color: "white",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 18,
    borderRadius: 5,
  },
  closeBtn: {
    cursor: "pointer",
  },
  searchContainer: {
    position: "relative",
  },
  BtnContainer: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
  },
  resultRow: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid black",
    cursor: "pointer",
    "&:hover": { backgroundColor: "grey" },
  },
  placeName: {
    fontWeight: "bold",
  },
  address: {
    fontSize: 13,
  },
  dropDown: {
    position: "absolute",
    maxHeight: 500,
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column",
    border: "1px solid black",
    backgroundColor: "white",
    "& > div": {
      paddingLeft: 10,
    },
    zIndex: 1,
  },
})
const LocationRecord = (props) => {
  const classes = useInputFormStyle()
  const [category, setCategory] = useState(props.data.category)
  const [dateFrom, setDateFrom] = useState(props.data.dateFrom)
  const [dateTo, setDateTo] = useState(props.data.dateTo)
  const [searchTerm, setSearchTerm] = useState(
    props.data.location ? props.data.location.nameEN : ""
  )
  const [result, setResult] = useState("")
  const [deleted, setDeleted] = useState(false)
  const [selectLocation, setSelectLocation] = useState(props.data.location)
  const [location, setLocation] = useState(null)

  const onDateFromChange = (value) => {
    if (category === "Visit") {
      setDateTo(value)
    }
    if (value > dateTo && dateTo !== "") {
      alert("Date from can only be earilier than date to")
      return
    }
    setDateFrom(value)
  }
  const onDateToChange = (value) => {
    if (category === "Visit") {
      setDateFrom(value)
    }
    if (value < dateFrom && dateFrom !== "") {
      alert("Date to can only be later than date from")
      return
    }
    setDateTo(value)
  }
  const searchLocation = async () => {
    if (searchTerm !== "") {
      const result = await request("searchLocation", {
        locationTerm: searchTerm,
      })
      if(result != "Error"){
        // console.log(result)
        setResult(result)
      }
      else {
        alert("No matching record")
      }
    }
  }

  const onDeleteRow = () => {
    if (props.onDeleteRow()) {
      setDeleted(true)
    }
  }
  useEffect(() => {
    if (selectLocation) {
      setLocation(selectLocation)
      setSelectLocation(null)
      setResult("")
    }
  }, [selectLocation])

  useEffect(() => {
    const locationData = { category, dateFrom, dateTo, location }
    // console.log(locationData)
    props.onRecordChange(locationData)
  }, [category, dateFrom, dateTo, location])

  const sample = [1, 2, 3, 4]
  return (
    <>
      {!deleted && (
        <tr>
          <td>
            <select
              className="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Residence">Residence</option>
              <option value="Workplace">Workplace</option>
              <option value="Visit">Visit</option>
            </select>
          </td>
          <td>
            <input
              type="date"
              className="dateFrom"
              value={dateFrom}
              onChange={(e) => onDateFromChange(e.target.value)}
            />
          </td>
          <td>
            <input
              type="date"
              className="dateTo"
              value={dateTo}
              onChange={(e) => onDateToChange(e.target.value)}
            />
          </td>
          <td className={classes.locationBox}>
            <div className={classes.searchContainer}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i
                className={cn("fa fa-search", classes.searchBtn)}
                onClick={searchLocation}
              ></i>

              {result !== "" && !selectLocation && (
                <div className={classes.dropDown}>
                  {result.map((i) => (
                    <div
                      className={classes.resultRow}
                      onClick={() => {
                        setSelectLocation(i)
                        setSearchTerm(i.nameEN)
                      }}
                    >
                      <div className={classes.placeName}>{i.nameEN}</div>
                      <div className={classes.address}>{i.addressEN}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </td>
          <td>
            <i
              className={cn(classes.closeBtn, "fa fa-window-close")}
              onClick={onDeleteRow}
            ></i>
          </td>
        </tr>
      )}
    </>
  )
}

const LocationInfo = (props) => {
  const [page, setPage] = useState(0)
  const classes = useInputFormStyle()
  const blankrecord = {
    category: "Residence",
    dateFrom: "",
    dateTo: "",
    location: null,
    result: [],
  }
  const [locationRecord, setLocationRecord] = useState(props.locationRecord)
  const addRecord = () => {
    let last
    for (let i = locationRecord.length - 1; i >= 0; i--) {
      if (locationRecord[i]) {
        last = locationRecord[i]
        break
      }
    }
    const { dateFrom, dateTo, location } = last
    if (dateFrom === "" || dateTo === "" || !location) {
      alert("Missing some fields")
    } else {
      const entry = { ...blankrecord }
      setLocationRecord((locationRecord) => locationRecord.concat(entry))
    }
  }

  console.log(locationRecord)

  const onDeleteRow = (i) => {
    const a = _.filter(locationRecord, (i) => {
      if (!i) return false
      else {
        const { dateFrom, dateTo, location } = i
        return !(dateFrom === "" || dateTo === "" || !location)
      }
    })
    const { dateFrom, dateTo, location } = locationRecord[i]
    const b = locationRecord.length > 1

    console.log(a, b)
    if (!(a.length > 1)) {
      if ((dateFrom === "" || dateTo === "" || !location) && b) {
        let old = [...locationRecord]
        old[i] = null
        setLocationRecord(old)
        return true
      }
      alert("You need at least one location record")
      return false
    }
    let old = [...locationRecord]
    old[i] = null
    setLocationRecord(old)
    return true
  }

  const onRecordChange = (location, i) => {
    let old = [...locationRecord]
    old[i] = location
    setLocationRecord(old)
  }

  const submit = () => {
    const a = locationRecord.some(i => {
      if(i){
        const { dateFrom, dateTo, location } = i
        return (dateFrom === "" || dateTo === "" || !location) 
      }
      return false
    })
    if (a) {
      alert("Missing some fields")
    } else {
      console.log(locationRecord)
      props.submitForm(locationRecord)
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.selectionTitle}>Add Location Record</div>
      <table className={classes.empTable}>
        <tr>
          <th>Category</th>
          <th>Date From</th>
          <th>Date To</th>
          <th>Location</th>
          <th>Delete</th>
        </tr>
        <tbody>
          {locationRecord.map((val, idx) => {
            if (val)
              return (
                <LocationRecord
                  onRecordChange={(location) => onRecordChange(location, idx)}
                  onDeleteRow={() => onDeleteRow(idx)}
                  data={locationRecord[idx]}
                />
              )
            return <></>
          })}
        </tbody>
      </table>
      <div className={classes.BtnContainer}>
        <div
          className={classes.backBtn}
          onClick={() => props.onPageChange(0, null, locationRecord)}
        >
          Back
        </div>

        <div className={classes.addBtn} onClick={addRecord}>
          Add
        </div>
        <div
          className={classes.submitBtn}
          onClick={() => {
            submit()
          }}
        >
          Submit
        </div>
      </div>
    </div>
  )
}

export default LocationInfo
