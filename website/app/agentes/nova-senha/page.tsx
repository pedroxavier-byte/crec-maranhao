'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function NovaSenhaPage() {
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'invalid'>('idle');
  const [erro, setErro] = useState('');
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    // Supabase detecta automaticamente o token na URL e cria a sessão
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setPronto(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (senha !== confirmar) {
      setErro('As senhas não coincidem. Verifique e tente novamente.');
      return;
    }

    setStatus('loading');
    const { error } = await supabase.auth.updateUser({ password: senha });

    if (error) {
      setErro('Não foi possível atualizar a senha. Solicite um novo link de recuperação.');
      setStatus('error');
    } else {
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <div className="content-area" style={{ maxWidth: 500, textAlign: 'center', paddingTop: 80 }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>✅</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--verde)', marginBottom: 12 }}>
          Senha atualizada!
        </h2>
        <p style={{ fontSize: 15, color: 'var(--texto-claro)', lineHeight: 1.6, marginBottom: 24 }}>
          Sua nova senha foi salva com sucesso. Agora você pode fazer login normalmente.
        </p>
        <a href="/agentes/login" className="btn btn-verde">
          🔐 Ir para o Login
        </a>
      </div>
    );
  }

  if (!pronto) {
    return (
      <div className="content-area" style={{ maxWidth: 500, textAlign: 'center', paddingTop: 80 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
        <p style={{ fontSize: 15, color: 'var(--texto-claro)' }}>
          Verificando link de recuperação...
        </p>
        <p style={{ fontSize: 13, color: '#9E9E9E', marginTop: 16 }}>
          Se demorar muito, o link pode ter expirado.{' '}
          <a href="/agentes/recuperar-senha" style={{ color: 'var(--verde)', fontWeight: 700 }}>
            Solicitar novo link
          </a>
        </p>
      </div>
    );
  }

  return (
    <>
      <div style={{ background: 'var(--verde)', padding: '40px 24px', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>🔑 Nova Senha</h1>
        <p style={{ opacity: 0.85, fontSize: 14 }}>Agente Territorial — CREC-MA</p>
      </div>

      <div className="content-area" style={{ maxWidth: 440 }}>
        <div className="card" style={{ padding: 32 }}>
          <p style={{ fontSize: 14, color: 'var(--texto-claro)', marginBottom: 24, lineHeight: 1.6 }}>
            Digite sua nova senha abaixo.
          </p>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Nova senha</label>
              <input
                style={inputStyle}
                type="password"
                required
                minLength={6}
                value={senha}
                onChange={e => setSenha(e.target.value)}
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Confirmar nova senha</label>
              <input
                style={inputStyle}
                type="password"
                required
                minLength={6}
                value={confirmar}
                onChange={e => setConfirmar(e.target.value)}
                placeholder="Repita a senha"
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
              {status === 'loading' ? '⏳ Salvando...' : '✅ Salvar nova senha'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 700, color: '#424242', marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: '100%', border: '1px solid #E0E0E0', borderRadius: 8, padding: '10px 12px', fontSize: 14, outline: 'none', boxSizing: 'border-box' };
