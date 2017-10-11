import React, { Component } from "react";

const Child = (props) => {
    return(
        <button onClick={props.handleClick}> Click </button>
    );
};

export default Child;