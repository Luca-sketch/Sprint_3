import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './usuario.css';

const Usuarios = ({ handleLogout }) => {
    const [compras, setCompras] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        const fetchCompras = async () => {
            try {
                const response = await fetch('http://localhost:5000/ver_compras', {
                    method: 'GET',
                    headers: {
                        'x-api-key': '123123'
                    },
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setCompras(data);
                } else {
                    console.error('Erro ao buscar compras:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao buscar compras:', error);
            }
        };

        fetchCompras();
    }, []);

    const handleDelete = async (compraId) => {
        const formData = new FormData();
        formData.append('compra_id', compraId);

        try {
            const response = await fetch('http://localhost:5000/deletar_compra', {
                method: 'DELETE',
                headers: {
                    'x-api-key': '123123'
                },
                credentials: 'include',
                body: formData
            });

            if (response.ok) {
                alert('Compra deletada com sucesso!');
                setCompras(compras.filter(compra => compra.id !== compraId));
            } else {
                const errorData = await response.json();
                console.error(errorData);
                alert(`Erro ao deletar compra: ${errorData.message}`);
            }
        } catch (error) {
            alert('Erro na requisição: ' + error.message);
        }
    };

    const handleGeneratePDF = async (compraId) => {
        const formData = new FormData();
        formData.append('compra_id', compraId);

        try {
            const response = await fetch('http://localhost:5000/gerar_pdf', {
                method: 'POST',
                headers: {
                    'x-api-key': '123123'
                },
                credentials: 'include',
                body: formData
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `compra_${compraId}.pdf`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            } else {
                const errorData = await response.json();
                console.error(errorData);
                alert(`Erro ao gerar PDF: ${errorData.message}`);
            }
        } catch (error) {
            alert('Erro na requisição: ' + error.message);
        }
    };

    const handleLogoutClick = () => {
        handleLogout();
        history.push('/login');
    };

    return (
        <div className="usuario-container">
            <h2>Minhas Compras</h2>
            <button onClick={handleLogoutClick}>Logout</button>
            {compras.length === 0 ? (
                <p>Você não tem compras registradas.</p>
            ) : (
                <div className="compras-list">
                    {compras.map((compra) => (
                        <div key={compra.id} className="compra-item">
                            <img src={`https://fakestoreapi.com/products/${compra.id}/image`} alt={compra.Produto} className="compra-image" />
                            <div className="compra-details">
                                <h4>{compra.Produto}</h4>
                                <p>{compra.Valor}</p>
                                <p>{compra.Onda}</p>
                            </div>
                            <button onClick={() => handleDelete(compra.id)}>Deletar Compra</button>
                            <button onClick={() => handleGeneratePDF(compra.id)}>Gerar PDF</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Usuarios;
