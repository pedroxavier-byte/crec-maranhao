import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Chip, Divider, Button } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEscolasStore } from '../../../store/useEscolasStore';
import { PoliticaEscolar } from '../../../types';
import { Colors, Spacing, FontSize, BorderRadius } from '../../../constants/Colors';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface PoliticaInfo { nome: string; descricao: string; icone: IconName; }

const POLITICAS_INFO: Record<PoliticaEscolar, PoliticaInfo> = {
  procampo: { nome: 'PROCAMPO', descricao: 'Apoio à Formação Superior em Licenciatura em Educação do Campo em universidades públicas.', icone: 'school' },
  parfor_equidade: { nome: 'PARFOR Equidade', descricao: 'Formação de professores que atuam em educação indígena, quilombola e do campo.', icone: 'account-school' },
  escola_da_terra: { nome: 'Escola da Terra', descricao: 'Formação continuada para professores de escolas do campo, especialmente multisseriadas.', icone: 'book-education' },
  asie: { nome: 'Ação Saberes Indígenas na Escola', descricao: 'Formação continuada específica para professores indígenas, valorizando saberes e práticas culturais.', icone: 'feather' },
  pnld_campo: { nome: 'PNLD Campo', descricao: 'Distribuição de materiais didáticos adaptados às realidades das escolas do campo e quilombolas.', icone: 'book-open-variant' },
  pnld_indigena: { nome: 'PNLD Educação Escolar Indígena', descricao: 'Distribuição de materiais didáticos e literários específicos para escolas indígenas.', icone: 'book-open-page-variant' },
  pdde_agua: { nome: 'PDDE Água e Saneamento', descricao: 'Recursos para garantir água potável, saneamento e melhorias de infraestrutura. Repasse de R$ 30 mil a R$ 45 mil.', icone: 'water' },
  pdde_campo: { nome: 'PDDE Campo / Indígenas / Quilombolas', descricao: 'Apoio financeiro direto para manutenção e melhoria da infraestrutura escolar.', icone: 'currency-usd' },
  pdde_equidade: { nome: 'PDDE Equidade', descricao: 'Visa aprimorar condições físicas e pedagógicas de escolas em situação de vulnerabilidade.', icone: 'scale-balance' },
  pnae: { nome: 'PNAE — Alimentação Escolar', descricao: 'Oferece alimentação escolar a todos os estudantes, priorizando aquisição da agricultura familiar local.', icone: 'food-apple' },
  pnate: { nome: 'PNATE — Transporte Escolar', descricao: 'Assistência financeira a estados e municípios para garantir transporte dos alunos da zona rural.', icone: 'bus-school' },
  pneei_tee: { nome: 'PNEEI-TEE', descricao: 'Política Nacional de Educação Escolar Indígena nos Territórios Etnoeducacionais (2025), com gestão participativa das comunidades.', icone: 'map-marker-multiple' },
  pneerq: { nome: 'PNEERQ', descricao: 'Política Nacional de Equidade, Educação para as Relações Étnico-Raciais e Educação Escolar Quilombola (2024).', icone: 'star-crescent' },
  pronacampo: { nome: 'PRONACAMPO', descricao: 'Programa Nacional de Educação do Campo, das Águas e das Florestas — principal política nacional para educação do campo.', icone: 'tree' },
  dcn_quilombola: { nome: 'Diretrizes Curriculares Quilombola', descricao: 'Diretrizes Curriculares Nacionais para a Educação Escolar Quilombola na Educação Básica.', icone: 'file-document' },
};

const CATEGORIAS: { id: string; nome: string; politicas: PoliticaEscolar[]; cor: string }[] = [
  { id: 'formacao', nome: 'Formação de Professores e Gestores', politicas: ['procampo', 'parfor_equidade', 'escola_da_terra', 'asie'], cor: '#1565C0' },
  { id: 'material', nome: 'Material Didático e Pedagógico', politicas: ['pnld_campo', 'pnld_indigena'], cor: '#6A1B9A' },
  { id: 'infra', nome: 'Infraestrutura e Apoio Financeiro', politicas: ['pdde_agua', 'pdde_campo', 'pdde_equidade'], cor: '#E65100' },
  { id: 'assistencia', nome: 'Assistência e Permanência do Estudante', politicas: ['pnae', 'pnate'], cor: '#2E7D32' },
  { id: 'estruturantes', nome: 'Políticas Estruturantes e Diretrizes', politicas: ['pneei_tee', 'pneerq', 'pronacampo', 'dcn_quilombola'], cor: '#B71C1C' },
];

const ZONA_NOMES: Record<string, string> = { rural: 'Rural', quilombola: 'Quilombola', assentamento: 'Assentamento', ribeirinha: 'Ribeirinha', indigena: 'Indígena', ceffa: 'CEFFA / Casa Familiar Rural' };
const REDE_LABEL: Record<string, string> = { estadual: 'Rede Estadual', municipal: 'Rede Municipal', federal: 'Rede Federal' };

function InfoRow({ icon, label, value }: { icon: IconName; label: string; value: string }) {
  if (!value) return null;
  return (
    <View style={styles.infoRow}>
      <MaterialCommunityIcons name={icon} size={20} color={Colors.primary} style={styles.infoIcon} />
      <View style={styles.infoTexto}><Text style={styles.infoLabel}>{label}</Text><Text style={styles.infoValue}>{value}</Text></View>
    </View>
  );
}

function NivelLabel(nivel: string) {
  return ({ infantil: 'Educação Infantil', fundamental: 'Ensino Fundamental', medio: 'Ensino Médio', eja: 'EJA', superior: 'Ensino Superior' } as Record<string, string>)[nivel] || nivel;
}

export default function EscolaDetalheScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { escolas } = useEscolasStore();
  const escola = escolas.find((e) => e.id === id);

  if (!escola) return (
    <SafeAreaView style={styles.safe}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Escola não encontrada.</Text>
        <Button onPress={() => router.back()}>Voltar</Button>
      </View>
    </SafeAreaView>
  );

  const categoriasFiltradas = CATEGORIAS.filter((cat) =>
    escola.politicas?.some((p) => cat.politicas.includes(p))
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.textInverse} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <View style={styles.statusBadge}>
              <View style={[styles.statusDot, { backgroundColor: escola.ativa ? '#A5D6A7' : '#EF9A9A' }]} />
              <Text style={styles.statusText}>{escola.ativa ? 'Ativa' : 'Inativa'}</Text>
              {escola.rede && <Text style={styles.redeText}> · {REDE_LABEL[escola.rede] || escola.rede}</Text>}
            </View>
            <Text style={styles.headerTitulo}>{escola.nome}</Text>
            <Text style={styles.headerMunicipio}>{escola.municipio} - MA</Text>
          </View>
        </View>

        <View style={styles.content}>

          {/* Tipo/Zona */}
          <View style={styles.chipsRow}>
            <Chip style={styles.zonaChip} textStyle={styles.zonaChipText}>
              {ZONA_NOMES[escola.zona] || escola.zona}
            </Chip>
            {escola.niveis.map((n) => (
              <Chip key={n} style={styles.nivelChip} textStyle={{ fontSize: FontSize.sm }}>{NivelLabel(n)}</Chip>
            ))}
          </View>

          {/* Povo / Comunidade / Terra Indígena */}
          {(escola.povo || escola.comunidade || escola.terraIndigena) && (
            <View style={styles.identidadeBox}>
              {escola.povo && (
                <View style={styles.identidadeRow}>
                  <MaterialCommunityIcons name="account-multiple" size={16} color={Colors.primary} />
                  <Text style={styles.identidadeLabel}>Povo/Etnia:</Text>
                  <Text style={styles.identidadeValue}>{escola.povo}</Text>
                </View>
              )}
              {escola.comunidade && !escola.povo && (
                <View style={styles.identidadeRow}>
                  <MaterialCommunityIcons name="home-group" size={16} color={Colors.primary} />
                  <Text style={styles.identidadeLabel}>Comunidade:</Text>
                  <Text style={styles.identidadeValue}>{escola.comunidade}</Text>
                </View>
              )}
              {escola.terraIndigena && (
                <View style={styles.identidadeRow}>
                  <MaterialCommunityIcons name="map-marker" size={16} color={Colors.primary} />
                  <Text style={styles.identidadeLabel}>Terra Indígena:</Text>
                  <Text style={styles.identidadeValue}>{escola.terraIndigena}</Text>
                </View>
              )}
            </View>
          )}

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{escola.totalAlunos.toLocaleString('pt-BR')}</Text>
              <Text style={styles.statLabel}>Alunos</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{escola.totalProfessores}</Text>
              <Text style={styles.statLabel}>Professores</Text>
            </View>
          </View>

          <Divider style={styles.divider} />

          {/* Informações Gerais */}
          <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>Informações</Text>
            <InfoRow icon="account-tie" label="Diretor(a)" value={escola.diretor} />
            <InfoRow icon="map-marker-outline" label="Endereço" value={escola.endereco} />
            {escola.telefone && <InfoRow icon="phone-outline" label="Telefone" value={escola.telefone} />}
            {escola.email && <InfoRow icon="email-outline" label="E-mail" value={escola.email} />}
            {escola.codigoInep && <InfoRow icon="barcode" label="Código INEP" value={escola.codigoInep} />}
            <InfoRow icon="calendar" label="Cadastrada em" value={new Date(escola.createdAt).toLocaleDateString('pt-BR')} />
          </View>

          {/* Políticas Públicas */}
          {categoriasFiltradas.length > 0 && (
            <>
              <Divider style={styles.divider} />
              <View style={styles.secao}>
                <Text style={styles.secaoTitulo}>Políticas Públicas Vinculadas</Text>
                <Text style={styles.secaoSub}>Programas e políticas aos quais esta escola está cadastrada.</Text>
                {categoriasFiltradas.map((cat) => {
                  const politicasDaCat = (escola.politicas || []).filter((p) => cat.politicas.includes(p));
                  return (
                    <View key={cat.id} style={styles.catBox}>
                      <View style={[styles.catHeader, { borderLeftColor: cat.cor }]}>
                        <Text style={[styles.catTitulo, { color: cat.cor }]}>{cat.nome}</Text>
                      </View>
                      {politicasDaCat.map((p) => {
                        const info = POLITICAS_INFO[p];
                        return (
                          <View key={p} style={styles.politicaItem}>
                            <View style={[styles.politicaIcone, { backgroundColor: cat.cor + '15' }]}>
                              <MaterialCommunityIcons name={info.icone} size={18} color={cat.cor} />
                            </View>
                            <View style={styles.politicaTexto}>
                              <Text style={styles.politicaNome}>{info.nome}</Text>
                              <Text style={styles.politicaDesc}>{info.descricao}</Text>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            </>
          )}

          <View style={{ height: 20 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { backgroundColor: Colors.primary, padding: Spacing.lg, paddingTop: Spacing.md },
  backBtn: { marginBottom: Spacing.sm },
  headerContent: {},
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.9)' },
  redeText: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.7)' },
  headerTitulo: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.textInverse, lineHeight: 28 },
  headerMunicipio: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)', marginTop: 6 },
  content: { padding: Spacing.lg },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Spacing.md },
  zonaChip: { alignSelf: 'flex-start', backgroundColor: Colors.primary + '20' },
  zonaChipText: { color: Colors.primary, fontWeight: '700' },
  nivelChip: { backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.border },
  identidadeBox: { backgroundColor: Colors.primary + '08', borderRadius: BorderRadius.md, padding: Spacing.md, marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.primary + '30' },
  identidadeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  identidadeLabel: { fontSize: FontSize.sm, color: Colors.textLight, fontWeight: '600' },
  identidadeValue: { fontSize: FontSize.sm, color: Colors.text, flex: 1 },
  statsRow: { flexDirection: 'row', backgroundColor: Colors.primary, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.sm },
  statBox: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: FontSize.xxxl, fontWeight: '800', color: Colors.textInverse },
  statLabel: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.3)' },
  divider: { marginVertical: Spacing.lg },
  secao: { marginBottom: Spacing.lg },
  secaoTitulo: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text, marginBottom: 4 },
  secaoSub: { fontSize: FontSize.sm, color: Colors.textLight, marginBottom: Spacing.md },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.border },
  infoIcon: { marginRight: Spacing.md, marginTop: 2 },
  infoTexto: { flex: 1 },
  infoLabel: { fontSize: FontSize.sm, color: Colors.textLight, marginBottom: 2 },
  infoValue: { fontSize: FontSize.md, color: Colors.text },
  catBox: { marginBottom: Spacing.md, backgroundColor: Colors.surface, borderRadius: BorderRadius.md, overflow: 'hidden', elevation: 1 },
  catHeader: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderLeftWidth: 4, backgroundColor: Colors.background },
  catTitulo: { fontSize: FontSize.sm, fontWeight: '700' },
  politicaItem: { flexDirection: 'row', alignItems: 'flex-start', padding: Spacing.md, gap: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.border },
  politicaIcone: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  politicaTexto: { flex: 1 },
  politicaNome: { fontSize: FontSize.sm, fontWeight: '700', color: Colors.text, marginBottom: 2 },
  politicaDesc: { fontSize: FontSize.xs, color: Colors.textLight, lineHeight: 17 },
});
