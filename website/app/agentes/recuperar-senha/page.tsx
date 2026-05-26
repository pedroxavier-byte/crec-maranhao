'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErro('');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://crec-maranhao.vercel.app/agentes/nova-senha',
    });

    if (error) {
      if (error.message?.toLowerCase().includes('rate limit') || error.message?.toLowerCase().includes('email rate')) {
        setErro('Limite de e-mails atingido. Aguarde alguns minutos e tente novamente.');
      } else if (error.message?.toLowerCase().includes('redirect')) {
        setErro('URL de redirecionamento não autorizada. Entre em contato com o administrador.');
      } else {
        setErro(`Erro: ${error.message}`);
      }
      setStatus('error');
    } else {
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <div className="content-area" style={{ maxWidth: 500, textAlign: 'center', paddingTop: 80 }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>📧</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--verde)', marginBottom: 12 }}>
          E-mail enviado!
        </h2>
        <p style={{ fontSize: 15, color: 'var(--texto-claro)', lineHeight: 1.6, marginBottom: 24 }}>
          Enviamos um link de redefinição de senha para <strong>{email}</strong>.
          Verifique sua caixa de entrada e clique no link para criar uma nova senha.
        </p>
        <a href="/agentes/login" style={{ color: 'var(--verde)', fontWeight: 700, fontSize: 14 }}>
          ← Voltar ao login
        </a>
      </div>
    );
  }

  return (
    <>
      <div style={{ background: 'var(--verde)', padding: '40px 24px', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>🔑 Recuperar Senha</h1>
        <p style={{ opacity: 0.85, fontSize: 14 }}>Agente Territorial — CREC-MA</p>
      </div>

      <div className="content-area" style={{ maxWidth: 440 }}>
        <div className="card" style={{ padding: 32 }}>
          <p style={{ fontSize: 14, color: 'var(--texto-claro)', marginBottom: 24, lineHeight: 1.6 }}>
            Digite o e-mail cadastrado e enviaremos um link para você criar uma nova senha.
          </p>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>E-mail cadastrado</label>
              <input
                style={inputStyle}
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
              />
            </div>

            {erro && (
              <div style={{ background: '#FFEBEE', border: '1px solid #FFCDD2', borderRadius: 8, padding: 14, marginBottom: 16, color: '#C62828', fontSize: 14 }}>
                ⚠️ {erro}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{ width: '100%', background: 'var(--verde)', color: 'white', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 800, cursor: 'pointer' }}
            >
              {status === 'loading' ? '⏳ Enviando...' : '📧 Enviar link de recuperação'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 20, paddingTop: 20, borderTop: '1px solid #E0E0E0' }}>
            <a href="/agentes/login" style={{ fontSize: 13, color: 'var(--verde)', fontWeight: 700 }}>
              ← Voltar ao login
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 700, color: '#424242', marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: '100%', border: '1px solid #E0E0E0', borderRadius: 8, padding: '10px 12px', fontSize: 14, outline: 'none', boxSizing: 'border-box' };
