import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Searchbar, Chip, Card, Avatar } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePesquisadoresStore } from '../../../store/usePesquisadoresStore';
import { Pesquisador, TipoPessoa } from '../../../types';
import { Colors, Spacing, FontSize, BorderRadius } from '../../../constants/Colors';

const TIPOS: { label: string; value: TipoPessoa | '' }[] = [
  { label: 'Todos', value: '' }, { label: 'Pesquisadores', value: 'pesquisador' }, { label: 'Professores', value: 'professor' }, { label: 'Gestores', value: 'gestor' }, { label: 'Militantes', value: 'militante' },
];

const TIPO_CORES: Record<TipoPessoa, string> = { pesquisador: Colors.categoryColors.pesquisador, professor: Colors.primary, gestor: Colors.secondary, militante: '#795548' };

function getInitials(nome: string) {
  return nome.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

function PesquisadorCard({ pesquisador, onPress }: { pesquisador: Pesquisador; onPress: () => void }) {
  const cor = TIPO_CORES[pesquisador.tipo];
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Avatar.Text size={52} label={getInitials(pesquisador.nome)} style={{ backgroundColor: cor }} color="#fff" />
          <View style={styles.cardInfo}>
            <Text style={styles.cardNome} numberOfLines={1}>{pesquisador.nome}</Text>
            <Chip style={[styles.tipoChip, { backgroundColor: cor + '20' }]} textStyle={{ color: cor, fontSize: 10 }}>
              {pesquisador.tipo.charAt(0).toUpperCase() + pesquisador.tipo.slice(1)}
            </Chip>
            <Text style={styles.cardInst} numberOfLines={1}>{pesquisador.instituicao}</Text>
            <View style={styles.cardTags}>
              {pesquisador.areasAtuacao.slice(0, 2).map((a) => (
                <Text key={a} style={[styles.tag, { color: cor }]}>#{a.replace(/_/g, ' ')}</Text>
              ))}
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.border} />
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

export default function PesquisadoresScreen() {
  const { filtros, setFiltros, getPesquisadoresFiltrados } = usePesquisadoresStore();
  const pesquisadores = getPesquisadoresFiltrados();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitulo}>Pessoas & Pesquisadores</Text>
        <Text style={styles.headerSub}>{pesquisadores.length} pessoa(s) cadastrada(s)</Text>
      </View>
      <View style={styles.buscaContainer}>
        <Searchbar placeholder="Buscar por nome, instituição..." value={filtros.busca} onChangeText={(t) => setFiltros({ busca: t })} style={styles.busca} iconColor={Colors.categoryColors.pesquisador} />
      </View>
      <View style={styles.filtrosContainer}>
        <FlatList data={TIPOS} horizontal showsHorizontalScrollIndicator={false} keyExtractor={(i) => i.value} contentContainerStyle={{ paddingHorizontal: Spacing.lg, gap: 8 }}
          renderItem={({ item }) => (
            <Chip selected={filtros.tipo === item.value} onPress={() => setFiltros({ tipo: item.value })} style={[styles.filtroChip, filtros.tipo === item.value && { backgroundColor: Colors.categoryColors.pesquisador }]} textStyle={{ fontSize: FontSize.sm, color: filtros.tipo === item.value ? Colors.textInverse : Colors.text }}>{item.label}</Chip>
          )} />
      </View>
      <FlatList data={pesquisadores} keyExtractor={(p) => p.id} contentContainerStyle={styles.lista} showsVerticalScrollIndicator={false}
        ListEmptyComponent={<View style={styles.vazio}><MaterialCommunityIcons name="account-group-outline" size={48} color={Colors.border} /><Text style={styles.vazioText}>Nenhuma pessoa encontrada</Text></View>}
        renderItem={({ item }) => <PesquisadorCard pesquisador={item} onPress={() => router.push(`/(tabs)/pesquisadores/${item.id}` as any)} />} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  headerBar: { backgroundColor: Colors.categoryColors.pesquisador, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.lg, paddingTop: Spacing.md },
  headerTitulo: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.textInverse },
  headerSub: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  buscaContainer: { padding: Spacing.lg, paddingBottom: Spacing.sm },
  busca: { backgroundColor: Colors.surface, elevation: 2 },
  filtrosContainer: { paddingBottom: Spacing.md },
  filtroChip: { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border },
  lista: { padding: Spacing.lg, paddingTop: 0, paddingBottom: 20 },
  card: { marginBottom: Spacing.md, backgroundColor: Colors.surface, borderRadius: BorderRadius.md },
  cardContent: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  cardInfo: { flex: 1 },
  cardNome: { fontSize: FontSize.md, fontWeight: '700', color: Colors.text, marginBottom: 4 },
  tipoChip: { alignSelf: 'flex-start', height: 22, marginBottom: 4 },
  cardInst: { fontSize: FontSize.sm, color: Colors.textLight, marginBottom: 4 },
  cardTags: { flexDirection: 'row', gap: 6 },
  tag: { fontSize: FontSize.xs },
  vazio: { alignItems: 'center', paddingTop: 60 },
  vazioText: { fontSize: FontSize.md, color: Colors.textLight, marginTop: Spacing.md },
});
