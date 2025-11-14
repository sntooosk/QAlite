import { Layout } from '../components/Layout';

export const UserDashboardPage = () => (
  <Layout>
    <section className="rounded bg-white p-8 shadow">
      <h1 className="text-2xl font-bold text-slate-800">Área do usuário</h1>
      <p className="mt-4 text-slate-600">
        Bem-vindo! Aqui você pode visualizar dados pessoais, acompanhar atividades e acessar módulos
        liberados para o seu perfil.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded border border-slate-200 p-4">
          <h2 className="text-lg font-semibold text-slate-700">Suas ações</h2>
          <p className="mt-2 text-sm text-slate-600">Personalize este painel conforme novos recursos forem implementados.</p>
        </div>
        <div className="rounded border border-slate-200 p-4">
          <h2 className="text-lg font-semibold text-slate-700">Próximos recursos</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
            <li>Módulo de tarefas pessoais</li>
            <li>Notificações em tempo real</li>
            <li>Integração com calendários externos</li>
          </ul>
        </div>
      </div>
    </section>
  </Layout>
);
