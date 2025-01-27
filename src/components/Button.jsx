import React from "react"
import '../style/button.scss'
const Button = (props) => {
    return (
        <div className="buttonContainer">
            <button type={props.type} className={`button ${props.className}`} style={props.style} onClick={props.onClick}>{props.name}</button>
        </div>
    )
}

export default Button