import { Link } from 'react-router-dom';

import { useAuth } from '../../application/hooks/useAuth';
import { Layout } from '../components/Layout';

export const HomePage = () => {
  const { user, hasRole } = useAuth();

  return (
    <Layout>
      <section className="rounded bg-white p-8 shadow">
        <h1 className="text-2xl font-bold text-slate-800">Bem-vindo ao QaLite Auth</h1>
        {user ? (
          <p className="mt-4 text-slate-600">
            Você está autenticado como <strong>{user.displayName || user.email}</strong> com o papel
            <strong> {user.role}</strong>.
          </p>
        ) : (
          <p className="mt-4 text-slate-600">
            Faça login ou crie uma conta para acessar os dashboards protegidos.
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          {user ? (
            <>
              <Link to="/dashboard" className="text-blue-600 hover:underline">
                Dashboard do usuário
              </Link>
              {hasRole(['admin']) && (
                <Link to="/admin" className="text-blue-600 hover:underline">
                  Painel administrativo
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 hover:underline">
                Entrar
              </Link>
              <Link to="/register" className="text-blue-600 hover:underline">
                Criar conta
              </Link>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};
