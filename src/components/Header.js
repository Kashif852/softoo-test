import React, { useState, useContext } from 'react'
import Menu from './svg/bars-solid.svg'
import Close from './svg/times-solid.svg'
import CartIcon from './svg/shopping-cart-solid.svg'
import {Link} from 'react-router-dom'
import './css/Header.css'
import {DataContext} from "./Context"

function Header() {
    const dataContext = useContext(DataContext);
    const [toggle, setToggle] = useState(false)
    const menuToggle = () =>{
        setToggle(!toggle)
    }
    return (
        <header>
            <div className="menu" onClick={menuToggle}>
                <img src={Menu} alt="" width="20"/>
            </div>
            <div className="logo">
                <h1><Link to="/">Softoo</Link></h1>
            </div>
            <nav>
                <ul className={toggle ? "toggle" : ""}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/product">Product</Link></li>
                    <li className="close" onClick={menuToggle}>
                        <img src={Close} alt="" width="20"/>
                    </li>
                </ul>
                <div className="nav-cart">
                    <span>{dataContext?.data?.cart?.length}</span>
                    <Link to="/cart">
                        <img src={CartIcon} alt="" width="20"/>
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Header
