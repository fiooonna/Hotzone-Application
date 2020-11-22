import React, { useEffect, useState } from "react"
import { createUseStyles } from "react-jss"
import cn from "classnames"

const useLocImpInputStyle = createUseStyles({
  root: {
    display: "flex",
    alignItems: "center",
    height: 30,
    width: "100%",
    border: "1px solid black"
  },
  input: {
    width: "100%",
    border: "0px none",
    outline: "none",
    "& :focus": {
      outline: "none",
    },
    lineHeight: "28px",
  },
})

const LocImpInput = (props) => {
  const classes = useLocImpInputStyle()
  return (
    <div className={classes.root}>
      <select className={classes.input} required onChange={props.onChange}>
        <option value="Local">Local</option>
        <option value="Import">Imported</option>
      </select>
    </div>
  )
}

export default LocImpInput