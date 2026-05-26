'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginAgentePage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [erro, setErro] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErro('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
      if (error) throw error;

      const { data: agente } = await supabase
        .from('agentes_territoriais')
        .select('status')
        .eq('user_id', data.user.id)
        .single();

      if (!agente) {
        setErro('Cadastro não encontrado. Solicite seu cadastro primeiro.');
        setStatus('error');
        return;
      }

      if (agente.status === 'pendente') {
        setErro('Seu cadastro ainda está aguardando aprovação do administrador.');
        setStatus('error');
        return;
      }

      if (agente.status === 'rejeitado') {
        setErro('Seu cadastro foi rejeitado. Entre em contato com o CREC-MA.');
        setStatus('error');
        return;
      }

      window.location.href = '/agentes/portal';
    } catch (err: any) {
      setErro('Email ou senha incorretos.');
      setStatus('error');
    }
  };

  return (
    <>
      <div style={{ background: 'var(--verde)', padding: '40px 24px', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 8 }}>🔐 Entrar no Portal</h1>
        <p style={{ opacity: 0.85, fontSize: 14 }}>Agente Territorial — CREC-MA</p>
      </div>

      <div className="content-area" style={{ maxWidth: 440 }}>
        <div className="card" style={{ padding: 32 }}>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Email</label>
              <input style={inputStyle} type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Senha</label>
              <input style={inputStyle} type="password" required value={senha} onChange={e => setSenha(e.target.value)} placeholder="Sua senha" />
            </div>

            {erro && (
              <div style={{ background: '#FFEBEE', border: '1px solid #FFCDD2', borderRadius: 8, padding: 14, marginBottom: 16, color: '#C62828', fontSize: 14 }}>
                ⚠️ {erro}
              </div>
            )}

            <button type="submit" disabled={status === 'loading'} style={{ width: '100%', background: 'var(--verde)', color: 'white', border: 'none', borderRadius: 10, padding: '14px', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>
              {status === 'loading' ? '⏳ Entrando...' : '🔐 Entrar'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 20, paddingTop: 20, borderTop: '1px solid #E0E0E0' }}>
            <p style={{ fontSize: 13, color: 'var(--texto-claro)', marginBottom: 8 }}>
              <a href="/agentes/recuperar-senha" style={{ color: '#E65100', fontWeight: 700 }}>🔑 Esqueceu sua senha?</a>
            </p>
            <p style={{ fontSize: 13, color: 'var(--texto-claro)' }}>
              Ainda não tem cadastro?{' '}
              <a href="/agentes/cadastro" style={{ color: 'var(--verde)', fontWeight: 700 }}>Solicitar cadastro</a>
            </p>
          </div>
        </div>

        {/* Admin */}
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <a href="/agentes/admin" style={{ fontSize: 12, color: 'var(--texto-claro)' }}>
            🛡️ Acesso Administrador
          </a>
        </div>
      </div>
    </>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 700, color: '#424242', marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: '100%', border: '1px solid #E0E0E0', borderRadius: 8, padding: '10px 12px', fontSize: 14, outline: 'none', boxSizing: 'border-box' };
