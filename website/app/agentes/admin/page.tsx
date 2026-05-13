'use client';
import { useState, useEffect } from 'react';
import { supabase, AgenteTerritorial, PesquisaEscola, AcaoSecretaria } from '../../lib/supabase';

const ADMIN_EMAIL = 'admin@crecma.edu.br';

export default function AdminPage() {
  const [logado, setLogado] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [aba, setAba] = useState<'pendentes' | 'aprovados' | 'pesquisas' | 'acoes'>('pendentes');
  const [agentes, setAgentes] = useState<AgenteTerritorial[]>([]);
  const [pesquisas, setPesquisas] = useState<(PesquisaEscola & { agente_nome?: string })[]>([]);
  const [acoes, setAcoes] = useState<(AcaoSecretaria & { agente_nome?: string })[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('admin_crec');
    if (session === 'ok') { setLogado(true); carregarTudo(); }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email === ADMIN_EMAIL && senha === 'crecma@2025') {
      localStorage.setItem('admin_crec', 'ok');
      setLogado(true);
      carregarTudo();
    } else {
      setErro('Credenciais incorretas.');
    }
  }

  async function carregarTudo() {
    setLoading(true);
    const { data: ags } = await supabase.from('agentes_territoriais').select('*').order('created_at', { ascending: false });
    setAgentes(ags || []);

    const { data: pesq } = await supabase.from('pesquisas_escolas').select('*').order('created_at', { ascending: false });
    const { data: ac } = await supabase.from('acoes_secretarias').select('*').order('created_at', { ascending: false });

    const agMap = Object.fromEntries((ags || []).map(a => [a.id, a.nome]));
    setPesquisas((pesq || []).map(p => ({ ...p, agente_nome: agMap[p.agente_id] })));
    setAcoes((ac || []).map(a => ({ ...a, agente_nome: agMap[a.agente_id] })));
    setLoading(false);
  }

  async function aprovar(id: string) {
    await supabase.from('agentes_territoriais').update({ status: 'aprovado' }).eq('id', id);
    carregarTudo();
  }

  async function rejeitar(id: string) {
    await supabase.from('agentes_territoriais').update({ status: 'rejeitado' }).eq('id', id);
    carregarTudo();
  }

  if (!logado) {
    return (
      <>
        <div style={{ background: '#B71C1C', padding: '40px 24px', textAlign: 'center', color: 'white' }}>
          <h1 style={{ fontSize: 24, fontWeight: 900 }}>🛡️ Área Administrativa</h1>
          <p style={{ opacity: 0.85, fontSize: 14, marginTop: 8 }}>CREC-MA — Acesso restrito</p>
        </div>
        <div className="content-area" style={{ maxWidth: 400 }}>
          <div className="card" style={{ padding: 32 }}>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Email do administrador</label>
                <input style={inputStyle} type="email" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Senha</label>
                <input style={inputStyle} type="password" required value={senha} onChange={e => setSenha(e.target.value)} />
              </div>
              {erro && <div style={{ color: '#C62828', fontSize: 13, marginBottom: 12 }}>⚠️ {erro}</div>}
              <button type="submit" style={{ width: '100%', background: '#B71C1C', color: 'white', border: 'none', borderRadius: 10, padding: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>
                🔐 Entrar
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  const pendentes = agentes.filter(a => a.status === 'pendente');
  const aprovados = agentes.filter(a => a.status === 'aprovado');

  return (
    <>
      <div style={{ background: '#B71C1C', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>Painel Administrativo — CREC-MA</div>
          <div style={{ color: 'white', fontSize: 18, fontWeight: 900 }}>🛡️ Gestão de Agentes Territoriais</div>
        </div>
        <button onClick={() => { localStorage.removeItem('admin_crec'); setLogado(false); }} style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', color: 'white', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>Sair</button>
      </div>

      {/* ESTATÍSTICAS */}
      <div style={{ background: '#FFEBEE', padding: '16px 32px', display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        {[
          { num: pendentes.length, label: 'Aguardando aprovação', cor: '#E65100' },
          { num: aprovados.length, label: 'Agentes aprovados', cor: '#1B5E20' },
          { num: pesquisas.length, label: 'Pesquisas registradas', cor: '#01579B' },
          { num: acoes.length, label: 'Ações registradas', cor: '#6A1B9A' },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ fontSize: 28, fontWeight: 900, color: s.cor }}>{s.num}</div>
            <div style={{ fontSize: 12, color: '#616161', fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ABAS */}
      <div style={{ background: 'white', borderBottom: '2px solid #E0E0E0', display: 'flex', padding: '0 24px' }}>
        {[
          { id: 'pendentes', label: `⏳ Pendentes (${pendentes.length})` },
          { id: 'aprovados', label: `✅ Aprovados (${aprovados.length})` },
          { id: 'pesquisas', label: `🏫 Pesquisas (${pesquisas.length})` },
          { id: 'acoes', label: `🏛️ Ações (${acoes.length})` },
        ].map(a => (
          <button key={a.id} onClick={() => setAba(a.id as any)}
            style={{ padding: '14px 16px', border: 'none', background: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer', borderBottom: aba === a.id ? '3px solid #B71C1C' : '3px solid transparent', color: aba === a.id ? '#B71C1C' : '#757575' }}>
            {a.label}
          </button>
        ))}
      </div>

      <div className="content-area">
        {loading && <p style={{ textAlign: 'center', padding: 40 }}>⏳ Carregando...</p>}

        {/* PENDENTES */}
        {aba === 'pendentes' && !loading && (
          <div>
            {pendentes.length === 0 ? <p style={{ textAlign: 'center', color: 'var(--texto-claro)', padding: 40 }}>Nenhum cadastro pendente.</p> : pendentes.map(a => (
              <div key={a.id} className="card" style={{ marginBottom: 16, borderLeft: '4px solid #E65100' }}>
                <div className="card-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{a.nome}</div>
                      <div style={{ fontSize: 13, color: 'var(--texto-claro)' }}>📧 {a.email} · 📱 {a.telefone}</div>
                      <div style={{ fontSize: 13, color: 'var(--texto-claro)' }}>🪪 CPF: {a.cpf}</div>
                      {a.organizacao && <div style={{ fontSize: 13, color: 'var(--texto-claro)' }}>🏛️ {a.organizacao}</div>}
                      <div style={{ fontSize: 13, color: 'var(--verde)', fontWeight: 600, marginTop: 4 }}>📍 {a.municipios?.join(', ')}</div>
                      <div style={{ fontSize: 12, color: '#9E9E9E', marginTop: 4 }}>Cadastrado em: {new Date(a.created_at).toLocaleDateString('pt-BR')}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => aprovar(a.id)} style={{ background: '#1B5E20', color: 'white', border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontWeight: 800, fontSize: 14 }}>✅ Aprovar</button>
                      <button onClick={() => rejeitar(a.id)} style={{ background: '#C62828', color: 'white', border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontWeight: 800, fontSize: 14 }}>❌ Rejeitar</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* APROVADOS */}
        {aba === 'aprovados' && !loading && (
          <div className="grade-3">
            {aprovados.map(a => (
              <div key={a.id} className="card">
                <div className="card-body">
                  <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{a.nome}</div>
                  <div style={{ fontSize: 12, color: 'var(--texto-claro)' }}>📧 {a.email}</div>
                  <div style={{ fontSize: 12, color: 'var(--texto-claro)' }}>📱 {a.telefone}</div>
                  {a.organizacao && <div style={{ fontSize: 12, color: 'var(--texto-claro)' }}>🏛️ {a.organizacao}</div>}
                  <div style={{ fontSize: 12, color: 'var(--verde)', fontWeight: 600, marginTop: 6 }}>📍 {a.municipios?.join(', ')}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PESQUISAS */}
        {aba === 'pesquisas' && !loading && (
          <div>
            {pesquisas.map(p => (
              <div key={p.id} className="card" style={{ marginBottom: 12 }}>
                <div className="card-body">
                  <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--verde)' }}>{p.escola_nome}</div>
                  <div style={{ fontSize: 13, color: 'var(--texto-claro)' }}>📍 {p.municipio} · 📅 {new Date(p.data_visita).toLocaleDateString('pt-BR')}</div>
                  <div style={{ fontSize: 13, color: '#424242', marginTop: 4 }}>👤 Agente: {p.agente_nome}</div>
                  {p.observacoes && <p style={{ fontSize: 13, color: '#616161', marginTop: 8 }}>{p.observacoes}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AÇÕES */}
        {aba === 'acoes' && !loading && (
          <div>
            {acoes.map(a => (
              <div key={a.id} className="card" style={{ marginBottom: 12 }}>
                <div className="card-body">
                  <div style={{ fontWeight: 800, fontSize: 15, color: '#01579B' }}>📍 {a.municipio}</div>
                  <div style={{ fontSize: 13, color: 'var(--texto-claro)' }}>📅 {new Date(a.data_acao).toLocaleDateString('pt-BR')} · 👤 {a.agente_nome}</div>
                  {a.descricao && <p style={{ fontSize: 13, color: '#424242', marginTop: 8 }}>{a.descricao}</p>}
                  {a.documento_nome && <a href={a.documento_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#01579B', fontWeight: 700, display: 'inline-block', marginTop: 8 }}>📄 {a.documento_nome}</a>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 700, color: '#424242', marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: '100%', border: '1px solid #E0E0E0', borderRadius: 8, padding: '10px 12px', fontSize: 14, outline: 'none', boxSizing: 'border-box' };
