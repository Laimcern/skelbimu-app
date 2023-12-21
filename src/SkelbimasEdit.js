import axios from "axios";
import React, {useState, useEffect} from "react";
import FormInput from "./components/FormInput";
import "./Upload.css"
import Select from 'react-select' //https://react-select.com/home
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SkelbimasEdit()
{
  const { id } = useParams();
  const navigate  = useNavigate();

  useEffect(() => {
      getData();
  }, [])

  const getData = () =>{
    axios.get('http://localhost:5187/api/Skelbimas/' + id)
    .then((result) => {
      setValues(result.data);
      setPhotos(result.data.Nuotraukos);
      setSelectedOptions(
        result.data.Kategorijos.map((kategorija) => ({
          value: kategorija.ID,
          label: kategorija.Pavadinimas,
        }))
      );
      console.log(result.data.Kategorijos)
    })
    .catch((error) => {
        console.log(error);
    })
  }

  const handlePost = () =>{
    const url = "http://localhost:5187/api/Skelbimas";
    const data = {
      "id": 0,
      "pavadinimas": values.pavadinimas,
      "aprasymas": values.aprasymas,
      "kaina": values.kaina,
      "naudotojasID": 1,
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
    axios.post(url, data)
    .then((result)=>{
      alert("Pridėjimas skelbimo sėkmingas!");
    })
    .catch((error)=>{
      alert("Pridėjimas skelbimu bad!");
    })
  }

  const [values, setValues] = useState([])

  const inputs = [
    {
      id:0,
      name:"Pavadinimas",
      type:"text",
      placeholder:"Įvesti skelbimo pavadinimą",
      errorMessage: "Privalo būti užpildytas",
      label:"Pavadinimas",
      pattern: "^[ĄČĘĖĮŠŲŪŽAąčęėįšųūžA-Za-z]{1, 50}$",
      required: true,
    },
    {
      id:1,
      name:"Kaina",
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
    handleUpdate();
  }

  const handleUpdate = () =>{
    const url = "http://localhost:5187/api/Skelbimas?id=" + id;
    const data = {
      "ID": id,
      "Pavadinimas": values.Pavadinimas,
      "Aprasymas": values.Aprasymas,
      "Kaina": values.Kaina,
      "NaudotojasID": values.NaudotojasID,
      "Nuotraukos": 
        photos.map((photo) => ({
          "Url": photo.photo,
          "SkelbimasID": id
        })),
      "Kategorijos":
        selectedOptions.map((option) =>({
            "ID": option.value,
        })),
    }
    axios.put(url, data)
    .then((result)=>{
      alert("Redagavimas sėkmingas!")
      navigate('/');
    })
    .catch((error)=>{
      alert(error);
    })
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
    console.log(selectedOptions)
    setSelectedOptions(selectedValues);
  };

  return (
    <div className="main">
      <h1>Skelbimo kūrimo forma</h1>
      <form className="uploadForm" onSubmit={handleSubmit}>
        <FormInput put key={inputs[0]} {...inputs[0]} value={values[inputs[0].name]} onChange={onChange}></FormInput>
        
        <label>Aprašymas</label>
        <textarea name="Aprasymas" placeholder="Skelbimo aprašymas" required={"false"} value={values.Aprasymas} onChange={onChange}></textarea>

        <FormInput key={inputs[1]} {...inputs[1]} value={values[inputs[1].name]} onChange={onChange}></FormInput>

        <button type="button" onClick={handlePhoto} className="create">Pridėti nuotrauką</button>
        <input id="photo" placeholder="Nuotraukos url"></input>
        <div className="photos">
          {photos.map((photo) => (
            <img key={photo.id} onClick={() => handlePhotoRemove(photo.ID)} src={photo.Url} alt="bad url"/>
          ))}
        </div>
        <p>Šalinti nuotrauką =&gt; spausti ant jos</p>

        <label>Kategorijos</label>
        <Select  isMulti required="true" options={options} onChange={handleSelectChange} value={selectedOptions}/>
        <button className="create">Redaguoti</button>
      </form>
    </div>
  );
};

export default SkelbimasEdit;
