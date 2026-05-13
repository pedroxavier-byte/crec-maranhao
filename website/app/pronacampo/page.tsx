import { noticiasMock } from '@data/noticias';
import { legislacaoMock } from '@data/legislacao';

const noticiasPronacampo = noticiasMock.filter(n =>
  n.tags?.some(t => t.toLowerCase().includes('pronacampo'))
);

const legislacaoPronacampo = legislacaoMock.filter(l =>
  l.tags?.some(t => t.toLowerCase().includes('pronacampo'))
);

const EIXOS = [
  {
    num: '1', titulo: 'Gestão e Práticas Pedagógicas', cor: '#1565C0',
    acoes: ['Calendário escolar diferenciado (ciclos agrícolas)', 'Material didático contextualizado — PNLD Campo e Indígena', 'Apoio às escolas multisseriadas', 'Pedagogia da Alternância (CEFFAs e CFRs)'],
  },
  {
    num: '2', titulo: 'Formação de Professores', cor: '#6A1B9A',
    acoes: ['PROCAMPO — Licenciatura em Educação do Campo', 'Escola da Terra — Classes multisseriadas', 'PARFOR — Formação de professores leigos', 'Especialização em Pedagogia da Alternância'],
  },
  {
    num: '3', titulo: 'EJA e Educação Profissional', cor: '#E65100',
    acoes: ['PRONERA — Educação na Reforma Agrária', 'EJA integrada à formação profissional no campo', 'Alfabetização de jovens e adultos camponeses', 'PRONATEC Campo — cursos técnicos'],
  },
  {
    num: '4', titulo: 'Infraestrutura', cor: '#BF360C',
    acoes: ['PDDE Campo — Manutenção e melhoria das escolas', 'PDDE Água e Esgoto nas escolas', 'Construção e reforma de escolas do campo', 'Transporte escolar — PNATE'],
  },
];

const PROGRAMAS = [
  { nome: 'PROCAMPO', desc: 'Licenciatura em Educação do Campo nas universidades', emoji: '🎓' },
  { nome: 'Escola da Terra', desc: 'Formação para professores de classes multisseriadas', emoji: '🌱' },
  { nome: 'PRONERA', desc: 'Educação para assentados da reforma agrária', emoji: '🏡' },
  { nome: 'PNLD Campo', desc: 'Livros didáticos para escolas do campo e quilombolas', emoji: '📚' },
  { nome: 'PNLD Indígena', desc: 'Material didático em línguas indígenas', emoji: '🪶' },
  { nome: 'PDDE Campo', desc: 'Recursos para manutenção das escolas do campo', emoji: '🏗️' },
  { nome: 'PNATE', desc: 'Apoio ao transporte escolar rural', emoji: '🚌' },
  { nome: 'PARFOR', desc: 'Formação inicial de professores em exercício', emoji: '👩‍🏫' },
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function PronacampoPage() {
  return (
    <>
      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 60%, #388E3C 100%)', padding: '60px 24px', textAlign: 'center', color: 'white' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🌱</div>
          <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 12, lineHeight: 1.2 }}>
            Novo PRONACAMPO
          </h1>
          <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 8 }}>
            Política Nacional de Educação do Campo, das Águas e das Florestas
          </p>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 20, padding: '6px 16px', fontSize: 13, fontWeight: 700, marginTop: 8 }}>
            Portaria MEC nº 538, de 24 de julho de 2025
          </div>
        </div>
      </div>

      <div className="content-area">

        {/* O QUE É */}
        <div className="card" style={{ marginBottom: 32, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--verde)', marginBottom: 16 }}>🌿 O que é o Novo PRONACAMPO?</h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--texto)', marginBottom: 12 }}>
            O <strong>Programa Nacional de Educação do Campo, das Águas e das Florestas</strong> — Novo PRONACAMPO — é a principal política pública federal de educação para as populações que vivem e trabalham no campo, nas águas e nas florestas do Brasil.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--texto)', marginBottom: 12 }}>
            Instituído pela <strong>Portaria MEC nº 538, de 24 de julho de 2025</strong>, o programa resgata e amplia o PRONACAMPO original (2013), incorporando comunidades ribeirinhas, pescadores artesanais, extrativistas e povos das florestas como sujeitos de direito.
          </p>

          {/* SUJEITOS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginTop: 20 }}>
            {[
              { emoji: '🚜', label: 'Agricultores familiares e assentados' },
              { emoji: '⭐', label: 'Comunidades quilombolas' },
              { emoji: '🪶', label: 'Povos indígenas' },
              { emoji: '🌊', label: 'Ribeirinhos e pescadores artesanais' },
              { emoji: '🌿', label: 'Extrativistas e povos das florestas' },
              { emoji: '🏡', label: 'Acampados e assentados da reforma agrária' },
            ].map((s, i) => (
              <div key={i} style={{ background: '#E8F5E9', borderRadius: 8, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{s.emoji}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#2E7D32', lineHeight: 1.4 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* HISTÓRICO */}
        <div className="card" style={{ marginBottom: 32, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--verde)', marginBottom: 20 }}>📅 Histórico</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { ano: '2010', texto: 'Decreto 7.352 institui a Política de Educação do Campo e o PRONERA', cor: '#1565C0' },
              { ano: '2013', texto: 'Portaria MEC nº 86 cria o PRONACAMPO com 4 eixos estruturantes', cor: '#2E7D32' },
              { ano: '2019–22', texto: 'Desmonte das políticas de Educação do Campo no governo anterior', cor: '#C62828' },
              { ano: '2023', texto: 'Retomada e reconstrução das políticas no governo Lula/SECADI', cor: '#E65100' },
              { ano: '2025', texto: 'Portaria MEC nº 538 institui o Novo PRONACAMPO ampliado para águas e florestas', cor: '#1B5E20' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ background: item.cor + '15', color: item.cor, fontWeight: 800, fontSize: 12, padding: '4px 10px', borderRadius: 6, minWidth: 60, textAlign: 'center', flexShrink: 0 }}>
                  {item.ano}
                </div>
                <p style={{ fontSize: 14, color: 'var(--texto)', lineHeight: 1.5, margin: 0 }}>{item.texto}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4 EIXOS */}
        <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--verde)', marginBottom: 20 }}>🏛️ Os 4 Eixos do Novo PRONACAMPO</h2>
        <div className="grade-2" style={{ marginBottom: 40 }}>
          {EIXOS.map(eixo => (
            <div key={eixo.num} className="card" style={{ borderTop: `4px solid ${eixo.cor}` }}>
              <div className="card-body">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: eixo.cor, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, flexShrink: 0 }}>
                    {eixo.num}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: eixo.cor, margin: 0 }}>{eixo.titulo}</h3>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {eixo.acoes.map((acao, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8, fontSize: 13, color: 'var(--texto)', lineHeight: 1.5 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: eixo.cor, flexShrink: 0, marginTop: 6 }}></span>
                      {acao}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* PROGRAMAS */}
        <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--verde)', marginBottom: 20 }}>⚙️ Programas e Ações</h2>
        <div className="grade-4" style={{ marginBottom: 40 }}>
          {PROGRAMAS.map((prog, i) => (
            <div key={i} className="card">
              <div className="card-body" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{prog.emoji}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--verde)', marginBottom: 6 }}>{prog.nome}</div>
                <div style={{ fontSize: 12, color: 'var(--texto-claro)', lineHeight: 1.4 }}>{prog.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* LEGISLAÇÃO */}
        {legislacaoPronacampo.length > 0 && (
          <>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--verde)', marginBottom: 20 }}>⚖️ Legislação</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
              {legislacaoPronacampo.map(l => (
                <div key={l.id} className="card">
                  <div className="card-body">
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                      <div style={{ background: '#E8F5E9', borderRadius: 8, padding: '8px 12px', textAlign: 'center', flexShrink: 0 }}>
                        <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--verde)', textTransform: 'uppercase' }}>{l.tipo}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--verde)', marginBottom: 4 }}>{l.titulo}</div>
                        <div style={{ fontSize: 12, color: 'var(--texto-claro)', marginBottom: 8 }}>{l.numero} · {new Date(l.dataPublicacao).toLocaleDateString('pt-BR')}</div>
                        <p style={{ fontSize: 13, color: 'var(--texto)', lineHeight: 1.5, margin: 0 }}>{l.descricao}</p>
                        {l.url && (
                          <a href={l.url} target="_blank" rel="noopener noreferrer" className="material-link" style={{ marginTop: 8, display: 'inline-block' }}>
                            Acessar documento →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* NOTÍCIAS */}
        {noticiasPronacampo.length > 0 && (
          <>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--verde)', marginBottom: 20 }}>📰 Notícias sobre o PRONACAMPO</h2>
            <div className="grade-3" style={{ marginBottom: 40 }}>
              {noticiasPronacampo.map(n => (
                <a key={n.id} href={`/noticias/${n.id}`} className="card noticia-card">
                  <div className="card-body">
                    {n.entidade && (
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#1B5E20', background: '#E8F5E9', display: 'inline-block', padding: '3px 8px', borderRadius: 4, marginBottom: 8 }}>
                        {n.entidade}
                      </div>
                    )}
                    <div className="noticia-titulo">{n.titulo}</div>
                    <div className="noticia-resumo">{n.resumo}</div>
                    <div className="noticia-meta">📅 {formatDate(n.dataPublicacao)}</div>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

      </div>
    </>
  );
}
