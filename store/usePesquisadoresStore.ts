import { create } from 'zustand';
import { pesquisadoresMock } from '../data/pesquisadores';
import { Pesquisador, TipoPessoa } from '../types';

interface FiltrosPesquisadores {
  busca: string;
  tipo: TipoPessoa | '';
}

interface PesquisadoresStore {
  pesquisadores: Pesquisador[];
  filtros: FiltrosPesquisadores;
  setFiltros: (f: Partial<FiltrosPesquisadores>) => void;
  getPesquisadoresFiltrados: () => Pesquisador[];
}

export const usePesquisadoresStore = create<PesquisadoresStore>((set, get) => ({
  pesquisadores: pesquisadoresMock,
  filtros: { busca: '', tipo: '' },
  setFiltros: (f) => set((s) => ({ filtros: { ...s.filtros, ...f } })),
  getPesquisadoresFiltrados: () => {
    const { pesquisadores, filtros } = get();
    return pesquisadores.filter((p) => {
      const busca = filtros.busca.toLowerCase();
      const matchBusca = !busca || p.nome.toLowerCase().includes(busca) || p.instituicao.toLowerCase().includes(busca) || p.areasAtuacao.some((a) => a.toLowerCase().includes(busca));
      const matchTipo = !filtros.tipo || p.tipo === filtros.tipo;
      return matchBusca && matchTipo;
    });
  },
}));
