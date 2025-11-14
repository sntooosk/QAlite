import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../application/hooks/useAuth';
import { Alert } from '../components/Alert';
import { Button } from '../components/Button';
import { Layout } from '../components/Layout';
import { Spinner } from '../components/Spinner';
import { TextInput } from '../components/TextInput';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, error, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!email || !password) {
      setFormError('Preencha e-mail e senha.');
      return;
    }

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-md rounded bg-white p-8 shadow">
        <h1 className="mb-6 text-2xl font-bold text-slate-800">Entrar</h1>
        {formError && <Alert type="error" message={formError} />}
        {error && <Alert type="error" message={error} />}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextInput
            id="email"
            label="E-mail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <TextInput
            id="password"
            label="Senha"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Autenticando...' : 'Entrar'}
          </Button>
        </form>
        {isLoading && <Spinner />}
        <div className="mt-4 text-sm text-slate-600">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Esqueci minha senha
          </Link>
        </div>
        <div className="mt-2 text-sm text-slate-600">
          Não tem conta?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Cadastre-se
          </Link>
        </div>
      </div>
    </Layout>
  );
};
