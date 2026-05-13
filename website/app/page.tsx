import { escolasMock } from '@data/escolas';
import { noticiasMock } from '@data/noticias';
import { materiaisMock as materiais } from '@data/materiais';

const totalAlunos = escolasMock.reduce((s, e) => s + e.totalAlunos, 0);
const destaques = noticiasMock.filter(n => n.destaque).slice(0, 3);
const TIPO_COR: Record<string, string> = { noticia: '#E65100', evento: '#1B5E20', edital: '#6A1B9A', comunicado: '#01579B' };

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <h1 className="hero-titulo">Centro de Referência de Educação do Campo, das Águas e das Florestas do Maranhão</h1>
            <p className="hero-sub">
              Fortalecemos a educação do campo, quilombola, indígena, ribeirinha e extrativista no Maranhão.
              Acesse escolas, biblioteca, notícias e políticas públicas de Educação do Campo.
            </p>
            <div className="hero-btns">
              <a href="/escolas" className="btn btn-verde" style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.4)' }}>Explorar Escolas</a>
              <a href="/biblioteca" className="btn btn-outline">Ver Biblioteca</a>
            </div>
            <div className="hero-slogan">
              "Política Nacional de Educação do Campo, das Águas e das Florestas"
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="hero-emblema"><img src="/logo.png" alt="CREC-MA" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} /></div>
          </div>
        </div>
      </section>

      <div className="container">

        {/* ESTATÍSTICAS */}
        <div className="stats-grid" style={{ marginTop: 40 }}>
          {[
            { num: escolasMock.length, label: 'Escolas Cadastradas', icone: '🏫' },
            { num: totalAlunos.toLocaleString('pt-BR'), label: 'Alunos Atendidos', icone: '👩‍🎓' },
            { num: materiais.length, label: 'Materiais na Biblioteca', icone: '📚' },
            { num: 217, label: 'Municípios do Maranhão', icone: '🗺️' },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icone}</div>
              <div className="stat-numero">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* DESTAQUES */}
        <section className="secao">
          <div className="secao-header">
            <div>
              <h2 className="secao-titulo">Destaques</h2>
              <p className="secao-sub">Notícias e eventos recentes do CREC-MA</p>
            </div>
            <a href="/noticias" className="ver-mais">Ver todas →</a>
          </div>
          <div className="grade-3">
            {destaques.map(n => (
              <a key={n.id} href={`/noticias/${n.id}`} className={`card noticia-card ${n.destaque ? 'noticia-destaque' : ''}`}>
                <div className="card-body">
                  <div className="noticia-tipo">
                    <span className="badge" style={{ background: TIPO_COR[n.tipo] + '20', color: TIPO_COR[n.tipo] }}>
                      {n.tipo.charAt(0).toUpperCase() + n.tipo.slice(1)}
                    </span>
                    {n.entidade && <span className="noticia-entidade" style={{ marginLeft: 6 }}>{n.entidade}</span>}
                  </div>
                  <div className="noticia-titulo">{n.titulo}</div>
                  <div className="noticia-resumo">{n.resumo}</div>
                  <div className="noticia-meta">
                    <span>📅 {formatDate(n.dataPublicacao)}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ESCOLAS */}
        <section className="secao" style={{ paddingTop: 0 }}>
          <div className="secao-header">
            <div>
              <h2 className="secao-titulo">Escolas do Campo no Maranhão</h2>
              <p className="secao-sub">{escolasMock.length} escolas quilombolas, indígenas, CEFFA e do campo cadastradas</p>
            </div>
            <a href="/escolas" className="ver-mais">Ver todas →</a>
          </div>
          <div className="grade-3">
            {[
              { zona: 'quilombola', emoji: '⭐', cor: '#4A148C', label: 'Quilombolas', num: escolasMock.filter(e => e.zona === 'quilombola').length },
              { zona: 'indigena', emoji: '🪶', cor: '#BF360C', label: 'Indígenas', num: escolasMock.filter(e => e.zona === 'indigena').length },
              { zona: 'ceffa', emoji: '🌱', cor: '#F57F17', label: 'CEFFA / CFR', num: escolasMock.filter(e => e.zona === 'ceffa').length },
              { zona: 'assentamento', emoji: '🏡', cor: '#E65100', label: 'Assentamentos', num: escolasMock.filter(e => e.zona === 'assentamento').length },
              { zona: 'ribeirinha', emoji: '🌊', cor: '#01579B', label: 'Ribeirinhas', num: escolasMock.filter(e => e.zona === 'ribeirinha').length },
              { zona: 'rural', emoji: '🚜', cor: '#2E7D32', label: 'Rurais', num: escolasMock.filter(e => e.zona === 'rural').length },
            ].map(z => (
              <a key={z.zona} href={`/escolas?zona=${z.zona}`} className="card" style={{ borderTop: `4px solid ${z.cor}` }}>
                <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: z.cor + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                    {z.emoji}
                  </div>
                  <div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: z.cor }}>{z.num}</div>
                    <div style={{ fontSize: 14, color: 'var(--texto-claro)', fontWeight: 600 }}>Escolas {z.label}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* FOPEC BANNER */}
        <section style={{ paddingBottom: 60 }}>
          <div className="fopec-banner">
            <div>
              <h2>🌿 FOPEC-MA</h2>
              <p style={{ marginTop: 8 }}>
                <strong style={{ color: 'rgba(255,255,255,0.95)' }}>Fórum Popular de Educação do Campo do Maranhão</strong> — articulação estadual autônoma
                da sociedade civil que reúne movimentos sociais, sindicatos, universidades e organizações populares
                em defesa do direito à Educação do Campo no Maranhão.
              </p>
              <p style={{ marginTop: 12, color: 'rgba(255,255,255,0.75)', fontSize: 14 }}>
                MST · MIQCB · FETAEMA · CPT · MOQUIBOM · UFMA · UEMA · IFMA · e outros
              </p>
              <a href="/fopec" className="btn btn-outline" style={{ marginTop: 20, display: 'inline-block' }}>
                Conheça o FOPEC-MA →
              </a>
            </div>
            <div className="fopec-emblema">🌿</div>
          </div>
        </section>

        {/* BIBLIOTECA */}
        <section className="secao" style={{ paddingTop: 0 }}>
          <div className="secao-header">
            <div>
              <h2 className="secao-titulo">Biblioteca Digital</h2>
              <p className="secao-sub">{materiais.length} obras, artigos, cartilhas e pesquisas sobre Educação do Campo</p>
            </div>
            <a href="/biblioteca" className="ver-mais">Ver biblioteca →</a>
          </div>
          <div className="grade-3">
            {materiais.slice(0, 6).map(m => (
              <div key={m.id} className="card">
                <div className="card-body">
                  <span className="badge badge-verde material-tipo">{m.tipo.replace('_', ' ')}</span>
                  <div className="material-titulo">{m.titulo}</div>
                  <div className="material-autor">{m.autor} · {m.ano}</div>
                  {m.url && (
                    <a href={m.url} target="_blank" className="material-link">Acessar →</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* APP DOWNLOAD */}
        <section style={{ paddingBottom: 60 }}>
          <div style={{ background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)', borderRadius: 'var(--raio)', padding: '40px', textAlign: 'center', border: '1px solid var(--verde-borda)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📱</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--verde)', marginBottom: 8 }}>Baixe o Aplicativo CREC-MA</h2>
            <p style={{ fontSize: 16, color: 'var(--texto-claro)', maxWidth: 500, margin: '0 auto 24px' }}>
              Acesse todas as funcionalidades do CREC-MA no seu celular. Disponível em breve na Google Play Store.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <a href="https://play.google.com/store" target="_blank" className="btn btn-verde" style={{ background: 'var(--verde)' }}>
                📲 Google Play (Em breve)
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
