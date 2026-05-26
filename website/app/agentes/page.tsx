export default function AgentesPage() {
  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)', padding: '60px 24px', textAlign: 'center', color: 'white' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🗺️</div>
          <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 12 }}>Portal dos Agentes Territoriais</h1>
          <p style={{ fontSize: 16, opacity: 0.9, lineHeight: 1.6, marginBottom: 32 }}>
            Espaço exclusivo para os 49 Agentes Territoriais do CREC-MA registrarem pesquisas nas escolas e ações nas secretarias municipais de educação do Maranhão.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/agentes/login" style={{ background: 'white', color: '#1B5E20', fontWeight: 800, padding: '14px 32px', borderRadius: 10, fontSize: 16, textDecoration: 'none' }}>
              🔐 Entrar no Portal
            </a>
            <a href="/agentes/cadastro" style={{ background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.5)', color: 'white', fontWeight: 800, padding: '14px 32px', borderRadius: 10, fontSize: 16, textDecoration: 'none' }}>
              📝 Solicitar Cadastro
            </a>
            <a href="/agentes/territoriais" style={{ background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.5)', color: 'white', fontWeight: 800, padding: '14px 32px', borderRadius: 10, fontSize: 16, textDecoration: 'none' }}>
              👥 Conheça os Agentes Territoriais
            </a>
          </div>
        </div>
      </div>

      <div className="content-area">
        <div className="grade-3" style={{ marginBottom: 40 }}>
          {[
            { emoji: '🏫', titulo: 'Pesquisa nas Escolas', desc: 'Registre visitas e dados coletados nas escolas do campo, quilombolas e indígenas do seu município.' },
            { emoji: '🏛️', titulo: 'Ações nas Secretarias', desc: 'Documente reuniões e articulações realizadas nas secretarias municipais de educação.' },
            { emoji: '📊', titulo: 'Acompanhamento', desc: 'Visualize todas as suas atividades registradas e o status de aprovação dos seus relatórios.' },
          ].map((item, i) => (
            <div key={i} className="card">
              <div className="card-body" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{item.emoji}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--verde)', marginBottom: 8 }}>{item.titulo}</h3>
                <p style={{ fontSize: 13, color: 'var(--texto-claro)', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: 32, background: '#FFF8E1', border: '1px solid #FFE082' }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#E65100', marginBottom: 12 }}>ℹ️ Como funciona o acesso?</h3>
          <ol style={{ fontSize: 14, color: '#424242', lineHeight: 2, paddingLeft: 20, margin: 0 }}>
            <li>Clique em <strong>"Solicitar Cadastro"</strong> e preencha seus dados</li>
            <li>Aguarde a <strong>aprovação do administrador</strong> do CREC-MA</li>
            <li>Você receberá um <strong>email de confirmação</strong> quando aprovado</li>
            <li>Entre com email e senha no <strong>"Portal do Agente"</strong></li>
          </ol>
        </div>
      </div>
    </>
  );
}
