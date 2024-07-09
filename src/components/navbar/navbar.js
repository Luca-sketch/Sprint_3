import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import Logo from '../../images/Logo.PNG';
import Cart from '../cart/cart'; // Importe o componente Cart
import { FaUser } from 'react-icons/fa'; // Ícone de pessoa

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
                        'x-api-key': '123123'
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

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/logout', {
                method: 'GET',
                headers: {
                    'x-api-key': '123123'
                },
                credentials: 'include'
            });

            if (response.ok) {
                setIsLoggedIn(false);
                alert('Logout realizado com sucesso!');
                navigate('/');
            } else {
                alert('Erro ao tentar fazer logout.');
            }
        } catch (error) {
            alert('Erro na requisição: ' + error.message);
        }
    };

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
                    {isLoggedIn ? (
                        <li className="nav-item">
                            <FaUser className="nav-links" onClick={handleLogout} style={{ cursor: 'pointer' }} />
                        </li>
                    ) : (
                        <li className="nav-item">
                            <Link to="/login" className="nav-links">
                                Login
                            </Link>
                        </li>
                    )}
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




