'use client';
import { useState } from 'react';

const MUNICIPIOS_MA = [
  'Açailândia', 'Afonso Cunha', 'Água Doce do Maranhão', 'Alcântara', 'Aldeias Altas',
  'Altamira do Maranhão', 'Alto Alegre do Maranhão', 'Alto Alegre do Pindaré', 'Alto Parnaíba',
  'Amapá do Maranhão', 'Amarante do Maranhão', 'Anajatuba', 'Anapurus', 'Apicum-Açu',
  'Araguanã', 'Araioses', 'Arame', 'Arari', 'Axixá', 'Bacabal', 'Bacabeira', 'Bacuri',
  'Bacurituba', 'Balsas', 'Barão de Grajaú', 'Barra do Corda', 'Barreirinhas', 'Bela Vista do Maranhão',
  'Belágua', 'Benedito Leite', 'Bequimão', 'Bernardo do Mearim', 'Boa Vista do Gurupi',
  'Bom Jardim', 'Bom Jesus das Selvas', 'Bom Lugar', 'Brejo', 'Brejo de Areia', 'Buriti',
  'Buriti Bravo', 'Buriticupu', 'Buritirana', 'Cachoeira Grande', 'Cajapió', 'Cajari',
  'Campestre do Maranhão', 'Cândido Mendes', 'Cantanhede', 'Capinzal do Norte', 'Carolina',
  'Carutapera', 'Caxias', 'Cedral', 'Central do Maranhão', 'Centro do Guilherme',
  'Centro Novo do Maranhão', 'Chapadinha', 'Cidelândia', 'Codó', 'Coelho Neto', 'Colinas',
  'Conceição do Lago-Açu', 'Coroatá', 'Cururupu', 'Davinópolis', 'Dom Pedro', 'Duque Bacelar',
  'Esperantinópolis', 'Estreito', 'Feira Nova do Maranhão', 'Fernando Falcão', 'Formosa da Serra Negra',
  'Fortaleza dos Nogueiras', 'Fortuna', 'Godofredo Viana', 'Gonçalves Dias', 'Governador Archer',
  'Governador Edison Lobão', 'Governador Eugênio Barros', 'Governador Luís Rocha', 'Governador Newton Bello',
  'Governador Nunes Freire', 'Governador Ribamar Fiquene', 'Graça Aranha', 'Grajaú', 'Guimarães', 'Humberto de Campos',
  'Icatu', 'Igarapé do Meio', 'Igarapé Grande', 'Imperatriz', 'Itaipava do Grajaú',
  'Itapecuru Mirim', 'Itinga do Maranhão', 'Jatobá', 'Jenipapo dos Vieiras', 'João Lisboa',
  'Joselândia', 'Junco do Maranhão', 'Lago da Pedra', 'Lago do Junco', 'Lago dos Rodrigues',
  'Lago Verde', 'Lagoa do Mato', 'Lagoa Grande do Maranhão', 'Lajeado Novo', 'Lima Campos',
  'Loreto', 'Luís Domingues', 'Magalhães de Almeida', 'Maracaçumé', 'Marajá do Sena',
  'Maranhãozinho', 'Mata Roma', 'Matinha', 'Matões', 'Matões do Norte', 'Milagres do Maranhão',
  'Mirador', 'Miranda do Norte', 'Mirinzal', 'Monção', 'Montes Altos', 'Morros',
  'Nina Rodrigues', 'Nova Colinas', 'Nova Iorque', 'Nova Olinda do Maranhão', 'Olho d\'Água das Cunhãs',
  'Olinda Nova do Maranhão', 'Paço do Lumiar', 'Palmeirândia', 'Paraibano', 'Parnarama',
  'Passagem Franca', 'Pastos Bons', 'Paulino Neves', 'Paulo Ramos', 'Pedreiras', 'Pedro do Rosário',
  'Penalva', 'Peri Mirim', 'Peritoró', 'Pindaré-Mirim', 'Pinheiro', 'Pio XII', 'Pirapemas',
  'Poção de Pedras', 'Porto Franco', 'Porto Rico do Maranhão', 'Presidente Dutra', 'Presidente Juscelino',
  'Presidente Médici', 'Presidente Sarney', 'Presidente Vargas', 'Primeira Cruz', 'Raposa',
  'Riachão', 'Rosário', 'Sambaíba', 'Santa Filomena do Maranhão',
  'Santa Helena', 'Santa Inês', 'Santa Luzia', 'Santa Luzia do Paruá', 'Santa Quitéria do Maranhão',
  'Santa Rita', 'Santana do Maranhão', 'Santo Amaro do Maranhão', 'Santo Antônio dos Lopes',
  'São Benedito do Rio Preto', 'São Bento', 'São Bernardo', 'São Domingos do Azeitão',
  'São Domingos do Maranhão', 'São Félix de Balsas', 'São Félix do Maranhão', 'São Francisco do Brejão',
  'São Francisco do Maranhão', 'São João Batista', 'São João do Carú', 'São João do Paraíso',
  'São João do Sóter', 'São João dos Patos', 'São José de Ribamar', 'São José dos Basílios',
  'São Luís', 'São Luís Gonzaga do Maranhão', 'São Mateus do Maranhão', 'São Pedro da Água Branca',
  'São Pedro dos Crentes', 'São Raimundo das Mangabeiras', 'São Raimundo do Doca Bezerra',
  'São Roberto', 'São Vicente Ferrer', 'Satubinha', 'Senador Alexandre Costa', 'Senador La Rocque',
  'Serrano do Maranhão', 'Sítio Novo', 'Sucupira do Norte', 'Sucupira do Riachão', 'Tasso Fragoso',
  'Timbiras', 'Timon', 'Trizidela do Vale', 'Tufilândia', 'Tuntum', 'Turiaçu', 'Turilândia',
  'Tutóia', 'Urbano Santos', 'Vargem Grande', 'Viana', 'Vila Nova dos Martírios', 'Vitória do Mearim',
  'Vitorino Freire', 'Zé Doca',
];

export default function CadastroAgentePage() {
  const [form, setForm] = useState({
    nome: '', cpf: '', email: '', senha: '', telefone: '',
    municipios: [] as string[], organizacao: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [erro, setErro] = useState('');

  const handleMunicipio = (mun: string) => {
    setForm(f => ({
      ...f,
      municipios: f.municipios.includes(mun)
        ? f.municipios.filter(m => m !== mun)
        : [...f.municipios, mun],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErro('');

    if (form.municipios.length === 0) {
      setErro('Selecione pelo menos um município de atuação.');
      setStatus('error');
      return;
    }

    try {
      const response = await fetch('/api/cadastro-agente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome,
          cpf: form.cpf,
          email: form.email,
          senha: form.senha,
          telefone: form.telefone,
          municipios: form.municipios,
          organizacao: form.organizacao,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErro(result.error || 'Erro ao realizar cadastro. Tente novamente.');
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch (err: any) {
      setErro(err?.message || 'Erro ao realizar cadastro. Verifique sua conexão e tente novamente.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="content-area" style={{ maxWidth: 600, textAlign: 'center', paddingTop: 80 }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>✅</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--verde)', marginBottom: 12 }}>
          Cadastro enviado com sucesso!
        </h2>
        <p style={{ fontSize: 15, color: 'var(--texto-claro)', lineHeight: 1.6, marginBottom: 24 }}>
          Seu cadastro foi recebido e está <strong>aguardando aprovação</strong> do administrador do CREC-MA.
          Você receberá um email quando sua conta for aprovada.
        </p>
        <a href="/agentes" className="btn btn-verde">Voltar ao Portal</a>
      </div>
    );
  }

  return (
    <>
      <div style={{ background: 'var(--verde)', padding: '40px 24px', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 8 }}>📝 Solicitação de Cadastro</h1>
        <p style={{ opacity: 0.85, fontSize: 14 }}>Agente Territorial — CREC-MA</p>
      </div>

      <div className="content-area" style={{ maxWidth: 700 }}>
        <form onSubmit={handleSubmit}>

          {/* DADOS PESSOAIS */}
          <div className="card" style={{ padding: 28, marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--verde)', marginBottom: 20 }}>👤 Dados Pessoais</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Nome completo *</label>
                <input style={inputStyle} required value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} placeholder="Seu nome completo" />
              </div>
              <div>
                <label style={labelStyle}>CPF *</label>
                <input style={inputStyle} required value={form.cpf} onChange={e => setForm(f => ({ ...f, cpf: e.target.value }))} placeholder="000.000.000-00" />
              </div>
              <div>
                <label style={labelStyle}>Telefone *</label>
                <input style={inputStyle} required value={form.telefone} onChange={e => setForm(f => ({ ...f, telefone: e.target.value }))} placeholder="(99) 99999-9999" />
              </div>
              <div>
                <label style={labelStyle}>Email *</label>
                <input style={inputStyle} type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="seu@email.com" />
              </div>
              <div>
                <label style={labelStyle}>Senha *</label>
                <input style={inputStyle} type="password" required minLength={6} value={form.senha} onChange={e => setForm(f => ({ ...f, senha: e.target.value }))} placeholder="Mínimo 6 caracteres" />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Organização / Movimento Social</label>
                <input style={inputStyle} value={form.organizacao} onChange={e => setForm(f => ({ ...f, organizacao: e.target.value }))} placeholder="Ex: MST, MIQCB, FETAEMA, CPT..." />
              </div>
            </div>
          </div>

          {/* MUNICÍPIOS */}
          <div className="card" style={{ padding: 28, marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--verde)', marginBottom: 8 }}>
              🗺️ Municípios de Atuação *
            </h3>
            <p style={{ fontSize: 13, color: 'var(--texto-claro)', marginBottom: 16 }}>
              Selecione o(s) município(s) onde irá atuar como agente territorial:
            </p>
            {form.municipios.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                {form.municipios.map(m => (
                  <span key={m} onClick={() => handleMunicipio(m)} style={{ background: 'var(--verde)', color: 'white', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                    {m} ✕
                  </span>
                ))}
              </div>
            )}
            <div style={{ maxHeight: 220, overflowY: 'auto', border: '1px solid var(--verde-borda)', borderRadius: 8, padding: 12 }}>
              {MUNICIPIOS_MA.map(mun => (
                <label key={mun} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', cursor: 'pointer', fontSize: 13 }}>
                  <input type="checkbox" checked={form.municipios.includes(mun)} onChange={() => handleMunicipio(mun)} />
                  {mun}
                </label>
              ))}
            </div>
          </div>

          {erro && (
            <div style={{ background: '#FFEBEE', border: '1px solid #FFCDD2', borderRadius: 8, padding: 14, marginBottom: 16, color: '#C62828', fontSize: 14 }}>
              ⚠️ {erro}
            </div>
          )}

          <button type="submit" disabled={status === 'loading'} style={{ width: '100%', background: 'var(--verde)', color: 'white', border: 'none', borderRadius: 10, padding: '16px', fontSize: 16, fontWeight: 800, cursor: 'pointer', opacity: status === 'loading' ? 0.7 : 1 }}>
            {status === 'loading' ? '⏳ Enviando cadastro...' : '📝 Enviar Solicitação de Cadastro'}
          </button>
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--texto-claro)', marginTop: 12 }}>
            Já tem cadastro aprovado? <a href="/agentes/login" style={{ color: 'var(--verde)', fontWeight: 700 }}>Entrar no portal</a>
          </p>
        </form>
      </div>
    </>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 700, color: '#424242', marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: '100%', border: '1px solid #E0E0E0', borderRadius: 8, padding: '10px 12px', fontSize: 14, outline: 'none', boxSizing: 'border-box' };
