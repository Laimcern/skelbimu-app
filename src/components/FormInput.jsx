import React, {useState, useEffect, Component} from "react";
import './FormInput.css'

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const {label, errorMessage, onChange, id, ...inputProps} = props;

  const handleFocus = (e) =>{
    setFocused(true);
  }

  return (
    <div className="formInput">
      <label>{props.label}</label>
      <input {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()}></input>
      <span className='error'>{errorMessage}</span>
    </div>
  )
}

export default FormInput