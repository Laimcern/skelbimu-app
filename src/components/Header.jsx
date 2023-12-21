import { Link } from 'react-router-dom';
import HeaderCSS from './Header.module.css';
import { BiSolidUserCircle } from 'react-icons/bi';
import { TiUpload } from 'react-icons/ti';
import { BsPostcard } from 'react-icons/bs';
import { BiSolidCategory } from  'react-icons/bi';
import { SiHomebridge } from "react-icons/si";
import { FaRegAddressCard } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa6";

const Header = (props) => {
  return (
    <div className={HeaderCSS.header}>
      <NavBar>
        <Link to={'/'}><SiHomebridge className={HeaderCSS.usericon} /></Link>
        { 
          props.name !== '' 
          ? <Link to={'/prisijungimas'} onClick={props.logout} className={HeaderCSS.link}><MdOutlineLogout /><span>Atsijungti</span></Link>
          :<>
            <Link to={'/prisijungimas'} className={HeaderCSS.link}><MdOutlineLogin /><span>Prisijungti</span></Link>
            <Link to={'/registracija'} className={HeaderCSS.link}><FaRegAddressCard /><span>Registracija</span></Link>
          </>
        }
        <Link to={'/kategorijos'} className={HeaderCSS.link}><BiSolidCategory/><span>Kategorijos</span></Link>
        <Link to={'/skelbimai'} className={HeaderCSS.link}><BsPostcard/><span>Skelbimai</span></Link>
        <Link to={'/ideti'} className={HeaderCSS.link}><TiUpload /><span>Įdėti</span></Link>
        <Link to={'/naujienos'} className={HeaderCSS.link}><FaRegNewspaper /><span>Naujienos</span></Link>
        <div style={{ marginLeft: 'auto' }}>
          <Link to={'/naudotojas'}><BiSolidUserCircle className={HeaderCSS.usericon} /></Link>
        </div>
        <span className={HeaderCSS.usertext}>
          { 
            props.name !== '' 
            ? `Prisijungęs, ${props.name}` 
            : "Neprisijungęs"
          }
        </span>
      </NavBar>
    </div>
  );
}

function NavBar(props){
  return(
    <div className={HeaderCSS.navbar}>
      {props.children}
    </div>
  );
}

export default Header;