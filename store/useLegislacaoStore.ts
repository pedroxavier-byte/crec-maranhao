import { create } from 'zustand';
import { legislacaoMock, Legislacao, AmbitoLei, CategoriaLei } from '../data/legislacao';

interface FiltrosLegislacao {
  busca: string;
  ambito: AmbitoLei | '';
  categoria: CategoriaLei | '';
}

interface LegislacaoStore {
  legislacoes: Legislacao[];
  filtros: FiltrosLegislacao;
  setFiltros: (f: Partial<FiltrosLegislacao>) => void;
  getLegislacoesFiltradas: () => Legislacao[];
  getDestaques: () => Legislacao[];
}

export const useLegislacaoStore = create<LegislacaoStore>((set, get) => ({
  legislacoes: legislacaoMock,
  filtros: { busca: '', ambito: '', categoria: '' },
  setFiltros: (f) => set((s) => ({ filtros: { ...s.filtros, ...f } })),
  getLegislacoesFiltradas: () => {
    const { legislacoes, filtros } = get();
    return legislacoes.filter((l) => {
      const busca = filtros.busca.toLowerCase();
      const matchBusca = !busca || l.titulo.toLowerCase().includes(busca) || l.numero.toLowerCase().includes(busca) || l.ementa.toLowerCase().includes(busca) || l.tags.some((t) => t.toLowerCase().includes(busca));
      const matchAmbito = !filtros.ambito || l.ambito === filtros.ambito;
      const matchCategoria = !filtros.categoria || l.categoria === filtros.categoria;
      return matchBusca && matchAmbito && matchCategoria;
    });
  },
  getDestaques: () => get().legislacoes.filter((l) => l.destaque),
}));
