import axios from "axios";
import React, {useState, useEffect} from "react";
import FormInput from "./components/FormInput"

function Home()
{
  const [data, setData] = useState([]);
  const [editID, setEditID] = useState(null);
  
  const [values, setValues] = useState([])

  useEffect(() => {
    getData();
  }, [])

  const getData = () =>{
      axios.get('http://localhost:5187/api/Naudotojas')
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
          console.log(error);
      })
  }

  const handleDelete = (id) => {
    if(window.confirm("Ar tikrai ištrinti?") === true){
      axios.delete('http://localhost:5187/api/Naudotojas/' + id)
      .then((result) =>{
          if(result.status === 200){
              alert("Šalinimas sėkmingas!")
              getData();  
          }
      })
      .catch((error)=>{
          alert(error);
      })
    }
  }

  const handleEdit = (id) => {
    setEditID(id);
    axios.get('http://localhost:5187/api/Naudotojas/' + id)
    .then((result) => {
      console.log(result.data)
      setValues(result.data);
      console.log(values)
    })
    .catch((error) => {
        console.log(error);
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    handleUpdate();
  }

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleUpdate = () =>{
    const url = "http://localhost:5187/api/Naudotojas?id=" + editID;
    axios.put(url, values)
    .then((result)=>{
        alert("Redagavimas sėkmingas!")
        getData();
    })
    .catch((error)=>{
        alert(error);
    })
  }

  const inputs = [
    {
      id:0,
      name:"Vardas",
      type:"text",
      placeholder:"Vardas",
      errorMessage: "Privalo būti tik raidės",
      pattern: "^[ĄČĘĖĮŠŲŪŽAąčęėįšųūžA-Za-z]{1, 50}$",
      required: true,
    },
    {
      id:1,
      name:"Pavarde",
      type:"text",
      placeholder:"Pavardė",
      errorMessage: "Privalo būti tik raidės",
      pattern: "^[ĄČĘĖĮŠŲŪŽAąčęėįšųūžA-Za-z]{1, 50}$",
      required: true,
    },
    {
      id:2,
      name:"El_Pastas",
      type:"email",
      placeholder:"Elektroninis paštas",
      errorMessage: "Privalo būti teisingas el. pašto adresas",
      required: true,
    },
    {
      id:3,
      name:"Tel_Nr",
      type:"tel",
      placeholder:"Telefono numeris",
      errorMessage: "Tinkami formatai 86-xxxx-xxx arba +370-xxxx-xxx ",
      pattern: "(86[0-9]{7})|([+]?370[0-9]{7})",
      required: true,
    },
    {
      id:4,
      name:"Slaptazodis",
      type:"text",
      placeholder:"Slaptažodis",
      errorMessage: "Privalo būti bent 5 simbolių ilgio",
      pattern: "^[ĄČĘĖĮŠŲŪŽAąčęėįšųūžA-Za-z0-9]{5,100}$",
      required: true,
    },
    {
      id:5,
      name:"Slapyvardis",
      type:"text",
      placeholder:"Slapyvardis",
      errorMessage: "Privalo prasidėti raide ir būti bent 5 simbolių ilgio",
      pattern: "^[ĄČĘĖĮŠŲŪŽAąčęėįšųūžA-Za-z][ĄČĘĖĮŠŲŪŽAąčęėįšųūžA-Za-z0-9]{4,24}$",
      required: true,
    },
    {
      id:6,
      name:"Role",
      type:"number",
      placeholder:"Role",
      errorMessage: "0 naudotojas, 1 admin",
      required: true,
    },
  ]
  
  return (
    <div className="main">
      <h1>Naudotojai</h1>
      <form onSubmit={handleSubmit}>
        <table className="crud">
          <tr>
              <th>Vardas</th>
              <th>Pavardė</th>
              <th>El. Paštas</th>
              <th>Slapyvardis</th>
              <th>Tel. Nr.</th>
              <th>Slaptazodis</th>
              <th>Role</th>
              <th></th>
              <th></th>
          </tr>
          {
            data && data.length > 0 ?
              data.map((item, index) => {
                return(
                  <tr key={index}>
                    <td className="cell">
                      <b>{item.Vardas}</b>
                      {editID === item.ID && 
                        <FormInput  {...inputs[0]} value={values[inputs[0].name]} onChange={onChange}></FormInput>
                      }  
                    </td>
                    <td className="cell">
                      <b>{item.Pavarde}</b>
                      {editID === item.ID && 
                        <FormInput  {...inputs[1]} value={values[inputs[1].name]} onChange={onChange}></FormInput>
                      }  
                    </td>
                    <td className="cell">
                      <b>{item.El_Pastas}</b>
                      {editID === item.ID && 
                        <FormInput  {...inputs[2]} value={values[inputs[2].name]} onChange={onChange}></FormInput>
                      }  
                    </td>
                    <td className="cell">
                      <b>{item.Slapyvardis}</b>
                      {editID === item.ID && 
                        <FormInput  {...inputs[5]} value={values[inputs[5].name]} onChange={onChange}></FormInput>
                      }  
                    </td>
                    <td className="cell">
                      <b>{item.Tel_Nr}</b>
                      {editID === item.ID && 
                        <FormInput  {...inputs[3]} value={values[inputs[3].name]} onChange={onChange}></FormInput>
                      }  
                    </td>
                    <td className="cell">
                      <b>{item.Slaptazodis}</b>
                      {editID === item.ID && 
                        <FormInput  {...inputs[4]} value={values[inputs[4].name]} onChange={onChange}></FormInput>
                      }  
                    </td>
                    <td className="cell">
                      <b>{item.Role}</b>
                      {editID === item.ID && 
                        <FormInput  {...inputs[6]} value={values[inputs[6].name]} onChange={onChange}></FormInput>
                      }  
                    </td>
                    
                    <td width={65}><button type="button" className="edit" onClick={() => handleEdit(item.ID)}>EDIT</button>
                      {editID === item.ID && <button type="submit" className="create" key={index}>SAVE</button>}  
                    </td>
                    <td width={65}><button type="button" className="delete" onClick={() => handleDelete(item.ID)}>DELETE</button></td>
                  </tr>
                )
              })
              :
              'Kraunami duomenys arba jų nėra...'
          }
        </table>
      </form>
    </div>
  );


  
};



export default Home;