import { noticiasMock } from '@data/noticias';

const MOVIMENTOS = [
  { sigla: 'MST', nome: 'Movimento dos Trabalhadores Rurais Sem Terra', emoji: '✊' },
  { sigla: 'MIQCB', nome: 'Movimento Interestadual das Quebradeiras de Coco Babaçu', emoji: '🌴' },
  { sigla: 'FETAEMA', nome: 'Federação dos Trabalhadores Rurais Agricultores e Agricultoras Familiares do Maranhão', emoji: '👐' },
  { sigla: 'CPT', nome: 'Comissão Pastoral da Terra', emoji: '⛪' },
  { sigla: 'MOQUIBOM', nome: 'Movimento Quilombola do Maranhão', emoji: '⭐' },
  { sigla: 'UFMA · UEMA · IFMA', nome: 'Universidades e Instituto Federal parceiros', emoji: '🎓' },
];

const PAUTAS = [
  { emoji: '🏫', titulo: 'Fechamento de escolas', desc: 'Combate ao fechamento e à nucleação forçada de escolas do campo no Maranhão.' },
  { emoji: '🌾', titulo: 'PRONERA', desc: 'Garantia e ampliação do Programa Nacional de Educação na Reforma Agrária.' },
  { emoji: '📚', titulo: 'LEDOC', desc: 'Defesa e expansão da Licenciatura em Educação do Campo (UFMA e outras IES).' },
  { emoji: '🚌', titulo: 'Transporte escolar', desc: 'Transporte digno e seguro para estudantes das comunidades rurais.' },
  { emoji: '📝', titulo: 'Currículo contextualizado', desc: 'Currículo que respeite a identidade e os saberes das populações camponesas.' },
  { emoji: '🔧', titulo: 'Infraestrutura', desc: 'Água potável, saneamento e condições dignas nas escolas do campo.' },
  { emoji: '🌱', titulo: 'Agroecologia', desc: 'Promoção da agroecologia e soberania alimentar como bases do projeto pedagógico.' },
];

const AGENDA = [
  { data: 'Jun/2025', desc: 'Reunião com a Comissão de Educação da ALEMA (Deputados Arnaldo Melo e Júlio Mendonça).', destaque: true },
  { data: 'Abr/2025', desc: 'Nota de repúdio pela interdição do CEFMA em Nina Rodrigues/MA — 90 estudantes afetados.', destaque: true },
  { data: 'Set/2024', desc: 'Participação no Seminário Nacional do FONEC em Brasília — elaboração de documento estratégico.', destaque: false },
  { data: 'Mar/2024', desc: 'I ENECAF em Salvador/BA — carta ao Presidente Lula com demandas de R$ 16,5 milhões para a Educação do Campo.', destaque: false },
  { data: '2017', desc: 'Acordo com o Governo do Estado para cessão do CEFMA como espaço de formação.', destaque: false },
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function FopecPage() {
  const noticiasFopec = noticiasMock.filter(n => n.entidade === 'FOPEC-MA');

  return (
    <>
      {/* HEADER */}
      <div style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)', padding: '60px 24px 72px', textAlign: 'center' }}>
        <div style={{ width: 90, height: 90, background: 'rgba(255,255,255,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42, margin: '0 auto 20px', border: '2px solid rgba(255,255,255,0.3)' }}>🌿</div>
        <div style={{ fontSize: 36, fontWeight: 900, color: 'white', letterSpacing: 2 }}>FOPEC-MA</div>
        <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', marginTop: 8, maxWidth: 560, margin: '8px auto 0', lineHeight: 1.6 }}>
          Fórum Popular de Educação do Campo do Maranhão
        </div>
        <div style={{ display: 'inline-block', marginTop: 16, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 20, padding: '6px 18px', fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
          Articulação Estadual · Sociedade Civil · Vinculado ao FONEC
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '-28px auto 0', padding: '0 24px 60px' }}>

        {/* O QUE É */}
        <div style={{ background: 'white', borderRadius: 12, padding: '36px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1B5E20', marginBottom: 16 }}>O que é o FOPEC-MA</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, marginBottom: 14 }}>
            O <strong>Fórum Popular de Educação do Campo do Maranhão (FOPEC-MA)</strong> é uma articulação estadual autônoma da sociedade civil
            formada por movimentos sociais, sindicatos, organizações populares e universidades que atuam na defesa dos direitos
            das populações camponesas, quilombolas, indígenas, ribeirinhas e extrativistas do Maranhão à educação.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.8 }}>
            Trata-se de uma instância <strong>civil, autônoma e popular</strong> — não governamental — que articula diferentes coletivos sociais
            em torno da pauta da Educação do Campo, das Águas e das Florestas. O FOPEC-MA é a expressão estadual do
            <strong> FONEC (Fórum Nacional de Educação do Campo)</strong>, criado em agosto de 2010.
          </p>
        </div>

        {/* COMPOSIÇÃO */}
        <div style={{ background: 'white', borderRadius: 12, padding: '36px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1B5E20', marginBottom: 6 }}>Composição</h2>
          <p style={{ fontSize: 14, color: 'var(--texto-claro)', marginBottom: 20 }}>Movimentos sociais, sindicatos e instituições que integram o fórum</p>
          {MOVIMENTOS.map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 0', borderBottom: i < MOVIMENTOS.length - 1 ? '1px solid var(--borda)' : 'none' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#E8F5E9', border: '1px solid #A5D6A7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                {m.emoji}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#1B5E20' }}>{m.sigla}</div>
                <div style={{ fontSize: 14, color: 'var(--texto-claro)', marginTop: 2, lineHeight: 1.4 }}>{m.nome}</div>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 14, color: 'var(--texto-claro)', fontStyle: 'italic', fontSize: 14 }}>
            <span style={{ fontSize: 20 }}>•••</span>
            <span>e outros movimentos sociais, pastorais e coletivos populares do campo maranhense.</span>
          </div>
        </div>

        {/* PAUTAS */}
        <div style={{ background: 'white', borderRadius: 12, padding: '36px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1B5E20', marginBottom: 20 }}>Nossas Pautas e Lutas</h2>
          <div className="grade-2">
            {PAUTAS.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '14px', background: '#F9FBE7', borderRadius: 8, border: '1px solid #DCEDC8' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{p.emoji}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--texto)' }}>{p.titulo}</div>
                  <div style={{ fontSize: 13, color: 'var(--texto-claro)', marginTop: 4, lineHeight: 1.5 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AGENDA */}
        <div style={{ background: 'white', borderRadius: 12, padding: '36px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1B5E20', marginBottom: 20 }}>Agenda Recente</h2>
          {AGENDA.map((a, i) => (
            <div key={i} className="agenda-item">
              <div className="agenda-data" style={{ background: a.destaque ? '#1B5E20' : '#757575' }}>{a.data}</div>
              <div className="agenda-desc">{a.desc}</div>
            </div>
          ))}
        </div>

        {/* NOTÍCIAS */}
        {noticiasFopec.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1B5E20', marginBottom: 20 }}>📰 Notícias e Comunicados</h2>
            <div className="grade-2">
              {noticiasFopec.map(n => (
                <a key={n.id} href={`/noticias/${n.id}`} className="card noticia-card" style={{ borderLeft: '4px solid #1B5E20' }}>
                  <div className="card-body">
                    <div style={{ marginBottom: 10 }}>
                      <span className="badge badge-verde">{n.tipo.charAt(0).toUpperCase() + n.tipo.slice(1)}</span>
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
          </div>
        )}

        {/* AVISO */}
        <div className="info-box">
          <p>
            <strong>ℹ️ Nota:</strong> O FOPEC-MA é uma articulação da sociedade civil, distinta do Fórum Estadual de Educação do Maranhão (FEE-MA),
            que é instância governamental. Para mais informações, acesse o site do <a href="https://fonec.org" target="_blank" style={{ color: '#1B5E20', fontWeight: 700 }}>FONEC</a> ou
            dos movimentos sociais que o integram.
          </p>
        </div>

      </div>
    </>
  );
}
