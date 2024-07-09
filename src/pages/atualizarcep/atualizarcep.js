import React from 'react';
import { useForm } from 'react-hook-form';
import config from '../../config';

const AtualizarCEP = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('CEP', data.CEP);

    try {
      const response = await fetch('http://localhost:5000/atualizar_cep', {
        method: 'PUT',
        headers: {
          'x-api-key': config.API_KEY,
        },
        body: formData,
        credentials: 'include', // Ensure cookies are sent
      });

      if (response.ok) {
        alert('CEP atualizado com sucesso!');
      } else {
        const errorData = await response.json();
        alert(`Erro ao atualizar CEP: ${errorData.message}`);
      }
    } catch (error) {
      alert('Erro na requisição: ' + error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('http://localhost:5000/deletar_usuario', {
        method: 'DELETE',
        headers: {
          'x-api-key': config.API_KEY,
        },
        credentials: 'include', // Ensure cookies are sent
      });

      if (response.ok) {
        alert('Usuário deletado com sucesso!');
      } else {
        const errorData = await response.json();
        alert(`Erro ao deletar usuário: ${errorData.message}`);
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
      <button onClick={handleDelete} style={{ marginTop: '20px', backgroundColor: 'red', color: 'white' }}>
        Deletar Usuário
      </button>
    </div>
  );
};

export default AtualizarCEP;
