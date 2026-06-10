'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const ADMIN_EMAIL = 'admin@crecma.edu.br';
const ADMIN_SENHA = 'crecma@2025';

type Pesquisador = {
  id: string;
  nome: string;
  instituicao: string;
  telefone: string;
  email: string;
  cpf: string;
  lattes: string;
  endereco: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  created_at: string;
};

function gerarExcel(dados: Pesquisador[]) {
  const cabecalho = ['Nome', 'Instituição/Movimento Social', 'Telefone', 'E-mail', 'CPF', 'Currículo Lattes', 'Endereço', 'Status', 'Data de Cadastro'];

  const esc = (v: string) => String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const linhas = dados.map(p => [
    p.nome,
    p.instituicao,
    p.telefone,
    p.email,
    p.cpf,
    p.lattes || '',
    p.endereco,
    p.status === 'aprovado' ? 'Aprovado' : p.status === 'rejeitado' ? 'Rejeitado' : 'Pendente',
    new Date(p.created_at).toLocaleDateString('pt-BR'),
  ]);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Styles>
  <Style ss:ID="cabecalho">
   <Font ss:Bold="1" ss:Color="#FFFFFF"/>
   <Interior ss:Color="#01579B" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="aprovado">
   <Interior ss:Color="#E8F5E9" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="pendente">
   <Interior ss:Color="#FFF8E1" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="rejeitado">
   <Interior ss:Color="#FFEBEE" ss:Pattern="Solid"/>
  </Style>
 </Styles>
 <Worksheet ss:Name="Pesquisadores CREC-MA">
  <Table>
   <Column ss:Width="180"/>
   <Column ss:Width="200"/>
   <Column ss:Width="130"/>
   <Column ss:Width="200"/>
   <Column ss:Width="110"/>
   <Column ss:Width="220"/>
   <Column ss:Width="220"/>
   <Column ss:Width="80"/>
   <Column ss:Width="110"/>
   <Row>
    ${cabecalho.map(h => `<Cell ss:StyleID="cabecalho"><Data ss:Type="String">${esc(h)}</Data></Cell>`).join('')}
   </Row>
   ${linhas.map((linha, idx) => {
     const estilo = dados[idx].status === 'aprovado' ? 'aprovado' : dados[idx].status === 'rejeitado' ? 'rejeitado' : 'pendente';
     return `<Row>${linha.map(cel => `<Cell ss:StyleID="${estilo}"><Data ss:Type="String">${esc(cel)}</Data></Cell>`).join('')}</Row>`;
   }).join('\n   ')}
  </Table>
 </Worksheet>
</Workbook>`;

  const blob = new Blob([xml], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pesquisadores_crec_ma_${new Date().toISOString().slice(0, 10)}.xls`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function AdminPesquisadoresPage() {
  const [logado, setLogado] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [aba, setAba] = useState<'pendentes' | 'aprovados' | 'rejeitados' | 'todos'>('pendentes');
  const [lista, setLista] = useState<Pesquisador[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('admin_pesquisadores') === 'ok') {
      setLogado(true);
      carregar();
    }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email === ADMIN_EMAIL && senha === ADMIN_SENHA) {
      localStorage.setItem('admin_pesquisadores', 'ok');
      setLogado(true);
      carregar();
    } else {
      setErro('Credenciais incorretas.');
    }
  }

  async function carregar() {
    setLoading(true);
    const { data } = await supabase
      .from('pesquisadores')
      .select('*')
      .order('created_at', { ascending: false });
    setLista(data || []);
    setLoading(false);
  }

  async function atualizarStatus(id: string, novoStatus: 'aprovado' | 'rejeitado') {
    await supabase.from('pesquisadores').update({ status: novoStatus }).eq('id', id);
    carregar();
  }

  const pendentes = lista.filter(p => p.status === 'pendente');
  const aprovados = lista.filter(p => p.status === 'aprovado');
  const rejeitados = lista.filter(p => p.status === 'rejeitado');
  const visiveis = aba === 'pendentes' ? pendentes : aba === 'aprovados' ? aprovados : aba === 'rejeitados' ? rejeitados : lista;

  if (!logado) {
    return (
      <>
        <div style={{ background: '#01579B', padding: '40px 24px', textAlign: 'center', color: 'white' }}>
          <h1 style={{ fontSize: 24, fontWeight: 900 }}>🛡️ Administração — Pesquisadores</h1>
          <p style={{ opacity: 0.85, fontSize: 14, marginTop: 8 }}>CREC-MA — Acesso restrito</p>
        </div>
        <div className="content-area" style={{ maxWidth: 400 }}>
          <div className="card" style={{ padding: 32 }}>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>E-mail do administrador</label>
                <input style={inputStyle} type="email" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Senha</label>
                <input style={inputStyle} type="password" required value={senha} onChange={e => setSenha(e.target.value)} />
              </div>
              {erro && <div style={{ color: '#C62828', fontSize: 13, marginBottom: 12 }}>⚠️ {erro}</div>}
              <button type="submit" style={{ width: '100%', background: '#01579B', color: 'white', border: 'none', borderRadius: 10, padding: 14, fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>
                🔐 Entrar
              </button>
            </form>
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <a href="/agentes/admin" style={{ fontSize: 13, color: '#757575' }}>← Ir para Admin dos Agentes</a>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* CABEÇALHO */}
      <div style={{ background: '#01579B', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>Painel Administrativo — CREC-MA</div>
          <div style={{ color: 'white', fontSize: 18, fontWeight: 900 }}>🔬 Gestão de Pesquisadores</div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            onClick={() => gerarExcel(lista)}
            style={{ background: '#1B5E20', color: 'white', border: 'none', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 800, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}
          >
            📊 Baixar Excel ({lista.length})
          </button>
          <button
            onClick={() => gerarExcel(aprovados)}
            disabled={aprovados.length === 0}
            style={{ background: aprovados.length ? '#2E7D32' : '#9E9E9E', color: 'white', border: 'none', borderRadius: 8, padding: '10px 18px', cursor: aprovados.length ? 'pointer' : 'not-allowed', fontWeight: 700, fontSize: 13 }}
          >
            ✅ Só Aprovados ({aprovados.length})
          </button>
          <button onClick={() => { localStorage.removeItem('admin_pesquisadores'); setLogado(false); }}
            style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', color: 'white', padding: '8px 14px', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
            Sair
          </button>
        </div>
      </div>

      {/* ESTATÍSTICAS */}
      <div style={{ background: '#E3F2FD', padding: '16px 32px', display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        {[
          { num: pendentes.length, label: 'Aguardando aprovação', cor: '#E65100' },
          { num: aprovados.length, label: 'Pesquisadores aprovados', cor: '#1B5E20' },
          { num: rejeitados.length, label: 'Rejeitados', cor: '#C62828' },
          { num: lista.length, label: 'Total cadastrado', cor: '#01579B' },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ fontSize: 28, fontWeight: 900, color: s.cor }}>{s.num}</div>
            <div style={{ fontSize: 12, color: '#616161', fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ABAS */}
      <div style={{ background: 'white', borderBottom: '2px solid #E0E0E0', display: 'flex', padding: '0 24px', flexWrap: 'wrap' }}>
        {([
          { id: 'pendentes', label: `⏳ Pendentes (${pendentes.length})` },
          { id: 'aprovados', label: `✅ Aprovados (${aprovados.length})` },
          { id: 'rejeitados', label: `❌ Rejeitados (${rejeitados.length})` },
          { id: 'todos', label: `📋 Todos (${lista.length})` },
        ] as const).map(a => (
          <button key={a.id} onClick={() => setAba(a.id)}
            style={{ padding: '14px 16px', border: 'none', background: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer', borderBottom: aba === a.id ? '3px solid #01579B' : '3px solid transparent', color: aba === a.id ? '#01579B' : '#757575' }}>
            {a.label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button onClick={carregar} style={{ padding: '0 16px', border: 'none', background: 'none', fontSize: 13, color: '#757575', cursor: 'pointer' }}>
          🔄 Atualizar
        </button>
      </div>

      {/* LISTA */}
      <div className="content-area">
        {loading && <p style={{ textAlign: 'center', padding: 40 }}>⏳ Carregando...</p>}

        {!loading && visiveis.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--texto-claro)', padding: 40 }}>
            Nenhum registro nesta categoria.
          </p>
        )}

        {!loading && visiveis.map(p => {
          const borderCor = p.status === 'pendente' ? '#E65100' : p.status === 'aprovado' ? '#1B5E20' : '#C62828';
          return (
            <div key={p.id} className="card" style={{ marginBottom: 16, borderLeft: `4px solid ${borderCor}` }}>
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 250 }}>
                    <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 4 }}>{p.nome}</div>
                    <div style={{ fontSize: 13, color: '#01579B', fontWeight: 600, marginBottom: 6 }}>🏛️ {p.instituicao}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '4px 24px', fontSize: 13, color: 'var(--texto-claro)' }}>
                      <span>📧 {p.email}</span>
                      <span>📱 {p.telefone}</span>
                      <span>🪪 CPF: {p.cpf}</span>
                      <span>📍 {p.endereco}</span>
                      {p.lattes && (
                        <span>
                          🎓 <a href={p.lattes} target="_blank" rel="noopener noreferrer" style={{ color: '#01579B', fontWeight: 600 }}>Ver Lattes</a>
                        </span>
                      )}
                      <span>📅 {new Date(p.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                        background: p.status === 'aprovado' ? '#E8F5E9' : p.status === 'rejeitado' ? '#FFEBEE' : '#FFF8E1',
                        color: p.status === 'aprovado' ? '#1B5E20' : p.status === 'rejeitado' ? '#C62828' : '#E65100',
                      }}>
                        {p.status === 'aprovado' ? '✅ Aprovado' : p.status === 'rejeitado' ? '❌ Rejeitado' : '⏳ Pendente'}
                      </span>
                    </div>
                  </div>

                  {p.status === 'pendente' && (
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                      <button onClick={() => atualizarStatus(p.id, 'aprovado')}
                        style={{ background: '#1B5E20', color: 'white', border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontWeight: 800, fontSize: 14 }}>
                        ✅ Aprovar
                      </button>
                      <button onClick={() => atualizarStatus(p.id, 'rejeitado')}
                        style={{ background: '#C62828', color: 'white', border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontWeight: 800, fontSize: 14 }}>
                        ❌ Rejeitar
                      </button>
                    </div>
                  )}
                  {p.status !== 'pendente' && (
                    <button onClick={() => atualizarStatus(p.id, p.status === 'aprovado' ? 'rejeitado' : 'aprovado')}
                      style={{ background: '#F5F5F5', color: '#424242', border: '1px solid #E0E0E0', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>
                      🔄 Reverter
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 700, color: '#424242', marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: '100%', border: '1px solid #E0E0E0', borderRadius: 8, padding: '10px 12px', fontSize: 14, outline: 'none', boxSizing: 'border-box' };
