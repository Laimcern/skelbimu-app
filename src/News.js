import axios from "axios";
import React, {useState, useEffect} from "react";
import FormInput from "./components/FormInput";

function News() {
  const [values, setValues] = useState({
    subject: "",
    body: "",
  })

  const inputs = [
    {
      id:0,
      name:"subject",
      type:"text",
      placeholder:"Įvesti temą",
      errorMessage: "Privalo būti užpildytas",
      label:"Tema",
      pattern: "^[.]{1, 50}$",
      required: true,
    },
  ]

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value});
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    handlePost();
  }

  const handlePost = () =>{
    const url = "http://localhost:5187/api/Email/SendEmailsToNaudotojai";
    const data = {
      "to": "",
      "subject": values.subject,
      "body": values.body
    }
    console.log(data)
    axios.post(url, data)
    .then((result)=>{
      alert("Naujienos išiustos sėkmingas!");
    })
    .catch((error)=>{
      alert(error);
    })
  }
  
  return (
    <div>
      <h1>Naujienu siuntimo forma</h1>
      <form className="registrationForm" onSubmit={handleSubmit}>
        <FormInput key={inputs[0]} {...inputs[0]} value={values[inputs[0].name]} onChange={onChange}></FormInput>
        <label>Turinys</label>
        <textarea 
          name="body"
          placeholder="Įvesti el. paštu siunčiama turinį " 
          required="true" 
          value={values.body}
          onChange={onChange}
        />
        <button className="create">Išsiusti visiem</button>
      </form>
    </div>
  );
}

export default News;