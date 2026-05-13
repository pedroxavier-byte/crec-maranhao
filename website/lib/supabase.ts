import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pqpwhekpuyptpweyeymh.supabase.co';
const supabaseKey = 'sb_publishable_dQOYcOS1x_M1YX1i4vERVg_Y_djA1VN';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type AgenteTerritorial = {
  id: string;
  user_id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  municipios: string[];
  organizacao: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  created_at: string;
};

export type PesquisaEscola = {
  id: string;
  agente_id: string;
  escola_nome: string;
  municipio: string;
  data_visita: string;
  observacoes: string;
  status: 'rascunho' | 'enviado';
  created_at: string;
};

export type AcaoSecretaria = {
  id: string;
  agente_id: string;
  municipio: string;
  data_acao: string;
  descricao: string;
  documento_url: string;
  documento_nome: string;
  created_at: string;
};
