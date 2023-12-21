import axios from "axios";
import React, {useState, useEffect} from "react";
import FormInput from "./components/FormInput";
import "./Upload.css"
import Select from 'react-select' //https://react-select.com/home

function Upload(props)
{
const handlePost = () =>{
    const url = "http://localhost:5187/api/Skelbimas";
    const data = {
      "id": 0,
      "pavadinimas": values.pavadinimas,
      "aprasymas": values.aprasymas,
      "kaina": values.kaina,
      "naudotojasID": props.userID,
      "nuotraukos": 
        photos.map((photo) => ({
          "url": photo.photo,
          "skelbimasID": 0
        })),
      "kategorijos":
        selectedOptions.map((option) =>({
            "id": option.value,
        })),
    }
    console.log(data)
    axios.post(url, data)
    .then((result)=>{
      alert("Pridėjimas skelbimo sėkmingas!");
    })
    .catch((error)=>{
      alert("Pridėjimas skelbimu bad!");
    })
  }  

  const [values, setValues] = useState({
    pavadinimas: "",
    aprasymas: "",
    kaina: "0",
  })
  
  const inputs = [
    {
      id:0,
      name:"pavadinimas",
      type:"text",
      placeholder:"Įvesti skelbimo pavadinimą",
      errorMessage: "Privalo būti užpildytas",
      label:"Pavadinimas",
      pattern: "^[ĄČĘĖĮŠŲŪŽAąčęėįšųūžA-Za-z]{1, 50}$",
      required: true,
    },
    {
      id:1,
      name:"kaina",
      type:"number",
      step: "0.01",
      errorMessage: "Privalo būti užpildytas",
      placeholder:"Kaina",
      label:"Kaina",
      min: 0,
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

  const [photos, setPhotos] = useState([]);
  const [nextId, setNextId] = useState(0);

  const handlePhoto = (e) =>{
    const url = document.getElementById("photo").value;
    setNextId((prevNextId) => prevNextId + 1);
    setPhotos((prevPhotos) => [...prevPhotos, { id: nextId, photo: url }]);
  }

  const handlePhotoRemove = (id) =>{
    setPhotos(
      photos.filter(photo =>
        photo.id !== id
      )
    );
  }

  const [kategorijos, setKategorijos] = useState([]);

  useEffect(() => {
    getKategorijos();
  }, [])

  const getKategorijos = () =>{
    axios.get('http://localhost:5187/api/Kategorija')
    .then((result) => {
      setKategorijos(result.data);
    })
    .catch((error) => {
        console.log(error);
    })
  }

  const options = kategorijos.map((kategorija) => ({
    value: kategorija.ID,
    label: kategorija.Pavadinimas,
  }));

  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const handleSelectChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
  };
  
  return (
    <div className="main">
      <h1>Skelbimo kūrimo forma</h1>
      {
        props.userID === ''
        ? 
          <p style={{textAlign: "center"}}>Reikalinga prisijungti norint įdėti skelbimą</p>
        : 
        <form className="uploadForm" onSubmit={handleSubmit}>
          <FormInput put key={inputs[0]} {...inputs[0]} value={values[inputs[0].name]} onChange={onChange}></FormInput>
          
          <label>Aprašymas</label>
          <textarea name="aprasymas" placeholder="Skelbimo aprašymas" required="false" value={values.aprasymas} onChange={onChange}></textarea>

          <FormInput key={inputs[1]} {...inputs[1]} value={values[inputs[1].name]} onChange={onChange}></FormInput>

          <button type="button" onClick={handlePhoto} className="create">Pridėti nuotrauką</button>
          <input id="photo" placeholder="Nuotraukos url"></input>
          <div className="photos">
            {photos.map((photo) => (
              <img key={photo.id} onClick={() => handlePhotoRemove(photo.id)} src={photo.photo} alt="bad url"/>
            ))}
          </div>
          <p>Šalinti nuotrauką =&gt; spausti ant jos</p>

          <label>Kategorijos</label>
          <Select  isMulti required="true" options={options} onChange={handleSelectChange} value={selectedOptions}/>
          <button className="create">Skelbti</button>
        </form>
      }
    </div>
  );
};

export default Upload;
