'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function NovaSenhaPage() {
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [erro, setErro] = useState('');
  const [pronto, setPronto] = useState(false);
  const [linkExpirado, setLinkExpirado] = useState(false);

  useEffect(() => {
    // Tenta detectar sessão de recuperação via evento ou sessão existente
    const verificar = async () => {
      // 1. Verifica se já existe uma sessão de recuperação ativa
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setPronto(true);
        return;
      }

      // 2. Aguarda o evento PASSWORD_RECOVERY (quando vem do link do email)
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'PASSWORD_RECOVERY' && session) {
          setPronto(true);
        }
        if (event === 'SIGNED_IN' && session) {
          setPronto(true);
        }
      });

      // 3. Timeout: se após 12 segundos nada aconteceu, o link pode ter expirado
      const timeout = setTimeout(() => {
        setLinkExpirado(true);
      }, 12000);

      return () => {
        subscription.unsubscribe();
        clearTimeout(timeout);
      };
    };

    verificar();
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
      setErro('Não foi possível atualizar a senha. O link pode ter expirado. Solicite um novo link.');
      setStatus('error');
    } else {
      setStatus('success');
    }
  };

  // ─── SUCESSO ─────────────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="content-area" style={{ maxWidth: 500, textAlign: 'center', paddingTop: 60 }}>
        <div style={{ fontSize: 72, marginBottom: 20 }}>✅</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--verde)', marginBottom: 12 }}>
          Senha atualizada com sucesso!
        </h2>
        <p style={{ fontSize: 15, color: 'var(--texto-claro)', lineHeight: 1.7, marginBottom: 28 }}>
          Sua nova senha foi salva. Agora você pode fazer login normalmente no Portal dos Agentes.
        </p>
        <div style={{ background: '#E8F5E9', border: '1px solid #A5D6A7', borderRadius: 10, padding: 16, marginBottom: 28, fontSize: 13, color: '#2E7D32' }}>
          🔒 Dica: guarde sua senha em local seguro e não a compartilhe com ninguém.
        </div>
        <a href="/agentes/login" className="btn btn-verde" style={{ display: 'inline-block', background: 'var(--verde)', color: 'white', padding: '14px 32px', borderRadius: 10, fontWeight: 800, fontSize: 15, textDecoration: 'none' }}>
          🔐 Ir para o Login
        </a>
      </div>
    );
  }

  // ─── LINK EXPIRADO ───────────────────────────────────────────────────────────
  if (linkExpirado && !pronto) {
    return (
      <div className="content-area" style={{ maxWidth: 500, textAlign: 'center', paddingTop: 60 }}>
        <div style={{ fontSize: 72, marginBottom: 20 }}>⏰</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#C62828', marginBottom: 12 }}>
          Link expirado ou inválido
        </h2>
        <p style={{ fontSize: 15, color: 'var(--texto-claro)', lineHeight: 1.7, marginBottom: 24 }}>
          O link de recuperação expirou ou já foi utilizado. Links de recuperação são válidos por <strong>1 hora</strong>.
        </p>
        <div style={{ background: '#FFF8E1', border: '1px solid #FFE082', borderRadius: 10, padding: 16, marginBottom: 28, fontSize: 13, color: '#E65100', textAlign: 'left' }}>
          <p style={{ fontWeight: 700, marginBottom: 8 }}>💡 O que fazer:</p>
          <ol style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
            <li>Solicite um novo link de recuperação</li>
            <li>Abra o e-mail <strong>imediatamente</strong> após receber</li>
            <li>Clique no link sem demora</li>
          </ol>
        </div>
        <a
          href="/agentes/recuperar-senha"
          style={{ display: 'inline-block', background: 'var(--verde)', color: 'white', padding: '14px 28px', borderRadius: 10, fontWeight: 800, fontSize: 15, textDecoration: 'none', marginRight: 12 }}
        >
          🔄 Solicitar novo link
        </a>
        <a href="/agentes/login" style={{ color: 'var(--verde)', fontWeight: 700, fontSize: 14 }}>
          ← Voltar ao login
        </a>
      </div>
    );
  }

  // ─── AGUARDANDO TOKEN ────────────────────────────────────────────────────────
  if (!pronto) {
    return (
      <div className="content-area" style={{ maxWidth: 500, textAlign: 'center', paddingTop: 60 }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>⏳</div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--verde)', marginBottom: 8 }}>
          Verificando link de recuperação...
        </h2>
        <p style={{ fontSize: 14, color: 'var(--texto-claro)', lineHeight: 1.7 }}>
          Aguarde um momento enquanto validamos seu acesso.
        </p>
        <p style={{ fontSize: 13, color: '#9E9E9E', marginTop: 20 }}>
          Se demorar muito, o link pode ter expirado.{' '}
          <a href="/agentes/recuperar-senha" style={{ color: 'var(--verde)', fontWeight: 700 }}>
            Solicitar novo link
          </a>
        </p>
      </div>
    );
  }

  // ─── FORMULÁRIO DE NOVA SENHA ────────────────────────────────────────────────
  return (
    <>
      <div style={{ background: 'var(--verde)', padding: '40px 24px', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>🔑 Criar Nova Senha</h1>
        <p style={{ opacity: 0.85, fontSize: 14 }}>Agente Territorial — CREC-MA</p>
      </div>

      <div className="content-area" style={{ maxWidth: 480 }}>

        {/* Dicas de senha */}
        <div style={{ background: '#E8F5E9', border: '1px solid #A5D6A7', borderRadius: 12, padding: 16, marginBottom: 24, fontSize: 13, color: '#2E7D32' }}>
          <p style={{ fontWeight: 700, marginBottom: 8 }}>🔒 Dicas para uma senha segura:</p>
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.9 }}>
            <li>Mínimo de <strong>6 caracteres</strong></li>
            <li>Misture letras maiúsculas, minúsculas e números</li>
            <li>Evite datas de nascimento ou sequências simples (123456)</li>
            <li>Não use a mesma senha de outras contas</li>
          </ul>
        </div>

        <div className="card" style={{ padding: 32 }}>
          <p style={{ fontSize: 14, color: 'var(--texto-claro)', marginBottom: 24, lineHeight: 1.6 }}>
            Digite e confirme sua nova senha abaixo.
          </p>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Nova senha *</label>
              <input
                style={inputStyle}
                type="password"
                required
                minLength={6}
                value={senha}
                onChange={e => setSenha(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                autoFocus
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Confirmar nova senha *</label>
              <input
                style={inputStyle}
                type="password"
                required
                minLength={6}
                value={confirmar}
                onChange={e => setConfirmar(e.target.value)}
                placeholder="Repita a nova senha"
              />
            </div>

            {/* Indicador de força da senha */}
            {senha.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                  {[1, 2, 3, 4].map(n => (
                    <div key={n} style={{
                      flex: 1, height: 4, borderRadius: 2,
                      background: senha.length >= n * 2
                        ? (senha.length >= 8 ? '#2E7D32' : senha.length >= 6 ? '#F9A825' : '#E53935')
                        : '#E0E0E0'
                    }} />
                  ))}
                </div>
                <p style={{ fontSize: 11, color: '#757575', margin: 0 }}>
                  {senha.length < 6 ? '⚠️ Senha muito curta' : senha.length < 8 ? '👍 Senha aceitável' : '✅ Senha forte'}
                </p>
              </div>
            )}

            {erro && (
              <div style={{ background: '#FFEBEE', border: '1px solid #FFCDD2', borderRadius: 8, padding: 14, marginBottom: 16, color: '#C62828', fontSize: 14 }}>
                ⚠️ {erro}
                {status === 'error' && (
                  <div style={{ marginTop: 8 }}>
                    <a href="/agentes/recuperar-senha" style={{ color: '#C62828', fontWeight: 700, fontSize: 13 }}>
                      → Solicitar novo link de recuperação
                    </a>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{ width: '100%', background: 'var(--verde)', color: 'white', border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 800, cursor: status === 'loading' ? 'not-allowed' : 'pointer', opacity: status === 'loading' ? 0.7 : 1 }}
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
