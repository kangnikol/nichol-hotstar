import React from "react"
import PropTypes from "prop-types"

const Button = (props) => {
  return (
    <button
      className={`btn ${props.className} relative flex items-center justify-center gap-2 px-6 py-2 rounded-full font-semibold transition-all duration-300 ease-out active:scale-95`}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </button>
  )
}

export const OutlineButton = (props) => {
  return (
    <Button
      className={`btn-outline ${props.className} bg-transparent border-2 border-white text-white hover:bg-white hover:text-black`}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </Button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
}

export default Button
