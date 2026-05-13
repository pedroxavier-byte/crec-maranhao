import { noticiasMock } from '@data/noticias';
import { notFound } from 'next/navigation';

const TIPO_COR: Record<string, string> = { noticia: '#E65100', evento: '#1B5E20', edital: '#6A1B9A', comunicado: '#01579B' };

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

export function generateStaticParams() {
  return noticiasMock.map(n => ({ id: n.id }));
}

export default function NoticiaPage({ params }: { params: { id: string } }) {
  const noticia = noticiasMock.find(n => n.id === params.id);
  if (!noticia) notFound();

  const cor = TIPO_COR[noticia.tipo] || '#1B5E20';

  return (
    <>
      <div style={{ background: cor, padding: '48px 24px 64px' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <a href="/noticias" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
            ← Voltar para Notícias
          </a>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
              {noticia.tipo.charAt(0).toUpperCase() + noticia.tipo.slice(1)}
            </span>
            {noticia.entidade && (
              <span style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
                {noticia.entidade}
              </span>
            )}
            {noticia.destaque && <span style={{ fontSize: 20 }}>⭐</span>}
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: 'white', lineHeight: 1.3, marginBottom: 16 }}>{noticia.titulo}</h1>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>
            📅 {formatDate(noticia.dataPublicacao)} · {noticia.autor}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 780, margin: '-28px auto 60px', background: 'white', borderRadius: 12, padding: '36px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}>
        <p style={{ fontSize: 17, fontWeight: 600, color: 'var(--texto)', lineHeight: 1.7, marginBottom: 24 }}>{noticia.resumo}</p>

        {noticia.conteudo && (
          <>
            <hr style={{ border: 'none', borderTop: '1px solid var(--borda)', margin: '24px 0' }} />
            {noticia.conteudo.split('\n').filter(p => p.trim()).map((p, i) => (
              <p key={i} style={{ fontSize: 16, color: 'var(--texto-claro)', lineHeight: 1.8, marginBottom: 14 }}>{p}</p>
            ))}
          </>
        )}

        {(noticia.dataEvento || noticia.localEvento) && (
          <>
            <hr style={{ border: 'none', borderTop: '1px solid var(--borda)', margin: '24px 0' }} />
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--texto)', marginBottom: 12 }}>📍 Detalhes do Evento</h3>
            {noticia.dataEvento && <p style={{ marginBottom: 8 }}>📅 Data: <strong>{formatDate(noticia.dataEvento)}</strong></p>}
            {noticia.localEvento && <p>🗺️ Local: <strong>{noticia.localEvento}</strong></p>}
          </>
        )}

        {noticia.tags.length > 0 && (
          <>
            <hr style={{ border: 'none', borderTop: '1px solid var(--borda)', margin: '24px 0' }} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {noticia.tags.map(t => (
                <span key={t} style={{ background: cor + '15', color: cor, padding: '5px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>#{t}</span>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
