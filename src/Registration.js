import axios from "axios";
import React, {useState, useEffect, Component} from "react";
import FormInput from "./components/FormInput";

function Registration() {
  const handlePost = () =>{
    const url = "http://localhost:5187/api/Naudotojas";
    const data = {
      "vardas": values.vardas,
      "pavarde": values.pavarde,
      "el_Pastas": values.el_pastas,
      "slapyvardis": values.slapyvardis,
      "tel_Nr": values.tel_nr,
      "slaptazodis": values.slaptazodis,
      "role": 0,
    }
    axios.post(url, data)
    .then((result)=>{
        alert("Pridėjimas sėkmingas!")
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
      name:"vardas",
      type:"text",
      placeholder:"Vardas",
      errorMessage: "Privalo būti tik raidės",
      label:"Vardas",
      pattern: "^[ĄČĘĖĮŠŲŪŽAąčęėįšųūžA-Za-z]{1, 50}$",
      required: true,
    },
    {
      id:1,
      name:"pavarde",
      type:"text",
      placeholder:"Pavardė",
      errorMessage: "Privalo būti tik raidės",
      label:"Pavardė",
      pattern: "^[ĄČĘĖĮŠŲŪŽAąčęėįšųūžA-Za-z]{1, 50}$",
      required: true,
    },
    {
      id:2,
      name:"el_pastas",
      type:"email",
      placeholder:"Elektroninis paštas",
      errorMessage: "Privalo būti teisingas el. pašto adresas",
      label:"Elektroninis paštas",
      required: true,
    },
    {
      id:3,
      name:"tel_nr",
      type:"tel",
      placeholder:"Telefono numeris",
      errorMessage: "Tinkami formatai 86-xxxx-xxx arba +370-xxxx-xxx ",
      label:"Telefono numeris",
      pattern: "(86[0-9]{7})|([+]?370[0-9]{7})",
      required: true,
    },
    {
      id:4,
      name:"slaptazodis",
      type:"text",
      placeholder:"Slaptažodis",
      errorMessage: "Privalo būti bent 5 simbolių ilgio",
      label:"Slaptažodis",
      pattern: "^[ĄČĘĖĮŠŲŪŽAąčęėįšųūžA-Za-z0-9]{5,100}$",
      required: true,
    },
    {
      id:5,
      name:"slapyvardis",
      type:"text",
      placeholder:"Slapyvardis",
      errorMessage: "Privalo prasidėti raide ir būti bent 5 simbolių ilgio",
      label:"Slapyvardis",
      pattern: "^[ĄČĘĖĮŠŲŪŽAąčęėįšųūžA-Za-z][ĄČĘĖĮŠŲŪŽAąčęėįšųūžA-Za-z0-9]{4,24}$",
      required: true,
    },
  ]

  const handleSubmit = (e) =>{
    e.preventDefault();
    handlePost();
  }

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  return (
    <div className="main">
      <h1>Registracijos forma</h1>
      <form className="registrationForm" onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}></FormInput>
          ))}
          <button className="create">Registruotis</button>
      </form>
    </div>
  );
};

export default Registration;