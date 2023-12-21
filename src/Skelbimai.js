import './Home.css'
import axios from "axios";
import React, {useState, useEffect} from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function Home()
{   
    const [data, setData] = useState([]);

    useEffect(() => {
      getData();
      window.scrollTo(0, 0);
    }, [])

    const getData = () =>{
        const token = Cookies.get('jwt');

        console.log(token);
        axios.get('http://localhost:5187/api/Skelbimas', {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        .then((result) => {
            setData(result.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleDelete = (id) => {
        if(window.confirm("Ar tikrai ištrinti?") === true){
            axios.delete('http://localhost:5187/api/Skelbimas/' + id)
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

    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'auto 100% ',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '130px'
    }
    
    function Post(props){
        return(
            <div className="grid-item">
                <div style={{height: 15 + "%"}}><p className="post-title">{props.title}</p></div>
    
                <div className="categories">
                    {
                        Array.isArray(props.categories) &&
                        props.categories.map((category) => (
                        <div key={category.ID}>
                            {category.Pavadinimas}
                        </div>
                        ))
                    }
                </div>
    
                <div style={{height: 25 + "%"}}><p className="post-description">{props.description}</p></div>
    
    
                <div className="slide-container">
                    {
                        (props.categories.length > 0 && Array.isArray(props.photos)) &&  
                        <Slide>
                            { props.photos.map((photo, index)=> (
                            <div key={index}>
                                <div style={{ ...divStyle, 'backgroundImage': `url(${photo.Url})` }}>
                                </div>
                            </div>
                            ))}
                        </Slide>
                    } 
                </div>
    
                <div style={{height: 10 + "%"}}><p className="post-price">{props.price}€</p></div>
                <div className="categories" style={{height: 5 + "%"}}>
                    
                    <div>{props.name}</div>
                    <div>{props.phone}</div>
                </div>
                <div className="crud">
                    <button style={{width: "50%"}} type="button" className="delete" onClick={() => handleDelete(props.ID)}>DELETE</button>
                    <Link to={`/skelbimai/edit/${props.ID}`} style={{width: "50%"}} className="editLink"><span>EDIT</span></Link>
                </div>
            </div>
        );
    }

    return (
      <div>
        <div className="grid-container">
            {
            data && data.length > 0 ?
                data.map((item, index) => {
                    return(
                        <Post
                            ID={item.ID}
                            title={item.Pavadinimas}
                            description={item.Aprasymas}
                            categories={item.Kategorijos}
                            photos={item.Nuotraukos}
                            name={item.Naudotojas.Slapyvardis}
                            phone={item.Naudotojas.Tel_Nr}
                            price={item.Kaina}
                        />
                    )
                })
                :
                'Kraunami duomenys arba jų nėra...'
            }
        </div>
      </div>
    );
};


export default Home;