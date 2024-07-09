import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('Email', data.Email);
    formData.append('Senha', data.Senha);

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const usuario = await response.json();
        alert('Login realizado com sucesso! Usuário: ' + JSON.stringify(usuario));
      } else if (response.status === 401) {
        alert('Email ou senha incorretos.');
      } else {
        alert('Erro ao tentar logar.');
      }
    } catch (error) {
      alert('Erro na requisição: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Login de Usuário</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input type="email" {...register('Email', { required: 'Email é obrigatório' })} />
          {errors.Email && <p>{errors.Email.message}</p>}
        </div>
        <div>
          <label>Senha</label>
          <input type="password" {...register('Senha', { required: 'Senha é obrigatória' })} />
          {errors.Senha && <p>{errors.Senha.message}</p>}
        </div>
        <button type="submit">Logar</button>
        <br></br>
        <button ><Link to="/usuario">Cadastrar</Link></button>
      </form>
    </div>
  );
};

export default Login;

