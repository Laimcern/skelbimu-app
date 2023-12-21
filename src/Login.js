import axios from "axios";
import React, {useState, useEffect, Component} from "react";
import FormInput from "./components/FormInput";
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const navigate  = useNavigate();

  const login = () =>{
    const url = "http://localhost:5187/api/Naudotojas/login";
    const data = {
      "slapyvardis": values.slapyvardis,
      "slaptazodis": values.slaptazodis,
    }
    axios.post(url, data, {
      withCredentials: true,
    })
    .then((result)=>{
        props.getUser();
        navigate('/');
    })
    .catch((error)=>{
        alert(error);
    })
  }
  
  const [values, setValues] = useState({
    vardas: "",
    pavarde: "",
    el_pastas: "",
    tel_nr: "",
    slaptazodis: "",
    slapyvardis: "",
  })

  const inputs = [
    {
      id:0,
      name:"slapyvardis",
      type:"text",
      placeholder:"Slapyvardis",
      errorMessage: "Privalo prasidėti raide ir būti bent 5 simbolių ilgio",
      label:"Slapyvardis",
      pattern: "^[ĄČĘĖĮŠŲŪŽAąčęėįšųūžA-Za-z][ĄČĘĖĮŠŲŪŽAąčęėįšųūžA-Za-z0-9]{4,24}$",
      required: true,
    },
    {
      id:1,
      name:"slaptazodis",
      type:"text",
      placeholder:"Slaptažodis",
      errorMessage: "Privalo būti bent 5 simbolių ilgio",
      label:"Slaptažodis",
      pattern: "^[ĄČĘĖĮŠŲŪŽAąčęėįšųūžA-Za-z0-9]{5,100}$",
      required: true,
    },
  ]

  const handleSubmit = (e) =>{
    e.preventDefault();
    login();
  }

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  return (
    <div className="main">
      <h1>Prisijungimo forma</h1>
      <form className="registrationForm" onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}></FormInput>
          ))}
          <button className="create">Prisijungti</button>
      </form>
    </div>
  );
};

export default Login;