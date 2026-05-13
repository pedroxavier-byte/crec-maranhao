export type UserRole = 'admin' | 'gestor' | 'agente_territorial' | 'conselho' | 'pesquisador' | 'estudante' | 'professor';
export type UserStatus = 'ativo' | 'pendente' | 'rejeitado';

export interface User {
  id: string;
  nome: string;
  email: string;
  senha?: string;
  role: UserRole;
  status: UserStatus;
  municipio?: string;
  instituicao?: string;
  cargo?: string;
  escola?: string;
  disciplina?: string;
  curso?: string;
  nivelEnsino?: string;
  zonaAtuacao?: string;
  tipoConselho?: string;
  lattes?: string;
  telefone?: string;
  observacao?: string;
  createdAt: string;
}

export type NivelEnsino = 'infantil' | 'fundamental' | 'medio' | 'eja' | 'superior';
export type ZonaEscola = 'rural' | 'quilombola' | 'assentamento' | 'ribeirinha' | 'indigena' | 'ceffa';

export type PoliticaEscolar =
  | 'procampo'
  | 'parfor_equidade'
  | 'escola_da_terra'
  | 'asie'
  | 'pnld_campo'
  | 'pnld_indigena'
  | 'pdde_agua'
  | 'pdde_campo'
  | 'pdde_equidade'
  | 'pnae'
  | 'pnate'
  | 'pneei_tee'
  | 'pneerq'
  | 'pronacampo'
  | 'dcn_quilombola';

export interface Escola {
  id: string;
  nome: string;
  municipio: string;
  zona: ZonaEscola;
  niveis: NivelEnsino[];
  endereco: string;
  telefone?: string;
  email?: string;
  diretor: string;
  totalAlunos: number;
  totalProfessores: number;
  latitude?: number;
  longitude?: number;
  ativa: boolean;
  createdAt: string;
  comunidade?: string;
  povo?: string;
  terraIndigena?: string;
  rede?: 'estadual' | 'municipal' | 'federal';
  politicas?: PoliticaEscolar[];
  codigoInep?: string;
}

export type TipoMaterial = 'artigo' | 'livro' | 'cartilha' | 'video' | 'plano_aula' | 'pesquisa' | 'legislacao' | 'outro';
export type AreaTematica = 'agroecologia' | 'pedagogia_alternancia' | 'questao_agraria' | 'cultura_camponesa' | 'movimentos_sociais' | 'educacao_popular' | 'reforma_agraria' | 'povos_aguas_florestas' | 'politicas_publicas' | 'outro';

export interface Material {
  id: string;
  titulo: string;
  descricao: string;
  tipo: TipoMaterial;
  areaTematica: AreaTematica;
  autor: string;
  ano: number;
  url?: string;
  tags: string[];
  downloads: number;
  favoritos: number;
  createdAt: string;
}

export type TipoPessoa = 'pesquisador' | 'professor' | 'gestor' | 'militante';

export interface Pesquisador {
  id: string;
  nome: string;
  tipo: TipoPessoa;
  instituicao: string;
  municipio: string;
  email: string;
  telefone?: string;
  lattes?: string;
  areasAtuacao: AreaTematica[];
  bio: string;
  publicacoes: number;
  ativo: boolean;
  createdAt: string;
}

export type TipoNoticia = 'noticia' | 'evento' | 'edital' | 'comunicado';

export interface Noticia {
  id: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  tipo: TipoNoticia;
  autor: string;
  entidade?: string;
  dataPublicacao: string;
  dataEvento?: string;
  localEvento?: string;
  tags: string[];
  visualizacoes: number;
  destaque: boolean;
}

export interface IndicadorMunicipio {
  municipio: string;
  totalEscolas: number;
  totalAlunos: number;
  totalProfessores: number;
  escolasAtivas: number;
  niveis: Record<NivelEnsino, number>;
  zonas: Record<ZonaEscola, number>;
}

export interface RelatorioGeral {
  totalEscolas: number;
  totalAlunos: number;
  totalProfessores: number;
  totalMunicipios: number;
  totalMateriais: number;
  totalPesquisadores: number;
  porMunicipio: IndicadorMunicipio[];
  porZona: Record<ZonaEscola, number>;
  porNivel: Record<NivelEnsino, number>;
}
