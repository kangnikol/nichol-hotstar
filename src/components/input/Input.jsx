import React from "react"

const Input = (props) => {
  return (
    <input
      className="border-0 bg-[#0f1014] px-6 py-3 rounded-full text-white w-full outline-none focus:ring-2 focus:ring-red-600 transition-all placeholder-gray-500 shadow-inner"
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange ? (e) => props.onChange(e) : null}
    />
  )
}

export default Input
