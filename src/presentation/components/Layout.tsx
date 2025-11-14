import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../application/hooks/useAuth';
import { Button } from './Button';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
        <Link to="/" className="text-lg font-bold text-blue-600">
          QaLite Auth
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              <span className="text-slate-600">Olá, {user.displayName || user.email}</span>
              <Button type="button" variant="secondary" onClick={() => void logout()}>
                Sair
              </Button>
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
        </nav>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-10">{children}</main>
    </div>
  );
};
