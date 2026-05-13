import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Searchbar, Chip, Card } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNoticiasStore } from '../../../store/useNoticiasStore';
import { Noticia, TipoNoticia } from '../../../types';
import { Colors, Spacing, FontSize, BorderRadius } from '../../../constants/Colors';

const TIPOS: { label: string; value: TipoNoticia | '' }[] = [
  { label: 'Todos', value: '' }, { label: 'Notícias', value: 'noticia' }, { label: 'Eventos', value: 'evento' }, { label: 'Editais', value: 'edital' }, { label: 'Comunicados', value: 'comunicado' },
];

const TIPO_CORES: Record<TipoNoticia, string> = { noticia: Colors.categoryColors.noticia, evento: Colors.primary, edital: Colors.secondary, comunicado: Colors.categoryColors.biblioteca };
const TIPO_ICONS: Record<TipoNoticia, string> = { noticia: 'newspaper-variant-outline', evento: 'calendar-star', edital: 'file-sign', comunicado: 'bullhorn-outline' };

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

function NoticiaCard({ noticia, onPress }: { noticia: Noticia; onPress: () => void }) {
  const cor = TIPO_CORES[noticia.tipo];
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={[styles.card, noticia.destaque && styles.cardDestaque]}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <View style={[styles.tipoIcone, { backgroundColor: cor + '20' }]}><MaterialCommunityIcons name={TIPO_ICONS[noticia.tipo] as any} size={20} color={cor} /></View>
            <View style={styles.cardHeaderInfo}>
              <Chip style={[styles.tipoChip, { backgroundColor: cor + '20' }]} textStyle={{ color: cor, fontSize: 10 }}>
                {noticia.tipo.charAt(0).toUpperCase() + noticia.tipo.slice(1)}
              </Chip>
              <Text style={styles.cardData}>{formatDate(noticia.dataPublicacao)}</Text>
            </View>
            {noticia.destaque && <MaterialCommunityIcons name="star" size={18} color="#FFA000" />}
          </View>
          {noticia.entidade && (
            <View style={styles.entidadeRow}>
              <MaterialCommunityIcons name="domain" size={12} color="#1B5E20" />
              <Text style={styles.entidadeText}>{noticia.entidade}</Text>
            </View>
          )}
          <Text style={styles.cardTitulo} numberOfLines={2}>{noticia.titulo}</Text>
          <Text style={styles.cardResumo} numberOfLines={3}>{noticia.resumo}</Text>
          {noticia.tags.length > 0 && (
            <View style={styles.tagsWrap}>
              {noticia.tags.slice(0, 3).map((t) => <Text key={t} style={[styles.tag, { color: cor }]}>#{t}</Text>)}
            </View>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

export default function NoticiasScreen() {
  const { busca, filtroTipo, setBusca, setFiltroTipo, getNoticiasFiltradas } = useNoticiasStore();
  const noticias = getNoticiasFiltradas();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitulo}>Notícias & Eventos</Text>
        <Text style={styles.headerSub}>{noticias.length} publicação(ões)</Text>
      </View>
      <View style={styles.buscaContainer}>
        <Searchbar placeholder="Buscar notícias, eventos..." value={busca} onChangeText={setBusca} style={styles.busca} iconColor={Colors.categoryColors.noticia} />
      </View>
      <View style={styles.filtrosContainer}>
        <FlatList data={TIPOS} horizontal showsHorizontalScrollIndicator={false} keyExtractor={(i) => i.value} contentContainerStyle={{ paddingHorizontal: Spacing.lg, gap: 8 }}
          renderItem={({ item }) => (
            <Chip selected={filtroTipo === item.value} onPress={() => setFiltroTipo(item.value)} style={[styles.filtroChip, filtroTipo === item.value && { backgroundColor: Colors.categoryColors.noticia }]} textStyle={{ fontSize: FontSize.sm, color: filtroTipo === item.value ? Colors.textInverse : Colors.text }}>{item.label}</Chip>
          )} />
      </View>
      <FlatList data={noticias} keyExtractor={(n) => n.id} contentContainerStyle={styles.lista} showsVerticalScrollIndicator={false}
        ListEmptyComponent={<View style={styles.vazio}><MaterialCommunityIcons name="newspaper-variant-multiple-outline" size={48} color={Colors.border} /><Text style={styles.vazioText}>Nenhuma publicação encontrada</Text></View>}
        renderItem={({ item }) => <NoticiaCard noticia={item} onPress={() => router.push(`/(tabs)/noticias/${item.id}` as any)} />} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  headerBar: { backgroundColor: Colors.categoryColors.noticia, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.lg, paddingTop: Spacing.md },
  headerTitulo: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.textInverse },
  headerSub: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  buscaContainer: { padding: Spacing.lg, paddingBottom: Spacing.sm },
  busca: { backgroundColor: Colors.surface, elevation: 2 },
  filtrosContainer: { paddingBottom: Spacing.md },
  filtroChip: { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border },
  lista: { padding: Spacing.lg, paddingTop: 0, paddingBottom: 20 },
  card: { marginBottom: Spacing.md, backgroundColor: Colors.surface, borderRadius: BorderRadius.md },
  cardDestaque: { borderLeftWidth: 3, borderLeftColor: '#FFA000' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm },
  tipoIcone: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  cardHeaderInfo: { flex: 1, paddingHorizontal: Spacing.sm },
  tipoChip: { alignSelf: 'flex-start', height: 24 },
  cardData: { fontSize: FontSize.xs, color: Colors.textLight, marginTop: 2 },
  cardTitulo: { fontSize: FontSize.md, fontWeight: '700', color: Colors.text, marginBottom: 4, lineHeight: 22 },
  cardResumo: { fontSize: FontSize.sm, color: Colors.textLight, lineHeight: 20 },
  tagsWrap: { flexDirection: 'row', gap: 8, marginTop: Spacing.sm },
  tag: { fontSize: FontSize.xs },
  entidadeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6, backgroundColor: '#E8F5E9', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2, alignSelf: 'flex-start' },
  entidadeText: { fontSize: 10, color: '#1B5E20', fontWeight: '700' },
  vazio: { alignItems: 'center', paddingTop: 60 },
  vazioText: { fontSize: FontSize.md, color: Colors.textLight, marginTop: Spacing.md },
});
