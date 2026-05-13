'use client';
import { useState, useEffect } from 'react';
import { supabase, AgenteTerritorial, PesquisaEscola, AcaoSecretaria } from '../../lib/supabase';

export default function PortalAgentePage() {
  const [agente, setAgente] = useState<AgenteTerritorial | null>(null);
  const [pesquisas, setPesquisas] = useState<PesquisaEscola[]>([]);
  const [acoes, setAcoes] = useState<AcaoSecretaria[]>([]);
  const [aba, setAba] = useState<'inicio' | 'pesquisas' | 'acoes' | 'nova-pesquisa' | 'nova-acao'>('inicio');
  const [loading, setLoading] = useState(true);

  // Formulário pesquisa
  const [formPesquisa, setFormPesquisa] = useState({ escola_nome: '', municipio: '', data_visita: '', observacoes: '' });
  // Formulário ação
  const [formAcao, setFormAcao] = useState({ municipio: '', data_acao: '', descricao: '' });
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.href = '/agentes/login'; return; }

    const { data: ag } = await supabase.from('agentes_territoriais').select('*').eq('user_id', user.id).single();
    if (!ag || ag.status !== 'aprovado') { window.location.href = '/agentes/login'; return; }
    setAgente(ag);

    const { data: pesq } = await supabase.from('pesquisas_escolas').select('*').eq('agente_id', ag.id).order('created_at', { ascending: false });
    setPesquisas(pesq || []);

    const { data: ac } = await supabase.from('acoes_secretarias').select('*').eq('agente_id', ag.id).order('created_at', { ascending: false });
    setAcoes(ac || []);
    setLoading(false);
  }

  async function salvarPesquisa(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    const { error } = await supabase.from('pesquisas_escolas').insert({ agente_id: agente?.id, ...formPesquisa, status: 'enviado' });
    if (!error) {
      setMsg('✅ Pesquisa registrada com sucesso!');
      setFormPesquisa({ escola_nome: '', municipio: '', data_visita: '', observacoes: '' });
      setAba('pesquisas');
      carregarDados();
    } else {
      setMsg('❌ Erro ao salvar. Tente novamente.');
    }
    setSalvando(false);
  }

  async function salvarAcao(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    let documento_url = '';
    let documento_nome = '';

    if (arquivo) {
      const nomeArquivo = `${agente?.id}/${Date.now()}_${arquivo.name}`;
      const { data: upload } = await supabase.storage.from('documentos').upload(nomeArquivo, arquivo);
      if (upload) {
        const { data: url } = supabase.storage.from('documentos').getPublicUrl(nomeArquivo);
        documento_url = url.publicUrl;
        documento_nome = arquivo.name;
      }
    }

    const { error } = await supabase.from('acoes_secretarias').insert({ agente_id: agente?.id, ...formAcao, documento_url, documento_nome });
    if (!error) {
      setMsg('✅ Ação registrada com sucesso!');
      setFormAcao({ municipio: '', data_acao: '', descricao: '' });
      setArquivo(null);
      setAba('acoes');
      carregarDados();
    } else {
      setMsg('❌ Erro ao salvar. Tente novamente.');
    }
    setSalvando(false);
  }

  async function sair() {
    await supabase.auth.signOut();
    window.location.href = '/agentes';
  }

  if (loading) return <div style={{ textAlign: 'center', padding: 80, fontSize: 18 }}>⏳ Carregando...</div>;

  return (
    <>
      {/* HEADER */}
      <div style={{ background: 'var(--verde)', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, fontWeight: 600 }}>Portal do Agente Territorial — CREC-MA</div>
          <div style={{ color: 'white', fontSize: 18, fontWeight: 900 }}>👋 Olá, {agente?.nome.split(' ')[0]}!</div>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>{agente?.municipios?.join(', ')}</div>
        </div>
        <button onClick={sair} style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', color: 'white', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
          Sair →
        </button>
      </div>

      {/* ABAS */}
      <div style={{ background: 'white', borderBottom: '2px solid #E0E0E0', display: 'flex', padding: '0 24px', gap: 4, overflowX: 'auto' }}>
        {[
          { id: 'inicio', label: '🏠 Início' },
          { id: 'pesquisas', label: `🏫 Pesquisas (${pesquisas.length})` },
          { id: 'acoes', label: `🏛️ Ações (${acoes.length})` },
          { id: 'nova-pesquisa', label: '➕ Nova Pesquisa' },
          { id: 'nova-acao', label: '➕ Nova Ação' },
        ].map(a => (
          <button key={a.id} onClick={() => { setAba(a.id as any); setMsg(''); }}
            style={{ padding: '14px 16px', border: 'none', background: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer', borderBottom: aba === a.id ? '3px solid var(--verde)' : '3px solid transparent', color: aba === a.id ? 'var(--verde)' : '#757575', whiteSpace: 'nowrap' }}>
            {a.label}
          </button>
        ))}
      </div>

      <div className="content-area">
        {msg && <div style={{ background: msg.includes('✅') ? '#E8F5E9' : '#FFEBEE', border: `1px solid ${msg.includes('✅') ? '#A5D6A7' : '#FFCDD2'}`, borderRadius: 8, padding: 14, marginBottom: 20, color: msg.includes('✅') ? '#1B5E20' : '#C62828', fontWeight: 600 }}>{msg}</div>}

        {/* INÍCIO */}
        {aba === 'inicio' && (
          <div>
            <div className="grade-3" style={{ marginBottom: 32 }}>
              {[
                { num: pesquisas.length, label: 'Pesquisas Registradas', emoji: '🏫', cor: '#1B5E20' },
                { num: acoes.length, label: 'Ações nas Secretarias', emoji: '🏛️', cor: '#01579B' },
                { num: pesquisas.filter(p => p.status === 'enviado').length, label: 'Enviadas', emoji: '✅', cor: '#2E7D32' },
              ].map((s, i) => (
                <div key={i} className="card">
                  <div className="card-body" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 36, marginBottom: 8 }}>{s.emoji}</div>
                    <div style={{ fontSize: 36, fontWeight: 900, color: s.cor }}>{s.num}</div>
                    <div style={{ fontSize: 13, color: 'var(--texto-claro)', fontWeight: 600 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grade-2">
              <button onClick={() => setAba('nova-pesquisa')} style={{ background: 'var(--verde)', color: 'white', border: 'none', borderRadius: 12, padding: 24, textAlign: 'center', cursor: 'pointer', fontSize: 16, fontWeight: 800 }}>
                🏫 Registrar Pesquisa em Escola
              </button>
              <button onClick={() => setAba('nova-acao')} style={{ background: '#01579B', color: 'white', border: 'none', borderRadius: 12, padding: 24, textAlign: 'center', cursor: 'pointer', fontSize: 16, fontWeight: 800 }}>
                🏛️ Registrar Ação em Secretaria
              </button>
            </div>
          </div>
        )}

        {/* LISTA DE PESQUISAS */}
        {aba === 'pesquisas' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--verde)' }}>🏫 Pesquisas nas Escolas</h2>
              <button onClick={() => setAba('nova-pesquisa')} style={{ background: 'var(--verde)', color: 'white', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 700 }}>+ Nova</button>
            </div>
            {pesquisas.length === 0 ? <p style={{ color: 'var(--texto-claro)', textAlign: 'center', padding: 40 }}>Nenhuma pesquisa registrada ainda.</p> : (
              pesquisas.map(p => (
                <div key={p.id} className="card" style={{ marginBottom: 12 }}>
                  <div className="card-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--verde)', marginBottom: 4 }}>{p.escola_nome}</div>
                        <div style={{ fontSize: 13, color: 'var(--texto-claro)' }}>📍 {p.municipio} · 📅 {new Date(p.data_visita).toLocaleDateString('pt-BR')}</div>
                        {p.observacoes && <p style={{ fontSize: 13, color: '#424242', marginTop: 8, lineHeight: 1.5 }}>{p.observacoes}</p>}
                      </div>
                      <span style={{ background: '#E8F5E9', color: '#1B5E20', padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{p.status}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* LISTA DE AÇÕES */}
        {aba === 'acoes' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#01579B' }}>🏛️ Ações nas Secretarias</h2>
              <button onClick={() => setAba('nova-acao')} style={{ background: '#01579B', color: 'white', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 700 }}>+ Nova</button>
            </div>
            {acoes.length === 0 ? <p style={{ color: 'var(--texto-claro)', textAlign: 'center', padding: 40 }}>Nenhuma ação registrada ainda.</p> : (
              acoes.map(a => (
                <div key={a.id} className="card" style={{ marginBottom: 12 }}>
                  <div className="card-body">
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#01579B', marginBottom: 4 }}>📍 {a.municipio}</div>
                    <div style={{ fontSize: 13, color: 'var(--texto-claro)', marginBottom: 8 }}>📅 {new Date(a.data_acao).toLocaleDateString('pt-BR')}</div>
                    {a.descricao && <p style={{ fontSize: 13, color: '#424242', lineHeight: 1.5, marginBottom: 8 }}>{a.descricao}</p>}
                    {a.documento_nome && <a href={a.documento_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#01579B', fontWeight: 700 }}>📄 {a.documento_nome}</a>}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* NOVA PESQUISA */}
        {aba === 'nova-pesquisa' && (
          <div style={{ maxWidth: 600 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--verde)', marginBottom: 24 }}>🏫 Nova Pesquisa em Escola</h2>
            <form onSubmit={salvarPesquisa} className="card" style={{ padding: 28 }}>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Nome da Escola *</label>
                <input style={inputStyle} required value={formPesquisa.escola_nome} onChange={e => setFormPesquisa(f => ({ ...f, escola_nome: e.target.value }))} placeholder="Nome completo da escola" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Município *</label>
                  <input style={inputStyle} required value={formPesquisa.municipio} onChange={e => setFormPesquisa(f => ({ ...f, municipio: e.target.value }))} placeholder="Município" />
                </div>
                <div>
                  <label style={labelStyle}>Data da Visita *</label>
                  <input style={inputStyle} type="date" required value={formPesquisa.data_visita} onChange={e => setFormPesquisa(f => ({ ...f, data_visita: e.target.value }))} />
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Observações e dados coletados</label>
                <textarea style={{ ...inputStyle, minHeight: 120, resize: 'vertical' }} value={formPesquisa.observacoes} onChange={e => setFormPesquisa(f => ({ ...f, observacoes: e.target.value }))} placeholder="Descreva o que foi observado e coletado na visita..." />
              </div>
              <div style={{ background: '#FFF8E1', border: '1px solid #FFE082', borderRadius: 8, padding: 12, marginBottom: 20, fontSize: 13, color: '#E65100' }}>
                📋 <strong>Formulário padrão em breve</strong> — O formulário padronizado de pesquisa será disponibilizado pelo CREC-MA em breve.
              </div>
              <button type="submit" disabled={salvando} style={{ width: '100%', background: 'var(--verde)', color: 'white', border: 'none', borderRadius: 10, padding: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>
                {salvando ? '⏳ Salvando...' : '✅ Registrar Pesquisa'}
              </button>
            </form>
          </div>
        )}

        {/* NOVA AÇÃO */}
        {aba === 'nova-acao' && (
          <div style={{ maxWidth: 600 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#01579B', marginBottom: 24 }}>🏛️ Nova Ação em Secretaria</h2>
            <form onSubmit={salvarAcao} className="card" style={{ padding: 28 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Município *</label>
                  <input style={inputStyle} required value={formAcao.municipio} onChange={e => setFormAcao(f => ({ ...f, municipio: e.target.value }))} placeholder="Município" />
                </div>
                <div>
                  <label style={labelStyle}>Data da Ação *</label>
                  <input style={inputStyle} type="date" required value={formAcao.data_acao} onChange={e => setFormAcao(f => ({ ...f, data_acao: e.target.value }))} />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Descrição da ação *</label>
                <textarea style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }} required value={formAcao.descricao} onChange={e => setFormAcao(f => ({ ...f, descricao: e.target.value }))} placeholder="Descreva brevemente a ação realizada na secretaria..." />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Relatório (Word, PDF) — opcional</label>
                <input type="file" accept=".doc,.docx,.pdf" onChange={e => setArquivo(e.target.files?.[0] || null)} style={{ ...inputStyle, padding: 8 }} />
                {arquivo && <div style={{ fontSize: 12, color: 'var(--verde)', marginTop: 6 }}>📄 {arquivo.name}</div>}
              </div>
              <button type="submit" disabled={salvando} style={{ width: '100%', background: '#01579B', color: 'white', border: 'none', borderRadius: 10, padding: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>
                {salvando ? '⏳ Salvando...' : '✅ Registrar Ação'}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 700, color: '#424242', marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: '100%', border: '1px solid #E0E0E0', borderRadius: 8, padding: '10px 12px', fontSize: 14, outline: 'none', boxSizing: 'border-box' };
