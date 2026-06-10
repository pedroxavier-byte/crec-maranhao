'use client';
import { useState } from 'react';

export default function CadastroPesquisadorPage() {
  const [form, setForm] = useState({
    nome: '', instituicao: '', telefone: '', email: '',
    cpf: '', lattes: '', endereco: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [erro, setErro] = useState('');

  const set = (campo: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [campo]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErro('');

    try {
      const res = await fetch('/api/cadastro-pesquisador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (!res.ok) {
        setErro(result.error || 'Erro ao realizar cadastro. Tente novamente.');
        setStatus('error');
        return;
      }
      setStatus('success');
    } catch (err: any) {
      setErro(err?.message || 'Erro de conexão. Verifique sua internet e tente novamente.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="content-area" style={{ maxWidth: 600, textAlign: 'center', paddingTop: 80 }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>✅</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#01579B', marginBottom: 12 }}>
          Cadastro enviado com sucesso!
        </h2>
        <p style={{ fontSize: 15, color: 'var(--texto-claro)', lineHeight: 1.6, marginBottom: 24 }}>
          Seu cadastro foi recebido e está <strong>aguardando aprovação</strong> do administrador do CREC-MA.
          Você será notificado quando sua solicitação for analisada.
        </p>
        <a href="/pesquisadores" style={{ display: 'inline-block', background: '#01579B', color: 'white', padding: '14px 28px', borderRadius: 10, fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>
          ← Voltar
        </a>
      </div>
    );
  }

  return (
    <>
      <div style={{ background: '#01579B', padding: '40px 24px', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 8 }}>📝 Solicitação de Cadastro</h1>
        <p style={{ opacity: 0.85, fontSize: 14 }}>Pesquisador — CREC-MA</p>
      </div>

      <div className="content-area" style={{ maxWidth: 700 }}>
        <form onSubmit={handleSubmit}>

          <div className="card" style={{ padding: 28, marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#01579B', marginBottom: 20 }}>👤 Dados Pessoais</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Nome completo *</label>
                <input style={inputStyle} required value={form.nome} onChange={set('nome')} placeholder="Seu nome completo" />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Instituição ou movimento social *</label>
                <input style={inputStyle} required value={form.instituicao} onChange={set('instituicao')}
                  placeholder="Ex: Universidade Federal do Maranhão, Agente do PRONACAMPO, MST, MIQCB..." />
                <p style={{ fontSize: 12, color: '#9E9E9E', marginTop: 4 }}>
                  Exemplos: Universidade, Agente do PRONACAMPO, MST, MIQCB, CPT, MAB, FETAEMA, IFMA...
                </p>
              </div>

              <div>
                <label style={labelStyle}>CPF *</label>
                <input style={inputStyle} required value={form.cpf} onChange={set('cpf')} placeholder="000.000.000-00" />
              </div>

              <div>
                <label style={labelStyle}>Telefone *</label>
                <input style={inputStyle} required value={form.telefone} onChange={set('telefone')} placeholder="(99) 99999-9999" />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>E-mail *</label>
                <input style={inputStyle} type="email" required value={form.email} onChange={set('email')} placeholder="seu@email.com" />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Currículo Lattes</label>
                <input style={inputStyle} value={form.lattes} onChange={set('lattes')}
                  placeholder="http://lattes.cnpq.br/0000000000000000" />
                <p style={{ fontSize: 12, color: '#9E9E9E', marginTop: 4 }}>
                  Cole o link do seu currículo na Plataforma Lattes (CNPq). Campo opcional.
                </p>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Endereço *</label>
                <input style={inputStyle} required value={form.endereco} onChange={set('endereco')}
                  placeholder="Rua, número, bairro, município/UF" />
              </div>
            </div>
          </div>

          {erro && (
            <div style={{ background: '#FFEBEE', border: '1px solid #FFCDD2', borderRadius: 8, padding: 14, marginBottom: 16, color: '#C62828', fontSize: 14 }}>
              ⚠️ {erro}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            style={{ width: '100%', background: '#01579B', color: 'white', border: 'none', borderRadius: 10, padding: '16px', fontSize: 16, fontWeight: 800, cursor: status === 'loading' ? 'not-allowed' : 'pointer', opacity: status === 'loading' ? 0.7 : 1 }}
          >
            {status === 'loading' ? '⏳ Enviando cadastro...' : '📝 Enviar Solicitação de Cadastro'}
          </button>

          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--texto-claro)', marginTop: 12 }}>
            <a href="/pesquisadores" style={{ color: '#01579B', fontWeight: 700 }}>← Voltar ao Espaço dos Pesquisadores</a>
          </p>
        </form>
      </div>
    </>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 700, color: '#424242', marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: '100%', border: '1px solid #E0E0E0', borderRadius: 8, padding: '10px 12px', fontSize: 14, outline: 'none', boxSizing: 'border-box' };
