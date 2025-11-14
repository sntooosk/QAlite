import { Link } from 'react-router-dom';

import { Layout } from '../components/Layout';

export const ForbiddenPage = () => (
  <Layout>
    <section className="mx-auto max-w-md rounded bg-white p-10 text-center shadow">
      <h1 className="text-3xl font-bold text-red-600">403</h1>
      <p className="mt-4 text-slate-600">
        Você não tem permissão para acessar esta página. Entre em contato com o administrador ou
        volte ao painel inicial.
      </p>
      <Link to="/" className="mt-6 inline-block text-blue-600 hover:underline">
        Voltar para o início
      </Link>
    </section>
  </Layout>
);
