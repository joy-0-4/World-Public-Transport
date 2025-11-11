import { Link } from "react-router-dom"

function Header() {
  return (
    <div className='header'>
        <img className='logo' src='wpt.png' height={40} />
        <h4><Link className="headerLink" to="/">Home</Link></h4>
        <h4><Link className="headerLink" to="/newCompany">Add company</Link></h4>
        <h4><Link className="headerLink" to="/aboutUs">About us</Link></h4>
    </div>
  );
}

export default Header