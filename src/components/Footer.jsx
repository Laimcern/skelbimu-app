import FooterCSS from './Footer.module.css';

function Footer(){
    return (
      <div className={FooterCSS.footer}>
        <p>Pasirinkta tema: Skelbimų portalas. Puslapyje turėtų būt galima įkelti ivarius skelbimus, 
            bei peržiūrėti kitų naudotojų skelbimus. Skelbimai grupuojami pagal kategorijas, skelbimai gali turėti daug kategorijų.</p>
        <br/>
        <p>@Laimis Černiauskas</p>
      </div>
    );
}
export default Footer;