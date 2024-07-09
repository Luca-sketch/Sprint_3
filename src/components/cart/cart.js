import React from 'react';
import { useCart } from '../../CartContext';
import './cart.css';

const Cart = ({ closeCart }) => {
    const { cartItems, removeFromCart } = useCart();

    const handleBuy = async () => {
        const formData = new FormData();
        cartItems.forEach((item, index) => {
            formData.append(`Produto`, item.title);
            formData.append(`Valor`, item.price);
            formData.append(`Onda`, new Date().toISOString()); // Adiciona a data atual
        });

        // Log the form data to verify it
        for (let pair of formData.entries()) {
            console.log(pair[0]+ ': ' + pair[1]);
        }

        try {
            const response = await fetch('http://localhost:5000/carrinho', {
                method: 'POST',
                headers: {
                    'x-api-key': '123123'
                },
                credentials: 'include',
                body: formData
            });

            if (response.ok) {
                alert('Compra realizada com sucesso!');
            } else {
                const errorData = await response.json();
                console.error(errorData);
                alert(`Erro ao realizar compra: ${errorData.message}`);
            }
        } catch (error) {
            alert('Erro na requisição: ' + error.message);
        }
    };

    return (
        <div className="cart-overlay">
            <div className="cart">
                <button className="close-cart" onClick={closeCart}>X</button>
                <h2>Carrinho</h2>
                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <p>Seu carrinho está vazio</p>
                    ) : (
                        cartItems.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img src={item.image} alt={item.title} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h4>{item.title}</h4>
                                    <p>{item.price}</p>
                                </div>
                                <button className="remove-item" onClick={() => removeFromCart(index)}>🗑️</button>
                            </div>
                        ))
                    )}
                </div>
                {cartItems.length > 0 && (
                    <button className="buy-button" onClick={handleBuy}>Comprar</button>
                )}
            </div>
        </div>
    );
};

export default Cart;





