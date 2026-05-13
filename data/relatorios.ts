import { RelatorioGeral } from '../types';

export const relatorioGeralMock: RelatorioGeral = {
  totalEscolas: 1247, totalAlunos: 186420, totalProfessores: 8934, totalMunicipios: 217, totalMateriais: 542, totalPesquisadores: 318,
  porZona: { rural: 612, quilombola: 287, assentamento: 198, ribeirinha: 112, indigena: 38, ceffa: 15 },
  porNivel: { infantil: 342, fundamental: 876, medio: 156, eja: 198, superior: 12 },
  porMunicipio: [
    { municipio: 'São Luís', totalEscolas: 42, totalAlunos: 12400, totalProfessores: 580, escolasAtivas: 40, niveis: { infantil: 12, fundamental: 28, medio: 8, eja: 6, superior: 2 }, zonas: { rural: 20, quilombola: 8, assentamento: 10, ribeirinha: 3, indigena: 1, ceffa: 2 } },
    { municipio: 'Imperatriz', totalEscolas: 35, totalAlunos: 9800, totalProfessores: 420, escolasAtivas: 34, niveis: { infantil: 8, fundamental: 24, medio: 6, eja: 5, superior: 0 }, zonas: { rural: 15, quilombola: 5, assentamento: 12, ribeirinha: 2, indigena: 1, ceffa: 2 } },
    { municipio: 'Bacabal', totalEscolas: 28, totalAlunos: 7200, totalProfessores: 310, escolasAtivas: 27, niveis: { infantil: 6, fundamental: 20, medio: 4, eja: 4, superior: 0 }, zonas: { rural: 14, quilombola: 6, assentamento: 6, ribeirinha: 2, indigena: 0, ceffa: 1 } },
    { municipio: 'Caxias', totalEscolas: 24, totalAlunos: 6100, totalProfessores: 268, escolasAtivas: 24, niveis: { infantil: 5, fundamental: 17, medio: 3, eja: 3, superior: 0 }, zonas: { rural: 12, quilombola: 4, assentamento: 7, ribeirinha: 1, indigena: 0, ceffa: 0 } },
    { municipio: 'Alcântara', totalEscolas: 18, totalAlunos: 3200, totalProfessores: 142, escolasAtivas: 18, niveis: { infantil: 5, fundamental: 12, medio: 1, eja: 2, superior: 0 }, zonas: { rural: 4, quilombola: 12, assentamento: 1, ribeirinha: 1, indigena: 0, ceffa: 0 } },
  ],
};
