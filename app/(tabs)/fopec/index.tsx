import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Chip, Card, Divider } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNoticiasStore } from '../../../store/useNoticiasStore';
import { Colors, Spacing, FontSize, BorderRadius } from '../../../constants/Colors';

const VERDE_ESCURO = '#1B5E20';
const VERDE_MEDIO = '#2E7D32';
const VERDE_CLARO = '#E8F5E9';
const VERDE_BORDA = '#A5D6A7';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const MOVIMENTOS = [
  { sigla: 'MST', nome: 'Movimento dos Trabalhadores Rurais Sem Terra', icone: 'tractor' as IconName },
  { sigla: 'MIQCB', nome: 'Movimento Interestadual das Quebradeiras de Coco Babaçu', icone: 'tree' as IconName },
  { sigla: 'FETAEMA', nome: 'Federação dos Trabalhadores Rurais Agricultores e Agricultoras Familiares do Maranhão', icone: 'account-group' as IconName },
  { sigla: 'CPT', nome: 'Comissão Pastoral da Terra', icone: 'church' as IconName },
  { sigla: 'MOQUIBOM', nome: 'Movimento Quilombola do Maranhão', icone: 'star-crescent' as IconName },
  { sigla: 'UFMA / UEMA / IFMA', nome: 'Universidades e Instituto Federal parceiros', icone: 'school' as IconName },
];

const PAUTAS = [
  { icone: 'school-outline' as IconName, titulo: 'Fechamento de escolas', descricao: 'Combate ao fechamento e à nucleação forçada de escolas do campo no Maranhão.' },
  { icone: 'home-city-outline' as IconName, titulo: 'PRONERA', descricao: 'Garantia e ampliação do Programa Nacional de Educação na Reforma Agrária em assentamentos e quilombos.' },
  { icone: 'book-education-outline' as IconName, titulo: 'LEDOC', descricao: 'Defesa e expansão da Licenciatura em Educação do Campo na UFMA e demais instituições.' },
  { icone: 'bus-school' as IconName, titulo: 'Transporte escolar', descricao: 'Transporte digno e seguro para estudantes que vivem nas comunidades rurais do estado.' },
  { icone: 'file-document-edit-outline' as IconName, titulo: 'Currículo contextualizado', descricao: 'Currículo que respeita a identidade, os saberes e a cultura das populações camponesas.' },
  { icone: 'hammer-wrench' as IconName, titulo: 'Infraestrutura', descricao: 'Garantia de água potável, saneamento, internet e condições dignas nas escolas do campo.' },
  { icone: 'sprout-outline' as IconName, titulo: 'Agroecologia', descricao: 'Promoção da agroecologia e soberania alimentar como bases do projeto pedagógico do campo.' },
];

const AGENDA = [
  { data: 'Jun/2025', descricao: 'Reunião com a Comissão de Educação da Assembleia Legislativa do Maranhão (ALEMA) — pautas sobre fechamento de escolas, infraestrutura e currículo.', cor: VERDE_ESCURO },
  { data: 'Abr/2025', descricao: 'Nota de repúdio pela interdição do CEFMA em Nina Rodrigues/MA — centro de referência do MST deixado sem investimento pelo governo estadual.', cor: '#B71C1C' },
  { data: 'Set/2024', descricao: 'Participação no Seminário Nacional do FONEC em Brasília — elaboração de documento estratégico para as políticas de Educação do Campo.', cor: VERDE_MEDIO },
  { data: 'Mar/2024', descricao: 'Participação no I Encontro Nacional de Educação do Campo, das Águas e das Florestas (ENECAF) em Salvador/BA — carta ao Presidente Lula com demandas urgentes.', cor: VERDE_MEDIO },
  { data: '2017', descricao: 'Acordo com o Governo do Estado para cessão e funcionamento do CEFMA como espaço de formação em Educação do Campo.', cor: Colors.textLight },
];

function PautaCard({ icone, titulo, descricao }: { icone: IconName; titulo: string; descricao: string }) {
  return (
    <View style={styles.pautaItem}>
      <View style={styles.pautaIcone}><MaterialCommunityIcons name={icone} size={22} color={VERDE_ESCURO} /></View>
      <View style={styles.pautaTexto}>
        <Text style={styles.pautaTitulo}>{titulo}</Text>
        <Text style={styles.pautaDesc}>{descricao}</Text>
      </View>
    </View>
  );
}

export default function FopecScreen() {
  const { noticias } = useNoticiasStore();
  const noticiasFopec = noticias.filter((n) => n.entidade === 'FOPEC-MA');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.emblema}>
            <MaterialCommunityIcons name="leaf" size={40} color="#fff" />
          </View>
          <Text style={styles.headerSigla}>FOPEC-MA</Text>
          <Text style={styles.headerNome}>Fórum Popular de Educação do Campo do Maranhão</Text>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>Articulação Estadual · Sociedade Civil</Text>
          </View>
        </View>

        <View style={styles.content}>

          {/* O que é */}
          <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>O que é o FOPEC-MA</Text>
            <Text style={styles.paragrafo}>
              O <Text style={styles.negrito}>Fórum Popular de Educação do Campo do Maranhão (FOPEC-MA)</Text> é uma articulação estadual autônoma da sociedade civil formada por movimentos sociais, sindicatos, organizações populares e universidades que atuam na defesa dos direitos das populações camponesas, quilombolas, indígenas, ribeirinhas e extrativistas do Maranhão à educação.
            </Text>
            <Text style={styles.paragrafo}>
              Trata-se de uma instância <Text style={styles.negrito}>civil, autônoma e popular</Text> — não governamental — que articula diferentes coletivos sociais em torno da pauta da Educação do Campo, das Águas e das Florestas no estado.
            </Text>
          </View>

          <Divider style={styles.divider} />

          {/* Base política */}
          <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>Base Filosófica e Política</Text>
            <View style={styles.baseBox}>
              {[
                { icone: 'account-voice' as IconName, texto: 'Autonomia em relação ao Estado — a sociedade civil construindo sua própria educação' },
                { icone: 'sprout' as IconName, texto: 'Pedagogia da alternância e educação contextualizada à realidade do campo' },
                { icone: 'handshake' as IconName, texto: 'Reforma agrária popular e soberania alimentar como horizontes políticos' },
                { icone: 'map-marker-radius' as IconName, texto: 'Escola vinculada ao território, ao povo e à luta social' },
                { icone: 'human-greeting' as IconName, texto: 'Influência da Pedagogia de Paulo Freire e da Educação Popular' },
              ].map((item, i) => (
                <View key={i} style={styles.baseItem}>
                  <MaterialCommunityIcons name={item.icone} size={18} color={VERDE_ESCURO} />
                  <Text style={styles.baseTexto}>{item.texto}</Text>
                </View>
              ))}
            </View>
          </View>

          <Divider style={styles.divider} />

          {/* Composição */}
          <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>Composição</Text>
            <Text style={styles.secaoSub}>Movimentos sociais, sindicatos e instituições que integram o fórum</Text>
            {MOVIMENTOS.map((m, i) => (
              <View key={i} style={styles.movimentoItem}>
                <View style={styles.movimentoIcone}>
                  <MaterialCommunityIcons name={m.icone} size={20} color={VERDE_ESCURO} />
                </View>
                <View style={styles.movimentoTexto}>
                  <Text style={styles.movimentoSigla}>{m.sigla}</Text>
                  <Text style={styles.movimentoNome}>{m.nome}</Text>
                </View>
              </View>
            ))}
            <View style={styles.eOutros}>
              <MaterialCommunityIcons name="dots-horizontal-circle-outline" size={20} color={Colors.textLight} />
              <Text style={styles.eOutrosText}>e outros movimentos sociais, pastorais e coletivos populares do campo maranhense.</Text>
            </View>
          </View>

          <Divider style={styles.divider} />

          {/* Vinculação Nacional */}
          <View style={styles.fonecBox}>
            <View style={styles.fonecHeader}>
              <MaterialCommunityIcons name="web" size={22} color={VERDE_ESCURO} />
              <Text style={styles.fonecTitulo}>Vinculação Nacional</Text>
            </View>
            <Text style={styles.fonecTexto}>
              O FOPEC-MA está articulado ao <Text style={styles.negrito}>FONEC — Fórum Nacional de Educação do Campo</Text>, criado em agosto de 2010 na sede da CONTAG em Brasília, que reúne movimentos populares, universidades federais, institutos federais e organizações internacionais como a Via Campesina. O FOPEC-MA funciona como expressão estadual do FONEC no Maranhão.
            </Text>
          </View>

          <Divider style={styles.divider} />

          {/* Pautas */}
          <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>Nossas Pautas e Lutas</Text>
            {PAUTAS.map((p, i) => <PautaCard key={i} {...p} />)}
          </View>

          <Divider style={styles.divider} />

          {/* Agenda */}
          <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>Agenda Recente</Text>
            {AGENDA.map((a, i) => (
              <View key={i} style={styles.agendaItem}>
                <View style={[styles.agendaData, { backgroundColor: a.cor + '20', borderColor: a.cor + '60' }]}>
                  <Text style={[styles.agendaDataText, { color: a.cor }]}>{a.data}</Text>
                </View>
                <Text style={styles.agendaDesc}>{a.descricao}</Text>
              </View>
            ))}
          </View>

          {/* Notícias do FOPEC */}
          {noticiasFopec.length > 0 && (
            <>
              <Divider style={styles.divider} />
              <View style={styles.secao}>
                <View style={styles.secaoHeaderRow}>
                  <Text style={styles.secaoTitulo}>Notícias e Comunicados</Text>
                  <TouchableOpacity onPress={() => router.push('/(tabs)/noticias/index' as any)}>
                    <Text style={styles.verTodos}>Ver todos</Text>
                  </TouchableOpacity>
                </View>
                {noticiasFopec.slice(0, 3).map((n) => (
                  <TouchableOpacity key={n.id} onPress={() => router.push(`/(tabs)/noticias/${n.id}` as any)}>
                    <Card style={styles.noticiaCard}>
                      <Card.Content>
                        <Chip style={styles.noticiaChip} textStyle={styles.noticiaChipText}>
                          {n.tipo.charAt(0).toUpperCase() + n.tipo.slice(1)}
                        </Chip>
                        <Text style={styles.noticiaTitulo} numberOfLines={2}>{n.titulo}</Text>
                        <Text style={styles.noticiaResumo} numberOfLines={2}>{n.resumo}</Text>
                        <Text style={styles.noticiaData}>
                          {new Date(n.dataPublicacao).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </Text>
                      </Card.Content>
                    </Card>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {/* Rodapé */}
          <View style={styles.rodape}>
            <MaterialCommunityIcons name="information-outline" size={16} color={Colors.textLight} />
            <Text style={styles.rodapeTexto}>O FOPEC-MA é uma articulação da sociedade civil, distinta do Fórum Estadual de Educação do Maranhão (FEE-MA), que é instância governamental. Para contato, acesse o site do FONEC ou dos movimentos que o integram.</Text>
          </View>

          <View style={{ height: 24 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { backgroundColor: VERDE_ESCURO, alignItems: 'center', paddingHorizontal: Spacing.xl, paddingTop: Spacing.xl, paddingBottom: Spacing.xxl },
  emblema: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.md, borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)' },
  headerSigla: { fontSize: FontSize.xxl, fontWeight: '900', color: '#fff', letterSpacing: 2 },
  headerNome: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.85)', textAlign: 'center', lineHeight: 20, marginTop: 4, marginBottom: Spacing.md },
  headerBadge: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: BorderRadius.round, paddingHorizontal: Spacing.md, paddingVertical: 4, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  headerBadgeText: { fontSize: FontSize.xs, color: 'rgba(255,255,255,0.9)', fontWeight: '600' },
  content: { padding: Spacing.lg },
  secao: { marginBottom: Spacing.lg },
  secaoTitulo: { fontSize: FontSize.lg, fontWeight: '800', color: VERDE_ESCURO, marginBottom: 6 },
  secaoSub: { fontSize: FontSize.sm, color: Colors.textLight, marginBottom: Spacing.md },
  secaoHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  verTodos: { fontSize: FontSize.sm, color: VERDE_MEDIO, fontWeight: '600' },
  paragrafo: { fontSize: FontSize.md, color: Colors.text, lineHeight: 24, marginBottom: Spacing.sm },
  negrito: { fontWeight: '700', color: VERDE_ESCURO },
  divider: { marginVertical: Spacing.lg },

  baseBox: { backgroundColor: VERDE_CLARO, borderRadius: BorderRadius.md, padding: Spacing.md, borderWidth: 1, borderColor: VERDE_BORDA },
  baseItem: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm, paddingVertical: Spacing.sm },
  baseTexto: { flex: 1, fontSize: FontSize.sm, color: Colors.text, lineHeight: 20 },

  movimentoItem: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md, paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.border },
  movimentoIcone: { width: 38, height: 38, borderRadius: 19, backgroundColor: VERDE_CLARO, alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderWidth: 1, borderColor: VERDE_BORDA },
  movimentoTexto: { flex: 1 },
  movimentoSigla: { fontSize: FontSize.md, fontWeight: '800', color: VERDE_ESCURO },
  movimentoNome: { fontSize: FontSize.sm, color: Colors.textLight, lineHeight: 18, marginTop: 1 },
  eOutros: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm, paddingTop: Spacing.md },
  eOutrosText: { flex: 1, fontSize: FontSize.sm, color: Colors.textLight, fontStyle: 'italic', lineHeight: 20 },

  fonecBox: { backgroundColor: VERDE_CLARO, borderRadius: BorderRadius.md, padding: Spacing.md, borderWidth: 1, borderColor: VERDE_BORDA },
  fonecHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  fonecTitulo: { fontSize: FontSize.md, fontWeight: '700', color: VERDE_ESCURO },
  fonecTexto: { fontSize: FontSize.sm, color: Colors.text, lineHeight: 22 },

  pautaItem: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md, paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.border },
  pautaIcone: { width: 38, height: 38, borderRadius: 19, backgroundColor: VERDE_CLARO, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  pautaTexto: { flex: 1 },
  pautaTitulo: { fontSize: FontSize.md, fontWeight: '700', color: Colors.text, marginBottom: 2 },
  pautaDesc: { fontSize: FontSize.sm, color: Colors.textLight, lineHeight: 20 },

  agendaItem: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm, marginBottom: Spacing.md },
  agendaData: { borderRadius: BorderRadius.sm, paddingHorizontal: Spacing.sm, paddingVertical: 4, borderWidth: 1, flexShrink: 0, minWidth: 72, alignItems: 'center' },
  agendaDataText: { fontSize: FontSize.xs, fontWeight: '800' },
  agendaDesc: { flex: 1, fontSize: FontSize.sm, color: Colors.text, lineHeight: 20 },

  noticiaCard: { marginBottom: Spacing.md, backgroundColor: Colors.surface, borderRadius: BorderRadius.md, borderLeftWidth: 3, borderLeftColor: VERDE_ESCURO },
  noticiaChip: { alignSelf: 'flex-start', height: 24, backgroundColor: VERDE_CLARO, marginBottom: 6 },
  noticiaChipText: { fontSize: 10, color: VERDE_ESCURO, fontWeight: '700' },
  noticiaTitulo: { fontSize: FontSize.md, fontWeight: '700', color: Colors.text, marginBottom: 4, lineHeight: 22 },
  noticiaResumo: { fontSize: FontSize.sm, color: Colors.textLight, lineHeight: 20 },
  noticiaData: { fontSize: FontSize.xs, color: Colors.textLight, marginTop: 6 },

  rodape: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm, backgroundColor: Colors.border + '30', borderRadius: BorderRadius.md, padding: Spacing.md },
  rodapeTexto: { flex: 1, fontSize: FontSize.xs, color: Colors.textLight, lineHeight: 18 },
});
