import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import Logo from '../../images/Logo.PNG';
import Cart from '../cart/cart'; // Importe o componente Cart

const Navbar = () => {
    const [cartOpen, setCartOpen] = useState(false);

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src={Logo} alt="Logo" className="navbar-logo-img" />
                </Link>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/login" className="nav-links">
                            Login
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/products" className="nav-links">
                            Produtos
                        </Link>
                    </li>
                    <li className="nav-item">
                        <button className="nav-links cart-button" onClick={toggleCart}>
                            Carrinho
                        </button>
                    </li>
                </ul>
            </div>
            {cartOpen && <Cart closeCart={toggleCart} />}
        </nav>
    );
};

export default Navbar;


