import { noticiasMock } from '@data/noticias';

const TIPO_COR: Record<string, string> = { noticia: '#E65100', evento: '#1B5E20', edital: '#6A1B9A', comunicado: '#01579B' };
const TIPO_LABEL: Record<string, string> = { noticia: 'Notícia', evento: 'Evento', edital: 'Edital', comunicado: 'Comunicado' };

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function NoticiasPage() {
  return (
    <>
      <div className="page-header">
        <h1>📰 Notícias & Eventos</h1>
        <p>{noticiasMock.length} publicações do CREC-MA e parceiros</p>
      </div>
      <div className="content-area">
        <div className="grade-2">
          {noticiasMock.sort((a, b) => b.dataPublicacao.localeCompare(a.dataPublicacao)).map(n => {
            const cor = TIPO_COR[n.tipo] || '#1B5E20';
            return (
              <a key={n.id} href={`/noticias/${n.id}`} className={`card noticia-card ${n.destaque ? 'noticia-destaque' : ''}`}>
                <div className="card-body">
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
                    <span className="badge" style={{ background: cor + '20', color: cor }}>
                      {TIPO_LABEL[n.tipo] || n.tipo}
                    </span>
                    {n.entidade && <span className="noticia-entidade">{n.entidade}</span>}
                    {n.destaque && <span style={{ fontSize: 16 }}>⭐</span>}
                  </div>
                  <div className="noticia-titulo">{n.titulo}</div>
                  <div className="noticia-resumo">{n.resumo}</div>
                  <div className="noticia-meta">
                    <span>📅 {formatDate(n.dataPublicacao)}</span>
                    {n.localEvento && <span>📍 {n.localEvento}</span>}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
