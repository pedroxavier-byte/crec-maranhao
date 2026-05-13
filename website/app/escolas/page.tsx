import { escolasMock } from '@data/escolas';

const ZONA_LABEL: Record<string, string> = { rural: 'Rural', quilombola: 'Quilombola', assentamento: 'Assentamento', ribeirinha: 'Ribeirinha', indigena: 'Indígena', ceffa: 'CEFFA/CFR' };
const ZONA_COR: Record<string, string> = { rural: '#2E7D32', quilombola: '#4A148C', assentamento: '#E65100', ribeirinha: '#01579B', indigena: '#BF360C', ceffa: '#F57F17' };
const ZONA_EMOJI: Record<string, string> = { rural: '🚜', quilombola: '⭐', assentamento: '🏡', ribeirinha: '🌊', indigena: '🪶', ceffa: '🌱' };

const totalAlunos = escolasMock.reduce((s, e) => s + e.totalAlunos, 0);

export default function EscolasPage() {
  const porZona = Object.keys(ZONA_LABEL).map(z => ({
    zona: z,
    total: escolasMock.filter(e => e.zona === z).length,
  })).filter(z => z.total > 0);

  return (
    <>
      <div className="page-header">
        <h1>🏫 Escolas do Campo no Maranhão</h1>
        <p>{escolasMock.length} escolas cadastradas · {totalAlunos.toLocaleString('pt-BR')} alunos</p>
      </div>

      <div className="content-area">

        {/* RESUMO POR TIPO */}
        <div className="grade-4" style={{ marginBottom: 40 }}>
          {porZona.map(z => (
            <div key={z.zona} className="card" style={{ borderTop: `4px solid ${ZONA_COR[z.zona]}` }}>
              <div className="card-body" style={{ textAlign: 'center', padding: '20px 16px' }}>
                <div style={{ fontSize: 30, marginBottom: 6 }}>{ZONA_EMOJI[z.zona]}</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: ZONA_COR[z.zona] }}>{z.total}</div>
                <div style={{ fontSize: 13, color: 'var(--texto-claro)', fontWeight: 600 }}>{ZONA_LABEL[z.zona]}</div>
              </div>
            </div>
          ))}
        </div>

        {/* LISTAGEM POR TIPO */}
        {Object.keys(ZONA_LABEL).map(zona => {
          const lista = escolasMock.filter(e => e.zona === zona);
          if (lista.length === 0) return null;
          const cor = ZONA_COR[zona];
          return (
            <section key={zona} style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: cor, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span>{ZONA_EMOJI[zona]}</span>
                <span>Escolas {ZONA_LABEL[zona]} ({lista.length})</span>
              </h2>
              <div style={{ overflowX: 'auto' }}>
                <table>
                  <thead>
                    <tr>
                      <th>Nome da Escola</th>
                      <th>Município</th>
                      <th>Povo / Comunidade</th>
                      <th>Níveis</th>
                      <th>Alunos</th>
                      <th>Rede</th>
                      <th>Políticas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lista.map(e => (
                      <tr key={e.id}>
                        <td><strong>{e.nome}</strong></td>
                        <td>{e.municipio}</td>
                        <td style={{ fontSize: 13 }}>
                          {e.povo && <span style={{ display: 'block', color: '#BF360C', fontWeight: 600 }}>{e.povo}</span>}
                          {e.terraIndigena && <span style={{ display: 'block', color: 'var(--texto-claro)' }}>{e.terraIndigena}</span>}
                          {!e.povo && e.comunidade && <span style={{ color: 'var(--texto-claro)' }}>{e.comunidade}</span>}
                          {!e.povo && !e.comunidade && '—'}
                        </td>
                        <td>{e.niveis.map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(', ')}</td>
                        <td style={{ fontWeight: 700, color: cor }}>{e.totalAlunos.toLocaleString('pt-BR')}</td>
                        <td>
                          <span className="badge" style={{ background: '#E8F5E9', color: '#1B5E20', fontSize: 11 }}>
                            {e.rede ? e.rede.charAt(0).toUpperCase() + e.rede.slice(1) : '—'}
                          </span>
                        </td>
                        <td style={{ fontSize: 12 }}>
                          {e.politicas && e.politicas.length > 0 ? (
                            <span style={{ color: 'var(--verde)', fontWeight: 600 }}>{e.politicas.length} programas</span>
                          ) : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}

        {/* INFO POLÍTICAS */}
        <div className="info-box">
          <p>
            <strong>Sobre as Políticas Públicas:</strong> Cada escola está cadastrada em programas como PNAE (Alimentação Escolar),
            PNATE (Transporte), PRONACAMPO, PDDE Campo, PNLD Campo/Indígena, Escola da Terra, PROCAMPO, PNEERQ e PNEEI-TEE.
            Para ver os programas de cada escola em detalhes, use o aplicativo CREC-MA.
          </p>
        </div>

      </div>
    </>
  );
}
