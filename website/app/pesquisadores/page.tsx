export default function PesquisadoresPage() {
  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, #01579B 0%, #0277BD 100%)', padding: '60px 24px', textAlign: 'center', color: 'white' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🔬</div>
          <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 12 }}>Espaço dos Pesquisadores</h1>
          <p style={{ fontSize: 16, opacity: 0.9, lineHeight: 1.6, marginBottom: 32 }}>
            Espaço dedicado a pesquisadores, docentes e membros de movimentos sociais que desenvolvem
            estudos e pesquisas sobre Educação do Campo, das Águas e das Florestas no Maranhão.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/pesquisadores/cadastro" style={{ background: 'white', color: '#01579B', fontWeight: 800, padding: '14px 32px', borderRadius: 10, fontSize: 16, textDecoration: 'none' }}>
              📝 Solicitar Cadastro
            </a>
            <a href="/pesquisadores/admin" style={{ background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.5)', color: 'white', fontWeight: 800, padding: '14px 32px', borderRadius: 10, fontSize: 16, textDecoration: 'none' }}>
              🛡️ Área do Administrador
            </a>
          </div>
        </div>
      </div>

      <div className="content-area">
        <div className="grade-3" style={{ marginBottom: 40 }}>
          {[
            { emoji: '🎓', titulo: 'Universidades e IFs', desc: 'Docentes e pesquisadores de instituições de ensino superior vinculados à Educação do Campo.' },
            { emoji: '🌱', titulo: 'Movimentos Sociais', desc: 'Membros de movimentos como MST, MIQCB, CPT, MAB e outros que realizam pesquisas de campo.' },
            { emoji: '📋', titulo: 'PRONACAMPO', desc: 'Agentes e técnicos vinculados ao Programa Nacional de Educação do Campo no Maranhão.' },
          ].map((item, i) => (
            <div key={i} className="card">
              <div className="card-body" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{item.emoji}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: '#01579B', marginBottom: 8 }}>{item.titulo}</h3>
                <p style={{ fontSize: 13, color: 'var(--texto-claro)', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: 32, background: '#E3F2FD', border: '1px solid #90CAF9' }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#01579B', marginBottom: 12 }}>ℹ️ Como funciona o cadastro?</h3>
          <ol style={{ fontSize: 14, color: '#424242', lineHeight: 2, paddingLeft: 20, margin: 0 }}>
            <li>Clique em <strong>"Solicitar Cadastro"</strong> e preencha seus dados</li>
            <li>Aguarde a <strong>aprovação do administrador</strong> do CREC-MA</li>
            <li>Você será notificado sobre o status do seu cadastro</li>
            <li>Após aprovação, seu perfil estará ativo na base de pesquisadores do CREC-MA</li>
          </ol>
        </div>
      </div>
    </>
  );
}
