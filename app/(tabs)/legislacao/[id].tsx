import { ScrollView, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Text, Chip, Divider, Button } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLegislacaoStore } from '../../../store/useLegislacaoStore';
import { AmbitoLei } from '../../../data/legislacao';
import { Colors, Spacing, FontSize, BorderRadius } from '../../../constants/Colors';

const AMBITO_CORES: Record<AmbitoLei, string> = { federal: '#1565C0', estadual: '#2E7D32', municipal: '#E65100' };
const AMBITO_LABELS: Record<AmbitoLei, string> = { federal: 'Federal', estadual: 'Estadual', municipal: 'Municipal' };
const AMBITO_ICONS: Record<AmbitoLei, string> = { federal: 'bank-outline', estadual: 'map-outline', municipal: 'city-variant-outline' };

const TIPO_ICONS: Record<string, string> = { lei: 'book-open-variant', decreto: 'file-document-edit-outline', resolucao: 'clipboard-check-outline', portaria: 'file-sign', instrucao_normativa: 'file-cog-outline', parecer: 'comment-text-outline' };

function tipoLabel(tipo: string) {
  const map: Record<string, string> = { lei: 'Lei', decreto: 'Decreto', resolucao: 'Resolução', portaria: 'Portaria', instrucao_normativa: 'Instrução Normativa', parecer: 'Parecer' };
  return map[tipo] || tipo;
}

function categoriaLabel(cat: string) {
  const map: Record<string, string> = { educacao_campo: 'Educação do Campo', povos_tradicionais: 'Povos Tradicionais', reforma_agraria: 'Reforma Agrária', financiamento: 'Financiamento', gestao_escolar: 'Gestão Escolar', outros: 'Outros' };
  return map[cat] || cat;
}

export default function LegislacaoDetalheScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { legislacoes } = useLegislacaoStore();
  const lei = legislacoes.find((l) => l.id === id);

  if (!lei) return (
    <SafeAreaView style={styles.safe}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Legislação não encontrada.</Text>
        <Button onPress={() => router.back()}>Voltar</Button>
      </View>
    </SafeAreaView>
  );

  const cor = AMBITO_CORES[lei.ambito];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { backgroundColor: '#C62828' }]}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            {lei.destaque && <MaterialCommunityIcons name="star" size={22} color="#FFD54F" />}
          </View>
          <View style={styles.headerIcone}>
            <MaterialCommunityIcons name={TIPO_ICONS[lei.tipo] as any} size={44} color="#fff" />
          </View>
          <View style={styles.chipRow}>
            <Chip style={[styles.ambitoChip, { backgroundColor: cor }]} textStyle={{ color: '#fff', fontSize: FontSize.sm, fontWeight: '700' }}>
              <MaterialCommunityIcons name={AMBITO_ICONS[lei.ambito] as any} size={12} /> {AMBITO_LABELS[lei.ambito]}
            </Chip>
            <Chip style={styles.tipoChipHeader} textStyle={{ color: '#C62828', fontSize: FontSize.sm, fontWeight: '600' }}>
              {tipoLabel(lei.tipo)}
            </Chip>
          </View>
          <Text style={styles.numero}>{lei.numero}</Text>
          <Text style={styles.headerTitulo}>{lei.titulo}</Text>
          <Text style={styles.data}>Publicado em {new Date(lei.dataPublicacao).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</Text>
        </View>

        <View style={styles.content}>
          <View style={[styles.ementaBox, { borderLeftColor: cor }]}>
            <Text style={styles.ementaLabel}>EMENTA</Text>
            <Text style={styles.ementaTexto}>{lei.ementa}</Text>
          </View>

          <Divider style={styles.divider} />

          <Text style={styles.secaoTitulo}>Descrição</Text>
          <Text style={styles.descricao}>{lei.descricao}</Text>

          <Divider style={styles.divider} />

          <Text style={styles.secaoTitulo}>Classificação</Text>
          <View style={styles.classificacaoRow}>
            <View style={[styles.classificacaoItem, { backgroundColor: cor + '15' }]}>
              <MaterialCommunityIcons name={AMBITO_ICONS[lei.ambito] as any} size={20} color={cor} />
              <Text style={[styles.classificacaoLabel, { color: cor }]}>Âmbito</Text>
              <Text style={styles.classificacaoValor}>{AMBITO_LABELS[lei.ambito]}</Text>
            </View>
            <View style={[styles.classificacaoItem, { backgroundColor: '#C6282815' }]}>
              <MaterialCommunityIcons name={TIPO_ICONS[lei.tipo] as any} size={20} color="#C62828" />
              <Text style={[styles.classificacaoLabel, { color: '#C62828' }]}>Tipo</Text>
              <Text style={styles.classificacaoValor}>{tipoLabel(lei.tipo)}</Text>
            </View>
            <View style={[styles.classificacaoItem, { backgroundColor: Colors.primary + '15' }]}>
              <MaterialCommunityIcons name="tag-outline" size={20} color={Colors.primary} />
              <Text style={[styles.classificacaoLabel, { color: Colors.primary }]}>Área</Text>
              <Text style={styles.classificacaoValor}>{categoriaLabel(lei.categoria)}</Text>
            </View>
          </View>

          <Divider style={styles.divider} />

          <Text style={styles.secaoTitulo}>Tags</Text>
          <View style={styles.tagsWrap}>
            {lei.tags.map((tag) => (
              <Chip key={tag} style={styles.tag} textStyle={{ fontSize: FontSize.sm, color: '#C62828' }}>#{tag}</Chip>
            ))}
          </View>

          {lei.url && (
            <Button
              mode="contained"
              onPress={() => lei.url && Linking.openURL(lei.url)}
              style={styles.botao}
              contentStyle={styles.botaoContent}
              buttonColor="#C62828"
              icon="open-in-new"
            >
              Acessar Documento Oficial
            </Button>
          )}

          <Button
            mode="outlined"
            onPress={() => router.back()}
            style={[styles.botao, { borderColor: '#C62828' }]}
            contentStyle={styles.botaoContent}
            textColor="#C62828"
            icon="arrow-left"
          >
            Voltar para Legislação
          </Button>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { padding: Spacing.lg, paddingTop: Spacing.md },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.lg },
  headerIcone: { alignItems: 'center', marginBottom: Spacing.md },
  chipRow: { flexDirection: 'row', gap: 8, justifyContent: 'center', marginBottom: Spacing.md },
  ambitoChip: { alignSelf: 'center' },
  tipoChipHeader: { backgroundColor: '#fff', alignSelf: 'center' },
  numero: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.85)', textAlign: 'center', fontWeight: '600', marginBottom: Spacing.sm },
  headerTitulo: { fontSize: FontSize.lg, fontWeight: '800', color: '#fff', textAlign: 'center', lineHeight: 24, marginBottom: Spacing.sm },
  data: { fontSize: FontSize.xs, color: 'rgba(255,255,255,0.75)', textAlign: 'center' },
  content: { padding: Spacing.lg },
  ementaBox: { backgroundColor: Colors.surface, borderLeftWidth: 4, borderRadius: BorderRadius.sm, padding: Spacing.md },
  ementaLabel: { fontSize: FontSize.xs, fontWeight: '800', color: Colors.textLight, letterSpacing: 1, marginBottom: 6 },
  ementaTexto: { fontSize: FontSize.md, color: Colors.text, lineHeight: 22, fontStyle: 'italic' },
  divider: { marginVertical: Spacing.lg },
  secaoTitulo: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text, marginBottom: Spacing.md },
  descricao: { fontSize: FontSize.md, color: Colors.textLight, lineHeight: 24 },
  classificacaoRow: { flexDirection: 'row', gap: Spacing.sm },
  classificacaoItem: { flex: 1, alignItems: 'center', padding: Spacing.md, borderRadius: BorderRadius.md, gap: 4 },
  classificacaoLabel: { fontSize: FontSize.xs, fontWeight: '700', letterSpacing: 0.5 },
  classificacaoValor: { fontSize: FontSize.xs, color: Colors.text, textAlign: 'center', fontWeight: '600' },
  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Spacing.lg },
  tag: { backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.border },
  botao: { marginTop: Spacing.md, borderRadius: 8 },
  botaoContent: { paddingVertical: 6 },
});
