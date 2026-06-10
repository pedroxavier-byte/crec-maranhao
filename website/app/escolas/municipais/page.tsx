'use client';
import { useState, useEffect, useMemo } from 'react';

type EscolaMunicipal = {
  n: string;   // nome
  m: string;   // município
  c: string;   // código INEP
  d: number;   // localização diferenciada: 0=campo, 1=assentamento, 2=terra indígena, 3=quilombola, 8=povos tradicionais
  e: string;   // endereço
  inf: number; fund: number; med: number; eja: number;
  mat: number; // matrículas
  doc: number; // docentes
};

const DIF_LABEL: Record<number, string> = {
  0: 'Campo',
  1: 'Assentamento',
  2: 'Terra Indígena',
  3: 'Quilombola',
  8: 'Povos Tradicionais',
};
const DIF_COR: Record<number, string> = {
  0: '#2E7D32',
  1: '#E65100',
  2: '#BF360C',
  3: '#4A148C',
  8: '#01579B',
};

const POR_PAGINA = 50;

export default function EscolasMunicipaisPage() {
  const [escolas, setEscolas] = useState<EscolaMunicipal[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    fetch('/escolas-municipais-ma.json')
      .then(r => r.json())
      .then(d => { setEscolas(d); setCarregando(false); })
      .catch(() => setCarregando(false));
  }, []);

  const municipios = useMemo(
    () => Array.from(new Set(escolas.map(e => e.m))).sort((a, b) => a.localeCompare(b, 'pt-BR')),
    [escolas]
  );

  const filtradas = useMemo(() => {
    const termo = busca.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    return escolas.filter(e => {
      if (municipio && e.m !== municipio) return false;
      if (categoria !== '' && e.d !== Number(categoria)) return false;
      if (termo) {
        const nome = e.n.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
        if (!nome.includes(termo)) return false;
      }
      return true;
    });
  }, [escolas, busca, municipio, categoria]);

  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / POR_PAGINA));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const visiveis = filtradas.slice((paginaAtual - 1) * POR_PAGINA, paginaAtual * POR_PAGINA);

  const totalMat = useMemo(() => filtradas.reduce((s, e) => s + e.mat, 0), [filtradas]);
  const totalDoc = useMemo(() => filtradas.reduce((s, e) => s + e.doc, 0), [filtradas]);

  const stats = useMemo(() => {
    const porDif: Record<number, number> = {};
    escolas.forEach(e => { porDif[e.d] = (porDif[e.d] || 0) + 1; });
    return porDif;
  }, [escolas]);

  return (
    <>
      <div className="page-header">
        <h1>🏫 Escolas Municipais do Campo — Maranhão</h1>
        <p>
          {carregando ? 'Carregando...' : `${escolas.length.toLocaleString('pt-BR')} escolas municipais do campo em atividade · ${municipios.length} municípios`}
        </p>
        <p style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>
          Fonte: Censo Escolar 2024 — INEP/MEC · Rede municipal · Localização rural
        </p>
      </div>

      <div className="content-area">

        {/* RESUMO POR CATEGORIA */}
        {!carregando && (
          <div className="grade-4" style={{ marginBottom: 32 }}>
            {Object.entries(stats).sort((a, b) => Number(a[0]) - Number(b[0])).map(([d, total]) => (
              <div key={d} className="card" style={{ borderTop: `4px solid ${DIF_COR[Number(d)]}` }}>
                <div className="card-body" style={{ textAlign: 'center', padding: '18px 14px' }}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: DIF_COR[Number(d)] }}>{total.toLocaleString('pt-BR')}</div>
                  <div style={{ fontSize: 13, color: 'var(--texto-claro)', fontWeight: 600 }}>{DIF_LABEL[Number(d)]}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FILTROS */}
        <div className="card" style={{ padding: 20, marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            <div>
              <label style={labelStyle}>🔍 Buscar escola pelo nome</label>
              <input
                style={inputStyle}
                value={busca}
                onChange={e => { setBusca(e.target.value); setPagina(1); }}
                placeholder="Ex: Escola Municipal São José"
              />
            </div>
            <div>
              <label style={labelStyle}>📍 Município</label>
              <select
                style={inputStyle}
                value={municipio}
                onChange={e => { setMunicipio(e.target.value); setPagina(1); }}
              >
                <option value="">Todos os municípios ({municipios.length})</option>
                {municipios.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>🏷️ Categoria</label>
              <select
                style={inputStyle}
                value={categoria}
                onChange={e => { setCategoria(e.target.value); setPagina(1); }}
              >
                <option value="">Todas as categorias</option>
                <option value="0">Campo</option>
                <option value="1">Assentamento</option>
                <option value="2">Terra Indígena</option>
                <option value="3">Quilombola</option>
                <option value="8">Povos Tradicionais</option>
              </select>
            </div>
          </div>

          {!carregando && (
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #EEEEEE', display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 13, color: 'var(--texto-claro)' }}>
              <span>🏫 <strong style={{ color: 'var(--verde)' }}>{filtradas.length.toLocaleString('pt-BR')}</strong> escolas encontradas</span>
              <span>👨‍🎓 <strong style={{ color: 'var(--verde)' }}>{totalMat.toLocaleString('pt-BR')}</strong> matrículas</span>
              <span>👩‍🏫 <strong style={{ color: 'var(--verde)' }}>{totalDoc.toLocaleString('pt-BR')}</strong> docentes</span>
            </div>
          )}
        </div>

        {carregando && <p style={{ textAlign: 'center', padding: 60 }}>⏳ Carregando dados do Censo Escolar...</p>}

        {!carregando && filtradas.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--texto-claro)', padding: 60 }}>
            Nenhuma escola encontrada com esses filtros.
          </p>
        )}

        {/* TABELA */}
        {!carregando && filtradas.length > 0 && (
          <>
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>Nome da Escola</th>
                    <th>Município</th>
                    <th>Categoria</th>
                    <th>Endereço</th>
                    <th>Etapas</th>
                    <th>Alunos</th>
                    <th>Docentes</th>
                    <th>Cód. INEP</th>
                  </tr>
                </thead>
                <tbody>
                  {visiveis.map(e => {
                    const etapas = [
                      e.inf ? 'Infantil' : null,
                      e.fund ? 'Fundamental' : null,
                      e.med ? 'Médio' : null,
                      e.eja ? 'EJA' : null,
                    ].filter(Boolean).join(', ');
                    return (
                      <tr key={e.c}>
                        <td><strong>{e.n}</strong></td>
                        <td>{e.m}</td>
                        <td>
                          <span className="badge" style={{ background: DIF_COR[e.d] + '15', color: DIF_COR[e.d], fontSize: 11, fontWeight: 700 }}>
                            {DIF_LABEL[e.d]}
                          </span>
                        </td>
                        <td style={{ fontSize: 12, color: 'var(--texto-claro)' }}>{e.e || '—'}</td>
                        <td style={{ fontSize: 12 }}>{etapas || '—'}</td>
                        <td style={{ fontWeight: 700, color: 'var(--verde)' }}>{e.mat.toLocaleString('pt-BR')}</td>
                        <td>{e.doc}</td>
                        <td style={{ fontSize: 12, color: '#9E9E9E' }}>{e.c}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* PAGINAÇÃO */}
            {totalPaginas > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
                <button
                  onClick={() => setPagina(p => Math.max(1, p - 1))}
                  disabled={paginaAtual === 1}
                  style={{ ...botaoPag, opacity: paginaAtual === 1 ? 0.4 : 1, cursor: paginaAtual === 1 ? 'not-allowed' : 'pointer' }}
                >
                  ← Anterior
                </button>
                <span style={{ fontSize: 14, color: 'var(--texto-claro)' }}>
                  Página <strong>{paginaAtual}</strong> de <strong>{totalPaginas.toLocaleString('pt-BR')}</strong>
                </span>
                <button
                  onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
                  disabled={paginaAtual === totalPaginas}
                  style={{ ...botaoPag, opacity: paginaAtual === totalPaginas ? 0.4 : 1, cursor: paginaAtual === totalPaginas ? 'not-allowed' : 'pointer' }}
                >
                  Próxima →
                </button>
              </div>
            )}
          </>
        )}

        {/* FONTE */}
        <div className="info-box" style={{ marginTop: 40 }}>
          <p>
            <strong>Fonte dos dados:</strong> Microdados do Censo Escolar da Educação Básica 2024 — INEP/MEC.
            Foram incluídas todas as escolas da <strong>rede municipal</strong>, com <strong>localização rural</strong>,
            <strong> em atividade</strong> no estado do Maranhão. As categorias seguem a classificação de
            "localização diferenciada" do INEP (assentamento, terra indígena, comunidade quilombola e povos tradicionais).
          </p>
        </div>
      </div>
    </>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: 13, fontWeight: 700, color: '#424242', marginBottom: 6 };
const inputStyle: React.CSSProperties = { width: '100%', border: '1px solid #E0E0E0', borderRadius: 8, padding: '10px 12px', fontSize: 14, outline: 'none', boxSizing: 'border-box', background: 'white' };
const botaoPag: React.CSSProperties = { background: 'var(--verde)', color: 'white', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 700 };
