import React from "react";
import ReactTooltip from "react-tooltip";

function Tooltip(props) {
  return (
    <>
      <a
        data-tip={props.message}
        data-for={props.id}
        data-delay-show={props.delay ? props.delay : "500"}
      >
        <ReactTooltip
          id={props.id}
          type={props.type}
          place={props.position}
          effect="solid"
        />
        {props.button && (
          <span className="card-icons" onClick={props.onClickHandler}>
            {props.button}
          </span>
        )}
      </a>
    </>
  );
}

export default Tooltip;
