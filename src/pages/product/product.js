import React, { useEffect, useState } from 'react';
import { useCart } from '../../CartContext';
import './product.css';

const Product = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Erro ao carregar os produtos:', error));
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    return (
        <div className="products-container">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.title} className="product-image" />
                    <h3>{product.title}</h3>
                    <p>{product.price}</p>
                    <button onClick={() => handleAddToCart(product)}>Adicionar ao Carrinho</button>
                </div>
            ))}
        </div>
    );
};

export default Product;

