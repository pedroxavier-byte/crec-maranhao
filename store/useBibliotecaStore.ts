import { create } from 'zustand';
import { Material, TipoMaterial, AreaTematica } from '../types';
import { materiaisMock } from '../data/materiais';

interface FiltrosBiblioteca { busca: string; tipo: TipoMaterial | ''; area: AreaTematica | ''; }

interface BibliotecaState {
  materiais: Material[];
  filtros: FiltrosBiblioteca;
  favoritos: string[];
  setFiltros: (filtros: Partial<FiltrosBiblioteca>) => void;
  toggleFavorito: (id: string) => void;
  incrementarDownload: (id: string) => void;
  getMateriaisFiltrados: () => Material[];
}

export const useBibliotecaStore = create<BibliotecaState>((set, get) => ({
  materiais: materiaisMock,
  filtros: { busca: '', tipo: '', area: '' },
  favoritos: [],
  setFiltros: (filtros) => set((state) => ({ filtros: { ...state.filtros, ...filtros } })),
  toggleFavorito: (id) => set((state) => ({ favoritos: state.favoritos.includes(id) ? state.favoritos.filter((f) => f !== id) : [...state.favoritos, id] })),
  incrementarDownload: (id) => set((state) => ({ materiais: state.materiais.map((m) => m.id === id ? { ...m, downloads: m.downloads + 1 } : m) })),
  getMateriaisFiltrados: () => {
    const { materiais, filtros } = get();
    return materiais.filter((m) => {
      const matchBusca = !filtros.busca || m.titulo.toLowerCase().includes(filtros.busca.toLowerCase()) || m.autor.toLowerCase().includes(filtros.busca.toLowerCase()) || m.tags.some((t) => t.toLowerCase().includes(filtros.busca.toLowerCase()));
      const matchTipo = !filtros.tipo || m.tipo === filtros.tipo;
      const matchArea = !filtros.area || m.areaTematica === filtros.area;
      return matchBusca && matchTipo && matchArea;
    });
  },
}));
