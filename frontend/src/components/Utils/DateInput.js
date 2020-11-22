import React, { useEffect, useState } from "react"
import { createUseStyles } from "react-jss"
import cn from "classnames"

const useDateInputStyle = createUseStyles({
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

const DateInput = (props) => {
  const classes = useDateInputStyle()
  return (
    <div className={classes.root}>
      <input value={props.value} type={props.type? props.type : "date"} className={classes.input} required onChange={props.onChange}/>
    </div>
  )
}

export default DateInput