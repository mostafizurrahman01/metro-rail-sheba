import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Header.css';
import logo from '../../images/Logo7.png';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser.name);
    const history = useHistory();
    const handleSignIn = () => {
        history.replace("/login")
    }
    return (
        <div className="header">
            <nav className="nav">
                <ul>
                    <li>
                        <img className="logo" src={logo} alt="" ></img>                      
                    </li>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/destination/B016F3M89M">Destination</Link>
                    </li>
                    <li>
                        <Link to="/blog">Blog</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    {
                        <li className="userName">{loggedInUser.name || loggedInUser.displayName}</li>
                    }
                    <li>
                        {
                            loggedInUser.email ? <button className="btn-modify" onClick={() => setLoggedInUser({})}>Logout</button> : <button className="btn-modify" onClick={handleSignIn} >Login</button>
                        }
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;