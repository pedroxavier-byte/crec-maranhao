import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pqpwhekpuyptpweyeymh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxcHdoZWtwdXlwdHB3ZXlleW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2ODY2ODYsImV4cCI6MjA5NDI2MjY4Nn0.FSiLo44CY6h8MjH7CQ7oWH1dgvEo9HNoVx5w0LvXSJM';

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
