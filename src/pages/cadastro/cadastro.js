import React from 'react';
import { useForm } from 'react-hook-form';
import './cadastro.css';

const Cadastro = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('Email', data.Email);
    formData.append('Senha', data.Senha);
    formData.append('CEP', data.CEP);

    try {
      const response = await fetch('http://localhost:5000/cadastro', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
      } else if (response.status === 409) {
        alert('Email já cadastrado. Digite um email diferente.');
      } else {
        alert('Não foi possível salvar novo usuário.');
      }
    } catch (error) {
      alert('Erro na requisição: ' + error.message);
    }
  };

  return (
    <div className="cadastro-container">
        <h2>Cadastro de Usuário</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Email</label>
                <input 
                    type="email" 
                    {...register('Email', { required: 'Email é obrigatório' })} 
                />
                {errors.Email && <p>{errors.Email.message}</p>}
            </div>
            <div>
                <label>Senha</label>
                <input 
                    type="password" 
                    {...register('Senha', { required: 'Senha é obrigatória' })} 
                />
                {errors.Senha && <p>{errors.Senha.message}</p>}
            </div>
            <div>
                <label>CEP</label>
                <input 
                    type="text" 
                    {...register('CEP', { required: 'CEP é obrigatório' })} 
                />
                {errors.CEP && <p>{errors.CEP.message}</p>}
            </div>
            <button type="submit">Cadastrar</button>
        </form>
    </div>
);
};

export default Cadastro;

