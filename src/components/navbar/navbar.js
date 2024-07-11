import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import Logo from '../../images/Logo.PNG';
import Cart from '../cart/cart'; 
import { FaUser } from 'react-icons/fa'; 
import config from '../../config';

const Navbar = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica se o usuário está logado ao carregar o componente
        const checkLoginStatus = async () => {
            try {
                const response = await fetch('http://localhost:5000/check_login', {
                    method: 'GET',
                    headers: {
                        'x-api-key': config.API_KEY,
                    },
                    credentials: 'include'
                });

                setIsLoggedIn(response.status === 200); // Verifica se a resposta é 200 (OK)
            } catch (error) {
                console.error('Erro ao verificar o status de login:', error);
            }
        };

        checkLoginStatus();
    }, []);

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

    const handleUserClick = () => {
        if (isLoggedIn) {
            navigate('/usuarios'); // Redireciona para a página de usuários
        } else {
            navigate('/login'); // Redireciona para a página de login
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src={Logo} alt="Logo" className="navbar-logo-img" />
                </Link>
                <ul className="nav-menu">
                    <li className="nav-item">
                        {isLoggedIn ? (
                            <FaUser className="nav-links user-icon" onClick={handleUserClick} style={{ cursor: 'pointer' }} />
                        ) : (
                            <button className="nav-links"> <Link to="/login" className="nav-links">
                                Login
                            </Link></button>
                        )}
                    </li>
                    <li className="nav-item">
                    <button className="nav-links">  <Link to="/products" className="nav-links" >
                            Produtos
                        </Link></button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-links" onClick={toggleCart}>
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





