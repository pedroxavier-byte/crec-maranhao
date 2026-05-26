export default function CensoEscolarPage() {
  return (
    <>
      <div style={{ background: '#01579B', padding: '32px 24px', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 8 }}>📊 Painéis Estatísticos do Censo Escolar</h1>
        <p style={{ opacity: 0.85, fontSize: 14 }}>
          Dados e indicadores educacionais do campo — Maranhão
        </p>
      </div>

      <div style={{ background: '#E3F2FD', padding: '16px 32px', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13, color: '#01579B', fontWeight: 600 }}>
          📌 Fonte: INEP / MEC — Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira
        </span>
        <a
          href="https://app.powerbi.com/view?r=eyJrIjoiN2ViNDBjNDEtMTM0OC00ZmFhLWIyZWYtZjI1YjU0NzQzMTJhIiwidCI6IjI2ZjczODk3LWM4YWMtNGIxZS05NzhmLWVhNGMwNzc0MzRiZiJ9"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 13, color: '#01579B', fontWeight: 700, textDecoration: 'underline' }}
        >
          🔗 Abrir em tela cheia
        </a>
      </div>

      <div style={{ width: '100%', height: 'calc(100vh - 200px)', minHeight: 600 }}>
        <iframe
          title="Painéis Estatísticos do Censo Escolar"
          src="https://app.powerbi.com/view?r=eyJrIjoiN2ViNDBjNDEtMTM0OC00ZmFhLWIyZWYtZjI1YjU0NzQzMTJhIiwidCI6IjI2ZjczODk3LWM4YWMtNGIxZS05NzhmLWVhNGMwNzc0MzRiZiJ9"
          style={{ width: '100%', height: '100%', border: 'none' }}
          allowFullScreen
        />
      </div>
    </>
  );
}
