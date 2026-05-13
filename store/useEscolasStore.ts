import { create } from 'zustand';
import { Escola, ZonaEscola, NivelEnsino } from '../types';
import { escolasMock } from '../data/escolas';

interface FiltrosEscola { busca: string; zona: ZonaEscola | ''; nivel: NivelEnsino | ''; municipio: string; }

interface EscolasState {
  escolas: Escola[];
  filtros: FiltrosEscola;
  setFiltros: (filtros: Partial<FiltrosEscola>) => void;
  adicionarEscola: (escola: Omit<Escola, 'id' | 'createdAt'>) => void;
  getEscolasFiltradas: () => Escola[];
}

export const useEscolasStore = create<EscolasState>((set, get) => ({
  escolas: escolasMock,
  filtros: { busca: '', zona: '', nivel: '', municipio: '' },
  setFiltros: (filtros) => set((state) => ({ filtros: { ...state.filtros, ...filtros } })),
  adicionarEscola: (dados) => set((state) => ({ escolas: [{ ...dados, id: String(Date.now()), createdAt: new Date().toISOString().split('T')[0] }, ...state.escolas] })),
  getEscolasFiltradas: () => {
    const { escolas, filtros } = get();
    return escolas.filter((e) => {
      const matchBusca = !filtros.busca || e.nome.toLowerCase().includes(filtros.busca.toLowerCase()) || e.municipio.toLowerCase().includes(filtros.busca.toLowerCase());
      const matchZona = !filtros.zona || e.zona === filtros.zona;
      const matchNivel = !filtros.nivel || e.niveis.includes(filtros.nivel);
      return matchBusca && matchZona && matchNivel;
    });
  },
}));
