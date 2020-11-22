import React, { useEffect, useState } from "react"
import { createUseStyles } from "react-jss"
import cn from "classnames"
import { useRootState } from "@/App.js"
import { request } from "@/request.js"
import ClickAway from "@/components/Utils/ClickAway"
import PatientInfo from "./PatientInfo"
import LocationInfo from "./LocationInfo"
import _ from "lodash"

const AddNewRecord = (props) => {
  const [page, setPage] = useState(0)
  const [patientInfo, setPatientInfo] = useState(null)
  const [virusList, setVirusList] = useState([])

  const blankrecord = {
    category: "Residence",
    dateFrom: "",
    dateTo: "",
    location: null,
  }
  const [locationRecord, setLocationRecord] = useState([{ ...blankrecord }])
  const submitForm = async(l) => {
    setLocationRecord(l)
    const filtered = _.filter(l, (i) => i)
    // console.log(filtered)
    if (filtered.length>0){
      const result = await request("submitCase", {
        patient: patientInfo,
        location: filtered,
      })
      if(result.status === "Success"){
        window.alert("You have successfully input the patient info.")
        window.location.reload()
      }
      
    }
  }
  const onPageChange = (pageNum, p, l) => {
    if (p) {
      // console.log(p)
      setPatientInfo(p)
    }
    if (l) {
      setLocationRecord(l)
    }
    setPage(pageNum)
  }

  useEffect(() => {
    ;(async () => {
      const result = await request("getAllVirus", [])
      // console.log(result)
      if(result.length < 1) {
        alert("Please add virus first!")
        window.location.reload()
      }
      setVirusList(result)
    })()
  }, [])
  return (
    <>
      {page === 0 ? (
        <PatientInfo onPageChange={onPageChange} patient={patientInfo} virusList={virusList}/>
      ) : (
        <LocationInfo
          onPageChange={onPageChange}
          locationRecord={locationRecord}
          submitForm={submitForm}
        />
      )}
    </>
  )
}

export default AddNewRecord
