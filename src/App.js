import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect} from 'react';
import axios from "axios";

import "./Tables.css";
import AppCSS from './App.module.css'
import Skelbimai from './Skelbimai';
import Header from './components/Header';
import Upload from './Upload'
import Footer from './components/Footer'
import User from './User'
import Categories from './Categories';
import Registration from './Registration';
import SkelbimasEdit from './SkelbimasEdit'
import Login from './Login';
import News from './News';

function App() {
  const [name, setName] = useState('');
  const [userID, setUserID] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    getUser();
  }, [])

  const getUser = () =>{
    axios.get('http://localhost:5187/api/Naudotojas/naudotojas', {
      withCredentials: true,
    })
    .then((result) => {
      setName(result.data.Slapyvardis);
      setUserID(result.data.ID);
      setUserRole(result.data.Role);
    })
    .catch((error) => {
        console.log(error);
    })
  }

  const logout = () => {
    axios.post('http://localhost:5187/api/Naudotojas/logout', {}, {
      withCredentials: true,
    })
    .then((result) => {
      setName('');
      setUserID('');
      setUserRole('')
    })
    .catch((error) => {
      alert(error);
    })
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Header name={name} role={userRole} logout={logout}/>
        <div className={AppCSS.content}>
          <Routes>
            <Route path="/" element={<Skelbimai/>} />
            <Route path="/kategorijos" element={<Categories userRole={userRole}/>} />
            <Route path="/registracija" element={<Registration/>} />
            <Route path="/prisijungimas" element={<Login getUser={getUser}/>} />
            <Route path="/skelbimai" element={<Skelbimai/>} />
            <Route path="/skelbimai/edit/:id" element={<SkelbimasEdit/>} />
            <Route path="/ideti" element={<Upload userID={userID}/>} />
            <Route path="/naudotojas" element={<User/>} />
            <Route path="/naujienos" element={<News/>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;