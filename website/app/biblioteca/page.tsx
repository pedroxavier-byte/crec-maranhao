import { materiaisMock as materiais } from '@data/materiais';

const AREAS: Record<string, string> = {
  agroecologia: 'Agroecologia',
  pedagogia_alternancia: 'Pedagogia da Alternância',
  questao_agraria: 'Questão Agrária',
  cultura_camponesa: 'Cultura Camponesa',
  movimentos_sociais: 'Movimentos Sociais',
  educacao_popular: 'Educação Popular',
  reforma_agraria: 'Reforma Agrária',
  povos_aguas_florestas: 'Povos das Águas e Florestas',
  politicas_publicas: 'Políticas Públicas',
  outro: 'Outro',
};

const TIPO_COR: Record<string, string> = {
  artigo: '#1565C0',
  livro: '#6A1B9A',
  cartilha: '#2E7D32',
  video: '#C62828',
  plano_aula: '#E65100',
  pesquisa: '#4A148C',
  legislacao: '#B71C1C',
  outro: '#757575',
};

export default function BibliotecaPage() {
  const porArea = Object.entries(AREAS).map(([key, label]) => ({
    area: key,
    label,
    total: materiais.filter(m => m.areaTematica === key).length,
  })).filter(a => a.total > 0).sort((a, b) => b.total - a.total);

  return (
    <>
      <div className="page-header">
        <h1>📚 Biblioteca Digital</h1>
        <p>{materiais.length} obras sobre Educação do Campo, Quilombola, Indígena e mais</p>
      </div>

      <div className="content-area">

        {/* ÁREAS TEMÁTICAS */}
        <div className="grade-4" style={{ marginBottom: 40 }}>
          {porArea.map(a => (
            <div key={a.area} className="card">
              <div className="card-body" style={{ textAlign: 'center', padding: '16px' }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--verde)' }}>{a.total}</div>
                <div style={{ fontSize: 13, color: 'var(--texto-claro)', fontWeight: 600, marginTop: 4, lineHeight: 1.4 }}>{a.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* LISTAGEM POR ÁREA */}
        {porArea.map(({ area, label }) => {
          const lista = materiais.filter(m => m.areaTematica === area);
          return (
            <section key={area} style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--verde)', marginBottom: 20 }}>
                📖 {label} ({lista.length})
              </h2>
              <div className="grade-3">
                {lista.map(m => {
                  const cor = TIPO_COR[m.tipo] || '#757575';
                  return (
                    <div key={m.id} className="card">
                      <div className="card-body">
                        <span className="badge" style={{ background: cor + '15', color: cor, marginBottom: 8 }}>
                          {m.tipo.replace('_', ' ')}
                        </span>
                        <div className="material-titulo">{m.titulo}</div>
                        <div className="material-autor">{m.autor} · {m.ano}</div>
                        <p style={{ fontSize: 13, color: 'var(--texto-claro)', marginTop: 8, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as any}>
                          {m.descricao}
                        </p>
                        {m.url && (
                          <a href={m.url} target="_blank" rel="noopener noreferrer" className="material-link">
                            Acessar obra →
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

      </div>
    </>
  );
}
