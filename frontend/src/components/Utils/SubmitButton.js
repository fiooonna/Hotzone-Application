import React, { useEffect, useState } from "react"
import { createUseStyles } from "react-jss"
import cn from "classnames"

const useSubmitButtonStyle = createUseStyles({
  root: {
    display: "flex",
    alignItems: "center",
    height: 30,
    width: "100%",
  },
  input: {
    width: "auto",
    border: "0px none",
    outline: "none",
    "& :focus": {
      outline: "none",
    },
    lineHeight: "28px",
  },
})

const SubmitButton = (props) => {
  const classes = useSubmitButtonStyle()
  return (
    <div className={classes.root}>
      <button className={classes.input} required onChange={props.onChange}>Submit</button>
    </div>
  )
}

export default SubmitButton