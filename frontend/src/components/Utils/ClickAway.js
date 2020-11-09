import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function ClickAway(props) {
  const ref = useRef(null)
  const onClick = props.onClick
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClick(true)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref])
  return <div ref={ref}>{props.children}</div>;
}

ClickAway.propTypes = {
  children: PropTypes.element.isRequired
};

export default ClickAway
