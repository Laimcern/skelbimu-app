import axios from "axios";
import React, {useState, useEffect} from "react";

const Categories = (props) =>{
    const [data, setData] = useState([]);
    const [pavadinimas, setPavadinimas] = useState('');

    useEffect(() => {
        getData();
    }, [])

    const getData = () =>{
        axios.get('http://localhost:5187/api/Kategorija')
        .then((result) => {
            setData(result.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleDelete = (id) => {
        if(window.confirm("Ar tikrai ištrinti?") === true){
            axios.delete('http://localhost:5187/api/Kategorija/' + id)
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
        axios.get('http://localhost:5187/api/Kategorija/' + id)
        .then((result) => {
            let editedPavadinimas = prompt("Keiskite kategorijos pavadinimą", result.data.Pavadinimas);
            if( editedPavadinimas != null) {
                handleUpdate(id, editedPavadinimas);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleUpdate = (id, editedPavadinimas) =>{
        const url = "http://localhost:5187/api/Kategorija?id=" + id;
        const data = {
            "id": id,
            "pavadinimas": editedPavadinimas
        }
        axios.put(url, data)
        .then((result)=>{
            alert("Redagavimas sėkmingas!")
            getData();
        })
        .catch((error)=>{
            alert(error);
        })
    }

    const handlePost = () =>{
        const url = "http://localhost:5187/api/Kategorija";
        const data = {
            "pavadinimas": pavadinimas
        }
        axios.post(url, data)
        .then((result)=>{
            alert("Pridėjimas sėkmingas!")
            getData();
        })
        .catch((error)=>{
            alert(error);
        })
    }

    return(
        <div>
            <h1>Kategorijos</h1>
            {
                props.userRole === 1 ?
            
            <table className="crud">
                <tr>
                    <td>
                        <input type="text" placeholder="Įvesti naują kategoriją" value={pavadinimas} onChange={(e) => setPavadinimas(e.target.value)} />
                    </td>
                    <td colSpan="2" >
                        <button className="create" onClick={() => handlePost()}>ADD</button>
                    </td>
                </tr>
                {
                    data && data.length > 0 ?
                        data.map((item, index) => {
                            return(
                                <tr key={index}>
                                    <td ><b>{item.Pavadinimas}</b></td>
                                    <td width={65}><button type="button" className="edit" onClick={() => handleEdit(item.ID)}>EDIT</button></td>
                                    <td width={65}><button type="button" className="delete" onClick={() => handleDelete(item.ID)}>DELETE</button></td>
                                </tr>
                            )
                        })
                        :
                        'Kraunami duomenys arba jų nėra...'
                }
            </table>
            :
            <p style={{textAlign: "center"}}>Reikalinga aukštesnė rolė norint pasiekti kategorijas</p>
            }
        </div>
    );
}

export default Categories;