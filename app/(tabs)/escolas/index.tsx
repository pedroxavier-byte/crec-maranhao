import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Searchbar, Chip, Card, FAB } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEscolasStore } from '../../../store/useEscolasStore';
import { Escola, ZonaEscola } from '../../../types';
import { Colors, Spacing, FontSize, BorderRadius } from '../../../constants/Colors';

const ZONAS: { label: string; value: ZonaEscola | '' }[] = [
  { label: 'Todas', value: '' }, { label: 'Rural', value: 'rural' }, { label: 'Quilombola', value: 'quilombola' }, { label: 'Assentamento', value: 'assentamento' }, { label: 'Ribeirinha', value: 'ribeirinha' }, { label: 'Indígena', value: 'indigena' }, { label: 'CEFFA/CFR', value: 'ceffa' },
];

const ZONA_CORES: Record<ZonaEscola, string> = { rural: '#2E7D32', quilombola: '#4A148C', assentamento: '#E65100', ribeirinha: '#01579B', indigena: '#BF360C', ceffa: '#F57F17' };
const ZONA_ICONS: Record<ZonaEscola, string> = { rural: 'tractor', quilombola: 'star-crescent', assentamento: 'home-group', ribeirinha: 'waves', indigena: 'feather', ceffa: 'sprout' };

function nivelLabel(nivel: string) {
  return ({ infantil: 'Infantil', fundamental: 'Fund.', medio: 'Médio', eja: 'EJA', superior: 'Superior' } as any)[nivel] || nivel;
}

function EscolaCard({ escola, onPress }: { escola: Escola; onPress: () => void }) {
  const cor = ZONA_CORES[escola.zona];
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <View style={[styles.zonaIcone, { backgroundColor: cor + '15' }]}>
              <MaterialCommunityIcons name={ZONA_ICONS[escola.zona] as any} size={20} color={cor} />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardNome} numberOfLines={2}>{escola.nome}</Text>
              <Text style={styles.cardMunicipio}>{escola.municipio}</Text>
            </View>
            <View style={[styles.statusDot, { backgroundColor: escola.ativa ? Colors.success : Colors.error }]} />
          </View>
          <View style={styles.cardChips}>
            <Chip style={[styles.zonaChip, { backgroundColor: cor + '20' }]} textStyle={{ color: cor, fontSize: 10 }}>{escola.zona}</Chip>
            {escola.niveis.slice(0, 2).map((n) => <Chip key={n} style={styles.nivelChip} textStyle={{ fontSize: 10, color: Colors.textLight }}>{nivelLabel(n)}</Chip>)}
          </View>
          <View style={styles.cardStats}>
            <View style={styles.stat}><MaterialCommunityIcons name="account-school" size={14} color={Colors.textLight} /><Text style={styles.statText}>{escola.totalAlunos.toLocaleString('pt-BR')} alunos</Text></View>
            <View style={styles.stat}><MaterialCommunityIcons name="human-male-board" size={14} color={Colors.textLight} /><Text style={styles.statText}>{escola.totalProfessores} professores</Text></View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

export default function EscolasScreen() {
  const { filtros, setFiltros, getEscolasFiltradas } = useEscolasStore();
  const escolas = getEscolasFiltradas();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitulo}>Escolas do Campo</Text>
        <Text style={styles.headerSub}>{escolas.length} escola(s) encontrada(s)</Text>
      </View>
      <View style={styles.buscaContainer}>
        <Searchbar placeholder="Buscar escola ou município..." value={filtros.busca} onChangeText={(t) => setFiltros({ busca: t })} style={styles.busca} iconColor={Colors.primary} />
      </View>
      <View style={styles.filtrosContainer}>
        <FlatList data={ZONAS} horizontal showsHorizontalScrollIndicator={false} keyExtractor={(i) => i.value} contentContainerStyle={{ paddingHorizontal: Spacing.lg, gap: 8 }}
          renderItem={({ item }) => (
            <Chip selected={filtros.zona === item.value} onPress={() => setFiltros({ zona: item.value })} style={[styles.filtroChip, filtros.zona === item.value && { backgroundColor: Colors.primary }]} textStyle={{ fontSize: FontSize.sm, color: filtros.zona === item.value ? Colors.textInverse : Colors.text }}>{item.label}</Chip>
          )} />
      </View>
      <FlatList data={escolas} keyExtractor={(e) => e.id} contentContainerStyle={styles.lista} showsVerticalScrollIndicator={false}
        ListEmptyComponent={<View style={styles.vazio}><MaterialCommunityIcons name="school-outline" size={48} color={Colors.border} /><Text style={styles.vazioText}>Nenhuma escola encontrada</Text></View>}
        renderItem={({ item }) => <EscolaCard escola={item} onPress={() => router.push(`/(tabs)/escolas/${item.id}` as any)} />} />
      <FAB icon="plus" style={styles.fab} color={Colors.textInverse} onPress={() => router.push('/(tabs)/escolas/nova' as any)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  headerBar: { backgroundColor: Colors.primary, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.lg, paddingTop: Spacing.md },
  headerTitulo: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.textInverse },
  headerSub: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  buscaContainer: { padding: Spacing.lg, paddingBottom: Spacing.sm },
  busca: { backgroundColor: Colors.surface, elevation: 2 },
  filtrosContainer: { paddingBottom: Spacing.md },
  filtroChip: { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border },
  lista: { padding: Spacing.lg, paddingTop: 0, paddingBottom: 100 },
  card: { marginBottom: Spacing.md, backgroundColor: Colors.surface, borderRadius: BorderRadius.md },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.sm },
  zonaIcone: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  cardInfo: { flex: 1 },
  cardNome: { fontSize: FontSize.md, fontWeight: '700', color: Colors.text },
  cardMunicipio: { fontSize: FontSize.sm, color: Colors.textLight, marginTop: 2 },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginTop: 4 },
  cardChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: Spacing.sm },
  zonaChip: { height: 26 },
  nivelChip: { height: 26, backgroundColor: Colors.background },
  cardStats: { flexDirection: 'row', gap: Spacing.lg, marginTop: Spacing.sm },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText: { fontSize: FontSize.sm, color: Colors.textLight },
  vazio: { alignItems: 'center', paddingTop: 60 },
  vazioText: { fontSize: FontSize.md, color: Colors.textLight, marginTop: Spacing.md },
  fab: { position: 'absolute', bottom: 20, right: 20, backgroundColor: Colors.primary },
});
