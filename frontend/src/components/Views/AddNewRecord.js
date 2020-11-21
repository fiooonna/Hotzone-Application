import React, { useEffect, useState } from "react"
import { createUseStyles } from "react-jss"
import cn from "classnames"
import { useRootState } from "@/App.js"
import { request } from "@/request.js"
import ClickAway from "@/components/Utils/ClickAway"
import PatientInfo from "./PatientInfo"
import LocationInfo from "./LocationInfo"




const AddNewRecord = (props) => {
  const [page, setPage] = useState(0)
  const [patientInfo, setPatientInfo] = useState(null)
  const onPageChange = (pageNum, patient) => {
    if(patient){
      console.log(patient)
      setPatientInfo(patient)
    }
    setPage(pageNum)
  }
  return (
    <>
    {
      page === 0 ?
      <PatientInfo onPageChange={onPageChange}/>
      :
      <LocationInfo />
    }
    </>
  )
}

export default AddNewRecord