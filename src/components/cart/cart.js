import React from 'react';
import { useCart } from '../../CartContext';
import './cart.css';

const Cart = ({ closeCart }) => {
    const { cartItems, removeFromCart } = useCart();

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
            </div>
        </div>
    );
};

export default Cart;


