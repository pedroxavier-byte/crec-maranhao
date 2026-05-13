import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Searchbar, Chip, Card } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLegislacaoStore } from '../../../store/useLegislacaoStore';
import { Legislacao, AmbitoLei } from '../../../data/legislacao';
import { Colors, Spacing, FontSize, BorderRadius } from '../../../constants/Colors';

const AMBITOS: { label: string; value: AmbitoLei | '' }[] = [
  { label: 'Todas', value: '' },
  { label: 'Federal', value: 'federal' },
  { label: 'Estadual', value: 'estadual' },
  { label: 'Municipal', value: 'municipal' },
];

const AMBITO_CORES: Record<AmbitoLei, string> = {
  federal: '#1565C0',
  estadual: '#2E7D32',
  municipal: '#E65100',
};

const AMBITO_ICONS: Record<AmbitoLei, string> = {
  federal: 'bank-outline',
  estadual: 'map-outline',
  municipal: 'city-variant-outline',
};

const TIPO_ICONS: Record<string, string> = {
  lei: 'book-open-variant',
  decreto: 'file-document-edit-outline',
  resolucao: 'clipboard-check-outline',
  portaria: 'file-sign',
  instrucao_normativa: 'file-cog-outline',
  parecer: 'comment-text-outline',
};

function tipoLabel(tipo: string) {
  const map: Record<string, string> = { lei: 'Lei', decreto: 'Decreto', resolucao: 'Resolução', portaria: 'Portaria', instrucao_normativa: 'Instrução Normativa', parecer: 'Parecer' };
  return map[tipo] || tipo;
}

function LegislacaoCard({ item, onPress }: { item: Legislacao; onPress: () => void }) {
  const cor = AMBITO_CORES[item.ambito];
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={[styles.card, item.destaque && styles.cardDestaque]}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <View style={[styles.tipoIcone, { backgroundColor: cor + '15' }]}>
              <MaterialCommunityIcons name={TIPO_ICONS[item.tipo] as any} size={22} color={cor} />
            </View>
            <View style={styles.cardMeta}>
              <View style={styles.badges}>
                <Chip style={[styles.ambitoChip, { backgroundColor: cor + '20' }]} textStyle={{ color: cor, fontSize: 9, fontWeight: '700' }}>
                  {item.ambito.toUpperCase()}
                </Chip>
                <Chip style={styles.tipoChip} textStyle={{ fontSize: 9, color: Colors.textLight }}>
                  {tipoLabel(item.tipo)}
                </Chip>
              </View>
              <Text style={styles.numero}>{item.numero}</Text>
            </View>
            {item.destaque && <MaterialCommunityIcons name="star" size={18} color="#FFA000" />}
          </View>
          <Text style={styles.titulo} numberOfLines={2}>{item.titulo}</Text>
          <Text style={styles.ementa} numberOfLines={2}>{item.ementa}</Text>
          <View style={styles.cardFooter}>
            <MaterialCommunityIcons name={AMBITO_ICONS[item.ambito] as any} size={13} color={Colors.textLight} />
            <Text style={styles.data}>{new Date(item.dataPublicacao).toLocaleDateString('pt-BR')}</Text>
            <View style={styles.tagsWrap}>
              {item.tags.slice(0, 2).map((t) => <Text key={t} style={[styles.tag, { color: cor }]}>#{t}</Text>)}
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

export default function LegislacaoScreen() {
  const { filtros, setFiltros, getLegislacoesFiltradas } = useLegislacaoStore();
  const legislacoes = getLegislacoesFiltradas();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerBar}>
        <View style={styles.headerIcon}>
          <MaterialCommunityIcons name="gavel" size={28} color={Colors.textInverse} />
        </View>
        <View>
          <Text style={styles.headerTitulo}>Legislação</Text>
          <Text style={styles.headerSub}>{legislacoes.length} norma(s) encontrada(s)</Text>
        </View>
      </View>

      <View style={styles.buscaContainer}>
        <Searchbar
          placeholder="Buscar por título, número, tema..."
          value={filtros.busca}
          onChangeText={(t) => setFiltros({ busca: t })}
          style={styles.busca}
          iconColor="#C62828"
        />
      </View>

      <View style={styles.filtrosContainer}>
        <FlatList
          data={AMBITOS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(i) => i.value}
          contentContainerStyle={{ paddingHorizontal: Spacing.lg, gap: 8 }}
          renderItem={({ item }) => (
            <Chip
              selected={filtros.ambito === item.value}
              onPress={() => setFiltros({ ambito: item.value })}
              style={[styles.filtroChip, filtros.ambito === item.value && { backgroundColor: '#C62828' }]}
              textStyle={{ fontSize: FontSize.sm, color: filtros.ambito === item.value ? Colors.textInverse : Colors.text }}
            >
              {item.label}
            </Chip>
          )}
        />
      </View>

      <FlatList
        data={legislacoes}
        keyExtractor={(l) => l.id}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.vazio}>
            <MaterialCommunityIcons name="gavel" size={48} color={Colors.border} />
            <Text style={styles.vazioText}>Nenhuma legislação encontrada</Text>
          </View>
        }
        renderItem={({ item }) => (
          <LegislacaoCard item={item} onPress={() => router.push(`/(tabs)/legislacao/${item.id}` as any)} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  headerBar: { backgroundColor: '#C62828', paddingHorizontal: Spacing.lg, paddingBottom: Spacing.lg, paddingTop: Spacing.md, flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  headerIcon: { backgroundColor: 'rgba(255,255,255,0.2)', width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  headerTitulo: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.textInverse },
  headerSub: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  buscaContainer: { padding: Spacing.lg, paddingBottom: Spacing.sm },
  busca: { backgroundColor: Colors.surface, elevation: 2 },
  filtrosContainer: { paddingBottom: Spacing.md },
  filtroChip: { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border },
  lista: { padding: Spacing.lg, paddingTop: 0, paddingBottom: 20 },
  card: { marginBottom: Spacing.md, backgroundColor: Colors.surface, borderRadius: BorderRadius.md },
  cardDestaque: { borderLeftWidth: 3, borderLeftColor: '#FFA000' },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm, marginBottom: Spacing.sm },
  tipoIcone: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  cardMeta: { flex: 1 },
  badges: { flexDirection: 'row', gap: 6, marginBottom: 4 },
  ambitoChip: { height: 22, alignSelf: 'flex-start' },
  tipoChip: { height: 22, backgroundColor: Colors.background, alignSelf: 'flex-start' },
  numero: { fontSize: FontSize.xs, color: Colors.textLight, fontWeight: '600' },
  titulo: { fontSize: FontSize.md, fontWeight: '700', color: Colors.text, marginBottom: 4, lineHeight: 20 },
  ementa: { fontSize: FontSize.sm, color: Colors.textLight, lineHeight: 19, marginBottom: Spacing.sm },
  cardFooter: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  data: { fontSize: FontSize.xs, color: Colors.textLight, marginRight: 6 },
  tagsWrap: { flex: 1, flexDirection: 'row', gap: 8 },
  tag: { fontSize: FontSize.xs },
  vazio: { alignItems: 'center', paddingTop: 60 },
  vazioText: { fontSize: FontSize.md, color: Colors.textLight, marginTop: Spacing.md },
});
