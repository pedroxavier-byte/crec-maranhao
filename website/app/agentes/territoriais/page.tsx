const AGENTES = [
  {
    ure: 'Açailândia',
    agentes: ['Eliane Almeida Diniz', 'Marcos Antônio Alves da Silva'],
  },
  {
    ure: 'Bacabal',
    agentes: ['Saara Silva da Silva', 'Jose de Ribamar Souza Vieira'],
  },
  {
    ure: 'Balsas',
    agentes: ['Eliane Maria Pereira'],
  },
  {
    ure: 'Barra do Corda',
    agentes: ['Makson de Sousa Santos', 'Gisele da Silva'],
  },
  {
    ure: 'Caxias',
    agentes: ['Sergio Boaventura Carvalho', 'Francisca Caroline Teixeira da Silva'],
  },
  {
    ure: 'Chapadinha',
    agentes: ['Maria Amanda Coelho da Cruz', 'Douglas Leão da Silva'],
  },
  {
    ure: 'Codó',
    agentes: ['Ozemias Cavalcante Lima', 'Joyciara Alvim Muniz'],
  },
  {
    ure: 'Imperatriz',
    agentes: ['Mikaellen S. Silva', 'Glaucia dos Reis Moura Fernandes'],
  },
  {
    ure: 'Itapecuru Mirim',
    agentes: ['José de Ribamar Nascimento Filho', 'José Carlos da Silva Fernandes'],
  },
  {
    ure: 'Pedreiras',
    agentes: ['Luís Santos Vieira Neto'],
  },
  {
    ure: 'Pinheiro',
    agentes: ['Josiane Santos da Silva', 'Mayara Regina Lisboa F. Bentes', 'João Batista Gomes da Silva'],
  },
  {
    ure: 'Presidente Dutra',
    agentes: ['Dhelbson Relwlety das Chagas Pereira', 'Antônia Mayra Nascimento da Silva'],
  },
  {
    ure: 'Rosário',
    agentes: ['Maria do Socorro Viana Pereira', 'Ivanildo Carvalho Rodrigues', 'Luzilene dos Santos Sousa'],
  },
  {
    ure: 'São João dos Patos',
    agentes: ['Felix Ferreira Sandes', 'Kerollaynne da Silva Sá'],
  },
  {
    ure: 'Santa Inês',
    agentes: ['Leide Daiana Teixeira Barros', 'Leonardo Lisboa Sousa', 'Francisca Raquel Ramos dos Santos'],
  },
  {
    ure: 'Timon',
    agentes: ['Lindete Martins Santos', 'Jeane Ferreira Aires'],
  },
  {
    ure: 'Viana',
    agentes: ['Raimundo Nonato dos Santos Moraes', 'José Maria Mendonça'],
  },
  {
    ure: 'Zé Doca',
    agentes: ['Francisco de Assis Costa', 'Maria Francisca dos Anjos Silva', 'Maria Elizabete da Silva e Silva'],
  },
  {
    ure: 'São Luís',
    agentes: ['Cristiane Mendes do Nascimento', 'Cristiane Rego Pinheiro', 'Soraia França Weba dos Santos'],
  },
  {
    ure: 'Lago da Pedra',
    agentes: ['Raul de Jesus Santos', 'Rafael Lima Nascimento'],
  },
];

const total = AGENTES.reduce((acc, u) => acc + u.agentes.length, 0);

export default function AgentesTerritoriaísPage() {
  return (
    <>
      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 60%, #388E3C 100%)', padding: '48px 24px', textAlign: 'center', color: 'white' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🗺️</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>Agentes de Governança Territorial</h1>
        <p style={{ fontSize: 15, opacity: 0.9, marginBottom: 16 }}>
          Política Nacional de Educação do Campo — Novo PRONACAMPO
        </p>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 20, padding: '6px 20px', fontSize: 14, fontWeight: 700 }}>
          {total} agentes · {AGENTES.length} municípios polo
        </div>
      </div>

      {/* INFO */}
      <div style={{ background: '#E8F5E9', padding: '16px 32px', borderBottom: '1px solid #C8E6C9' }}>
        <p style={{ fontSize: 13, color: '#2E7D32', fontWeight: 600, textAlign: 'center', margin: 0 }}>
          📋 Resultado da seleção simplificada — Portaria MEC nº 538, de 24 de julho de 2025 · SEDUC-MA
        </p>
      </div>

      {/* LISTA */}
      <div className="content-area" style={{ maxWidth: 900 }}>
        <div className="grade-3" style={{ gap: 16 }}>
          {AGENTES.map((ure, i) => (
            <div key={i} className="card" style={{ borderTop: '4px solid #2E7D32' }}>
              <div className="card-body">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ background: '#2E7D32', color: 'white', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, flexShrink: 0 }}>
                    {i + 1}
                  </span>
                  <div style={{ fontSize: 16, fontWeight: 900, color: '#1B5E20' }}>
                    📍 {ure.ure}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {ure.agentes.map((nome, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', background: '#F1F8E9', borderRadius: 8, fontSize: 13, color: '#33691E', fontWeight: 600 }}>
                      <span>👤</span> {nome}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 10, fontSize: 12, color: '#9E9E9E', textAlign: 'right' }}>
                  {ure.agentes.length} agente{ure.agentes.length > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, padding: 20, background: '#F3E5F5', borderRadius: 12, borderLeft: '4px solid #7B1FA2', textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: '#4A148C', fontWeight: 600, margin: 0 }}>
            🏛️ Seleção coordenada pela SEDUC-MA · Agente Estadual de Governança: Jocenilson M. Costa (Matrícula nº 00098271-03)
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, marginBottom: 16 }}>
          <a href="/agentes" style={{ color: 'var(--verde)', fontWeight: 700, fontSize: 14 }}>← Voltar ao Portal dos Agentes</a>
        </div>
      </div>
    </>
  );
}
