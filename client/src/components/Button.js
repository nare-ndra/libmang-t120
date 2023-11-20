import React from "react"

function Button({ title,
    variant = 'contained',
    color = 'secondary',
    color1 ='primary',
    type = "button",
    onClick,
    fullWidth = false
    
}

) {
    let className = fullWidth ? "w-100 rounded " : "pr-2 pl-2 rounded ";
    if (variant === "contained") {
        className += "bg-" + color + " text-white";
    } else if (variant === "outlined") {
        className += "bg-" + color1 + " text-white";
    }
    return (
        <button className={className} type={type} onClick={onClick}>{title}</button>
    )
};

export default Button;
