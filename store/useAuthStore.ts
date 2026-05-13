import { create } from 'zustand';
import { User, UserRole } from '../types';

const ADMIN_EMAIL = 'admin@crec.ma.gov.br';
const ADMIN_SENHA = 'crec2025';

const adminUser: User = {
  id: 'admin-001',
  nome: 'Administrador CREC-MA',
  email: ADMIN_EMAIL,
  role: 'admin',
  status: 'ativo',
  instituicao: 'CREC-MA / SEDUC-MA',
  createdAt: '2024-01-01',
};

export const ROLES_RESTRITAS: UserRole[] = ['gestor', 'agente_territorial', 'conselho'];

interface AuthStore {
  user: User | null;
  usuarios: User[];
  loading: boolean;
  erro: string;
  login: (email: string, senha: string) => Promise<{ ok: boolean; mensagem: string }>;
  logout: () => void;
  registrar: (dados: Omit<User, 'id' | 'status' | 'createdAt'> & { senha: string }) => Promise<{ ok: boolean; mensagem: string; pendente?: boolean }>;
  aprovarUsuario: (id: string) => void;
  rejeitarUsuario: (id: string) => void;
  getPendentes: () => User[];
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  usuarios: [adminUser],
  loading: false,
  erro: '',

  login: async (email, senha) => {
    set({ loading: true, erro: '' });
    await new Promise((r) => setTimeout(r, 800));

    if (email.trim() === ADMIN_EMAIL && senha === ADMIN_SENHA) {
      set({ user: adminUser, loading: false });
      return { ok: true, mensagem: '' };
    }

    const usuario = get().usuarios.find((u) => u.email === email && u.senha === senha);

    if (!usuario) {
      set({ loading: false, erro: 'E-mail ou senha incorretos.' });
      return { ok: false, mensagem: 'E-mail ou senha incorretos.' };
    }

    if (usuario.status === 'pendente') {
      set({ loading: false });
      return { ok: false, mensagem: 'Seu cadastro está aguardando aprovação do administrador.' };
    }

    if (usuario.status === 'rejeitado') {
      set({ loading: false });
      return { ok: false, mensagem: 'Seu cadastro foi recusado. Entre em contato com o CREC-MA.' };
    }

    set({ user: usuario, loading: false });
    return { ok: true, mensagem: '' };
  },

  logout: () => set({ user: null }),

  registrar: async (dados) => {
    set({ loading: true, erro: '' });
    await new Promise((r) => setTimeout(r, 800));

    const { usuarios } = get();
    if (usuarios.find((u) => u.email === dados.email)) {
      set({ loading: false });
      return { ok: false, mensagem: 'Este e-mail já está cadastrado.' };
    }

    const isPendente = ROLES_RESTRITAS.includes(dados.role);
    const { senha, ...restoDados } = dados;
    const novoUsuario: User = {
      ...restoDados,
      senha,
      id: `user-${Date.now()}`,
      status: isPendente ? 'pendente' : 'ativo',
      createdAt: new Date().toISOString().split('T')[0],
    };

    set({ usuarios: [...usuarios, novoUsuario], loading: false });

    if (!isPendente) {
      set({ user: novoUsuario });
    }

    return {
      ok: true,
      mensagem: isPendente
        ? 'Cadastro enviado! Aguarde a aprovação do administrador do CREC-MA.'
        : 'Cadastro realizado com sucesso!',
      pendente: isPendente,
    };
  },

  aprovarUsuario: (id) => set((s) => ({
    usuarios: s.usuarios.map((u) => u.id === id ? { ...u, status: 'ativo' } : u),
  })),

  rejeitarUsuario: (id) => set((s) => ({
    usuarios: s.usuarios.map((u) => u.id === id ? { ...u, status: 'rejeitado' } : u),
  })),

  getPendentes: () => get().usuarios.filter((u) => u.status === 'pendente'),

  isAdmin: () => get().user?.role === 'admin',
}));
