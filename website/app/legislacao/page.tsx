import { legislacaoMock } from '@data/legislacao';

const AMBITO_COR: Record<string, string> = { federal: '#C62828', estadual: '#1565C0', municipal: '#2E7D32' };
const AMBITO_LABEL: Record<string, string> = { federal: 'Federal', estadual: 'Estadual', municipal: 'Municipal' };

export default function LegislacaoPage() {
  const federal = legislacaoMock.filter(l => l.ambito === 'federal');
  const estadual = legislacaoMock.filter(l => l.ambito === 'estadual');
  const municipal = legislacaoMock.filter(l => l.ambito === 'municipal');
  const grupos = [
    { ambito: 'federal', label: 'Federal', lista: federal },
    { ambito: 'estadual', label: 'Estadual', lista: estadual },
    { ambito: 'municipal', label: 'Municipal', lista: municipal },
  ].filter(g => g.lista.length > 0);

  return (
    <>
      <div className="page-header">
        <h1>⚖️ Legislação</h1>
        <p>{legislacaoMock.length} instrumentos legais sobre Educação do Campo no Maranhão e no Brasil</p>
      </div>

      <div className="content-area">

        {/* RESUMO */}
        <div className="grade-3" style={{ marginBottom: 40 }}>
          {grupos.map(g => (
            <div key={g.ambito} className="stat-card" style={{ borderTopColor: AMBITO_COR[g.ambito] }}>
              <div className="stat-numero" style={{ color: AMBITO_COR[g.ambito] }}>{g.lista.length}</div>
              <div className="stat-label">Âmbito {g.label}</div>
            </div>
          ))}
        </div>

        {/* LISTAGEM */}
        {grupos.map(g => (
          <section key={g.ambito} style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: AMBITO_COR[g.ambito], marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
              ⚖️ {AMBITO_LABEL[g.ambito]} ({g.lista.length})
            </h2>
            {g.lista.map(lei => (
              <div key={lei.id} className="card" style={{ marginBottom: 14, borderLeft: `4px solid ${AMBITO_COR[g.ambito]}` }}>
                <div className="card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                        <span className="badge" style={{ background: AMBITO_COR[g.ambito] + '20', color: AMBITO_COR[g.ambito] }}>
                          {AMBITO_LABEL[g.ambito]}
                        </span>
                        <span className="badge badge-verde">{(lei as any).tipo || 'Lei'}</span>
                        {(lei as any).destaque && <span style={{ fontSize: 16 }}>⭐</span>}
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--texto)', marginBottom: 4 }}>
                        {(lei as any).numero || lei.titulo}
                      </div>
                      <div style={{ fontSize: 15, color: 'var(--texto-claro)', marginBottom: 8, lineHeight: 1.5 }}>
                        {lei.titulo}
                      </div>
                      <div style={{ fontSize: 14, color: 'var(--texto-claro)', lineHeight: 1.6, background: 'var(--fundo)', padding: '10px 14px', borderRadius: 6, borderLeft: '3px solid var(--borda)' }}>
                        {(lei as any).ementa || lei.titulo}
                      </div>
                      {(lei as any).tags && (
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                          {(lei as any).tags.map((t: string) => (
                            <span key={t} style={{ fontSize: 12, background: 'var(--verde-claro)', color: 'var(--verde)', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {(lei as any).url && (
                      <a href={(lei as any).url} target="_blank" rel="noopener noreferrer"
                        style={{ background: AMBITO_COR[g.ambito], color: 'white', padding: '10px 18px', borderRadius: 8, fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>
                        Acessar →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>
        ))}

      </div>
    </>
  );
}
