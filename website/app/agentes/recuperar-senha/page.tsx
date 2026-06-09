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
      <div className="content-area" style={{ maxWidth: 560, textAlign: 'center', paddingTop: 60 }}>
        <div style={{ fontSize: 72, marginBottom: 20 }}>📧</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--verde)', marginBottom: 12 }}>
          E-mail enviado com sucesso!
        </h2>
        <p style={{ fontSize: 15, color: 'var(--texto-claro)', lineHeight: 1.7, marginBottom: 28 }}>
          Enviamos um link de recuperação para <strong>{email}</strong>.
        </p>

        {/* Passo a passo após o envio */}
        <div style={{ background: '#E8F5E9', border: '1px solid #A5D6A7', borderRadius: 12, padding: 24, textAlign: 'left', marginBottom: 28 }}>
          <p style={{ fontWeight: 800, color: '#1B5E20', marginBottom: 12, fontSize: 14 }}>📋 O que fazer agora:</p>
          <ol style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: '#2E7D32', lineHeight: 2.2 }}>
            <li>Abra o seu e-mail (<strong>{email}</strong>)</li>
            <li>Procure a mensagem de <strong>"Recuperação de Senha — CREC-MA"</strong></li>
            <li>Verifique também a pasta de <strong>Spam / Lixo eletrônico</strong></li>
            <li>Clique no botão <strong>"Redefinir minha senha"</strong> no e-mail</li>
            <li>Você será redirecionado para criar uma nova senha</li>
          </ol>
        </div>

        <div style={{ background: '#FFF8E1', border: '1px solid #FFE082', borderRadius: 10, padding: 16, marginBottom: 24, fontSize: 13, color: '#E65100', textAlign: 'left' }}>
          ⏰ <strong>Atenção:</strong> O link expira em <strong>1 hora</strong>. Se não receber o e-mail em alguns minutos, verifique o spam ou solicite novamente.
        </div>

        <button
          onClick={() => { setStatus('idle'); setEmail(''); }}
          style={{ background: 'transparent', border: '2px solid var(--verde)', color: 'var(--verde)', borderRadius: 8, padding: '10px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginRight: 12 }}
        >
          🔄 Reenviar e-mail
        </button>
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

      <div className="content-area" style={{ maxWidth: 480 }}>

        {/* Instruções orientadoras */}
        <div style={{ background: '#E3F2FD', border: '1px solid #90CAF9', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <p style={{ fontWeight: 800, color: '#1565C0', marginBottom: 10, fontSize: 14 }}>ℹ️ Como funciona a recuperação de senha?</p>
          <ol style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#1976D2', lineHeight: 2 }}>
            <li>Digite o e-mail que você usou no cadastro</li>
            <li>Clique em <strong>"Enviar link de recuperação"</strong></li>
            <li>Acesse seu e-mail e clique no link recebido</li>
            <li>Crie uma nova senha segura e confirme</li>
            <li>Faça login normalmente com a nova senha</li>
          </ol>
        </div>

        <div className="card" style={{ padding: 32 }}>
          <p style={{ fontSize: 14, color: 'var(--texto-claro)', marginBottom: 24, lineHeight: 1.6 }}>
            Digite o e-mail cadastrado e enviaremos um link para você criar uma nova senha.
          </p>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>E-mail cadastrado *</label>
              <input
                style={inputStyle}
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                autoFocus
              />
              <p style={{ fontSize: 12, color: '#9E9E9E', marginTop: 6 }}>
                Use o mesmo e-mail informado no momento do cadastro.
              </p>
            </div>

            {erro && (
              <div style={{ background: '#FFEBEE', border: '1px solid #FFCDD2', borderRadius: 8, padding: 14, marginBottom: 16, color: '#C62828', fontSize: 14 }}>
                ⚠️ {erro}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{ width: '100%', background: 'var(--verde)', color: 'white', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 800, cursor: status === 'loading' ? 'not-allowed' : 'pointer', opacity: status === 'loading' ? 0.7 : 1 }}
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

        {/* Dica de suporte */}
        <div style={{ textAlign: 'center', marginTop: 16, padding: '12px 16px', background: '#FFF8E1', borderRadius: 10, border: '1px solid #FFE082' }}>
          <p style={{ fontSize: 12, color: '#795548', margin: 0 }}>
            ❓ Não lembra o e-mail cadastrado? Entre em contato com o administrador do CREC-MA.
          </p>
        </div>
      </div>
    </>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 700, color: '#424242', marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: '100%', border: '1px solid #E0E0E0', borderRadius: 8, padding: '10px 12px', fontSize: 14, outline: 'none', boxSizing: 'border-box' };
