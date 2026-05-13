import { create } from 'zustand';
import { Noticia, TipoNoticia } from '../types';
import { noticiasMock } from '../data/noticias';

interface NoticiasState {
  noticias: Noticia[];
  filtroTipo: TipoNoticia | '';
  busca: string;
  setBusca: (busca: string) => void;
  setFiltroTipo: (tipo: TipoNoticia | '') => void;
  getNoticiasFiltradas: () => Noticia[];
  getDestaques: () => Noticia[];
  incrementarVisualizacao: (id: string) => void;
}

export const useNoticiasStore = create<NoticiasState>((set, get) => ({
  noticias: noticiasMock,
  filtroTipo: '',
  busca: '',
  setBusca: (busca) => set({ busca }),
  setFiltroTipo: (filtroTipo) => set({ filtroTipo }),
  getNoticiasFiltradas: () => {
    const { noticias, filtroTipo, busca } = get();
    return noticias.filter((n) => {
      const matchTipo = !filtroTipo || n.tipo === filtroTipo;
      const matchBusca = !busca || n.titulo.toLowerCase().includes(busca.toLowerCase()) || n.resumo.toLowerCase().includes(busca.toLowerCase());
      return matchTipo && matchBusca;
    });
  },
  getDestaques: () => get().noticias.filter((n) => n.destaque),
  incrementarVisualizacao: (id) => set((state) => ({ noticias: state.noticias.map((n) => n.id === id ? { ...n, visualizacoes: n.visualizacoes + 1 } : n) })),
}));
