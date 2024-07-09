import React from 'react';
import dotenv from 'dotenv';
import { useForm } from 'react-hook-form';

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const AtualizarCEP = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('CEP', data.CEP);

    try {
      const response = await fetch('http://localhost:5000/atualizar_cep', {
        method: 'PUT',
        body: formData,
        headers: {
          'Authorization': 'Bearer ' + process.env.REACT_APP_API_KEY
        }
      });

      if (response.ok) {
        alert('CEP atualizado com sucesso!');
      } else {
        const result = await response.json();
        alert(result.message || 'Erro durante a atualização do CEP. Por favor, tente novamente.');
      }
    } catch (error) {
      alert('Erro na requisição: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Atualizar CEP</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>CEP</label>
          <input type="text" {...register('CEP', { required: 'CEP é obrigatório' })} />
          {errors.CEP && <p>{errors.CEP.message}</p>}
        </div>
        <button type="submit">Atualizar CEP</button>
      </form>
    </div>
  );
};

export default AtualizarCEP;

