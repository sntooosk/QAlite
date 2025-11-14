import { Layout } from '../components/Layout';

export const AdminDashboardPage = () => (
  <Layout>
    <section className="rounded bg-white p-8 shadow">
      <h1 className="text-2xl font-bold text-slate-800">Painel administrativo</h1>
      <p className="mt-4 text-slate-600">
        Esta área é restrita a administradores. Utilize este espaço para gerenciar usuários, papéis
        e configurações avançadas.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded border border-slate-200 p-4">
          <h2 className="text-lg font-semibold text-slate-700">Próximos passos</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
            <li>Adicionar relatórios avançados</li>
            <li>Gerenciar permissões por módulo</li>
            <li>Integrar com sistemas externos</li>
          </ul>
        </div>
        <div className="rounded border border-slate-200 p-4">
          <h2 className="text-lg font-semibold text-slate-700">Usuários ativos</h2>
          <p className="mt-2 text-sm text-slate-600">
            Conecte-se ao Firestore para carregar métricas em tempo real ou integre com outro
            provedor no futuro.
          </p>
        </div>
      </div>
    </section>
  </Layout>
);
