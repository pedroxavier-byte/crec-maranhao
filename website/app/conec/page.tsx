import { noticiasMock } from '@data/noticias';

const noticiasConec = noticiasMock.filter(n =>
  n.tags?.some(t => t.toLowerCase().includes('conec'))
);

const MEMBROS_PUBLICO = [
  { nome: 'SEDUC-MA', desc: 'Secretaria de Estado da Educação — Presidência do CONEC', emoji: '🏛️' },
  { nome: 'UFMA', desc: 'Universidade Federal do Maranhão', emoji: '🎓' },
  { nome: 'UEMA', desc: 'Universidade Estadual do Maranhão', emoji: '🎓' },
  { nome: 'IFMA', desc: 'Instituto Federal do Maranhão', emoji: '🎓' },
  { nome: 'INCRA', desc: 'Instituto Nacional de Colonização e Reforma Agrária', emoji: '🗺️' },
  { nome: 'SAF', desc: 'Secretaria da Agricultura Familiar', emoji: '🌱' },
  { nome: 'AGERP', desc: 'Agência Estadual de Pesquisa Agropecuária e Extensão Rural', emoji: '🌾' },
  { nome: 'ITERMA', desc: 'Instituto de Terras do Maranhão', emoji: '📋' },
];

const MEMBROS_CIVIL = [
  { nome: 'MST', desc: 'Movimento dos Trabalhadores Rurais Sem Terra', emoji: '✊' },
  { nome: 'UNDIME-MA', desc: 'União Nacional dos Dirigentes Municipais de Educação', emoji: '🏫' },
  { nome: 'ACONERUQ', desc: 'Associação das Comunidades Negras Rurais Quilombolas do Maranhão', emoji: '⭐' },
  { nome: 'ASSEMA', desc: 'Associação em Áreas de Assentamento no Estado do Maranhão', emoji: '🏡' },
];

const COMPETENCIAS = [
  'Fortalecer as políticas públicas de Educação do Campo no Maranhão',
  'Construir a Lei Estadual de Educação do Campo',
  'Coordenar ações em todos os níveis e etapas educacionais',
  'Realizar bienalmente o Seminário Estadual de Educação do Campo',
  'Estimular metodologias diferenciadas nas escolas do campo',
  'Representar o Maranhão nos fóruns nacionais de Educação do Campo',
  'Estimular a criação de comissões municipais de Educação do Campo',
  'Articular as políticas federais (PRONACAMPO) com as ações estaduais',
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function ConecPage() {
  return (
    <>
      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #01579B 0%, #0277BD 60%, #0288D1 100%)', padding: '60px 24px', textAlign: 'center', color: 'white' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🤝</div>
          <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8, lineHeight: 1.2 }}>Comitê-MA</h1>
          <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 16 }}>
            Comitê Executivo Estadual de Educação do Campo do Maranhão (CONEC)
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 20, padding: '6px 16px', fontSize: 13, fontWeight: 700 }}>
              Reativado em Janeiro de 2024
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 20, padding: '6px 16px', fontSize: 13, fontWeight: 700 }}>
              46 membros · Presidência: SEDUC-MA
            </div>
          </div>
        </div>
      </div>

      <div className="content-area">

        {/* O QUE É */}
        <div className="card" style={{ marginBottom: 32, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#01579B', marginBottom: 16 }}>🏛️ O que é o CONEC?</h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--texto)', marginBottom: 12 }}>
            O <strong>Comitê Executivo Estadual de Educação do Campo do Maranhão (CONEC)</strong> é o principal espaço de articulação interinstitucional entre o poder público e a sociedade civil em defesa das políticas de Educação do Campo no estado.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--texto)', marginBottom: 20 }}>
            Criado em <strong>2003</strong> e institucionalizado em <strong>2007</strong>, o CONEC é presidido pela <strong>SEDUC-MA</strong> e reúne <strong>46 membros</strong> de instituições públicas e organizações da sociedade civil, com coordenação executiva de <strong>Patrícia Carlos de Sousa</strong>.
          </p>

          {/* HISTÓRICO */}
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#01579B', marginBottom: 14 }}>📅 Histórico</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { ano: '2003', texto: 'Criação do CONEC no I Seminário Estadual de Educação do Campo', cor: '#01579B' },
              { ano: '2007', texto: 'Institucionalização no II Seminário Estadual (maio de 2007)', cor: '#0277BD' },
              { ano: '2020', texto: 'Comitê entra em inatividade', cor: '#C62828' },
              { ano: 'Jan 2024', texto: 'Reativação no Palácio dos Leões com governador em exercício Felipe Camarão e 46 membros', cor: '#01579B' },
              { ano: '2025', texto: 'III Seminário Estadual previsto e Lei Estadual de Educação do Campo em construção', cor: '#1B5E20' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ background: item.cor + '15', color: item.cor, fontWeight: 800, fontSize: 12, padding: '4px 10px', borderRadius: 6, minWidth: 72, textAlign: 'center', flexShrink: 0 }}>
                  {item.ano}
                </div>
                <p style={{ fontSize: 14, color: 'var(--texto)', lineHeight: 1.5, margin: 0 }}>{item.texto}</p>
              </div>
            ))}
          </div>
        </div>

        {/* COMPETÊNCIAS */}
        <div className="card" style={{ marginBottom: 32, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#01579B', marginBottom: 16 }}>📋 Competências</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {COMPETENCIAS.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: '#E3F2FD', borderRadius: 8, padding: '12px 14px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#01579B', flexShrink: 0, marginTop: 6 }}></span>
                <span style={{ fontSize: 13, color: '#0277BD', fontWeight: 600, lineHeight: 1.5 }}>{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MEMBROS */}
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#01579B', marginBottom: 20 }}>👥 Composição do CONEC</h2>

        <h3 style={{ fontSize: 17, fontWeight: 800, color: '#01579B', marginBottom: 14 }}>🏛️ Poder Público (13 instituições)</h3>
        <div className="grade-4" style={{ marginBottom: 32 }}>
          {MEMBROS_PUBLICO.map((m, i) => (
            <div key={i} className="card">
              <div className="card-body" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{m.emoji}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#01579B', marginBottom: 4 }}>{m.nome}</div>
                <div style={{ fontSize: 12, color: 'var(--texto-claro)', lineHeight: 1.4 }}>{m.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: 17, fontWeight: 800, color: '#1B5E20', marginBottom: 14 }}>✊ Sociedade Civil</h3>
        <div className="grade-4" style={{ marginBottom: 40 }}>
          {MEMBROS_CIVIL.map((m, i) => (
            <div key={i} className="card" style={{ borderTop: '3px solid #1B5E20' }}>
              <div className="card-body" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{m.emoji}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#1B5E20', marginBottom: 4 }}>{m.nome}</div>
                <div style={{ fontSize: 12, color: 'var(--texto-claro)', lineHeight: 1.4 }}>{m.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* NOTÍCIAS */}
        {noticiasConec.length > 0 && (
          <>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#01579B', marginBottom: 20 }}>📰 Notícias do CONEC</h2>
            <div className="grade-3" style={{ marginBottom: 40 }}>
              {noticiasConec.map(n => (
                <a key={n.id} href={`/noticias/${n.id}`} className="card noticia-card">
                  <div className="card-body">
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
