import { FormEvent, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AVAILABLE_ROLES } from '../../domain/entities/Role';
import type { Role } from '../../domain/entities/Role';
import { useAuth } from '../../application/hooks/useAuth';
import { Alert } from '../components/Alert';
import { Button } from '../components/Button';
import { Layout } from '../components/Layout';
import { Spinner } from '../components/Spinner';
import { TextInput } from '../components/TextInput';

const MIN_PASSWORD_LENGTH = 8;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, error, isLoading } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('user');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const isPasswordStrong = useMemo(() => password.length >= MIN_PASSWORD_LENGTH, [password]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!displayName || !email || !password || !confirmPassword) {
      setFormError('Todos os campos são obrigatórios.');
      return;
    }

    const emailRegex = /[^@\s]+@[^@\s]+\.[^@\s]+/;
    if (!emailRegex.test(email)) {
      setFormError('Informe um e-mail válido.');
      return;
    }

    if (!isPasswordStrong) {
      setFormError(`A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`);
      return;
    }

    if (password !== confirmPassword) {
      setFormError('As senhas não conferem.');
      return;
    }

    try {
      await register({ email, password, displayName, role });
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-lg rounded bg-white p-8 shadow">
        <h1 className="mb-6 text-2xl font-bold text-slate-800">Criar conta</h1>
        {formError && <Alert type="error" message={formError} />}
        {error && <Alert type="error" message={error} />}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextInput
            id="displayName"
            label="Nome completo"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            required
          />
          <TextInput
            id="email"
            label="E-mail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Papel
            <select
              id="role"
              value={role}
              onChange={(event) => setRole(event.target.value as Role)}
              className="rounded border border-slate-300 px-3 py-2 text-base shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {AVAILABLE_ROLES.map((availableRole) => (
                <option key={availableRole} value={availableRole}>
                  {availableRole}
                </option>
              ))}
            </select>
          </label>
          <TextInput
            id="password"
            label="Senha"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <TextInput
            id="confirmPassword"
            label="Confirme a senha"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
          <p className={`text-xs ${isPasswordStrong ? 'text-green-600' : 'text-red-600'}`}>
            Senha com no mínimo {MIN_PASSWORD_LENGTH} caracteres.
          </p>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Criando conta...' : 'Cadastrar'}
          </Button>
        </form>
        {isLoading && <Spinner />}
        <div className="mt-4 text-sm text-slate-600">
          Já tem conta?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Entrar
          </Link>
        </div>
      </div>
    </Layout>
  );
};
