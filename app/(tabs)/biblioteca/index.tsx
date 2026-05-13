import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Searchbar, Chip, Card } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useBibliotecaStore } from '../../../store/useBibliotecaStore';
import { Material, TipoMaterial } from '../../../types';
import { Colors, Spacing, FontSize, BorderRadius } from '../../../constants/Colors';

const TIPOS: { label: string; value: TipoMaterial | '' }[] = [{ label: 'Todos', value: '' }, { label: 'Artigos', value: 'artigo' }, { label: 'Livros', value: 'livro' }, { label: 'Cartilhas', value: 'cartilha' }, { label: 'Vídeos', value: 'video' }, { label: 'Planos de Aula', value: 'plano_aula' }, { label: 'Pesquisas', value: 'pesquisa' }, { label: 'Legislação', value: 'legislacao' }];
const TIPO_ICONS: Record<TipoMaterial, string> = { artigo: 'file-document-outline', livro: 'book-outline', cartilha: 'booklet-outline', video: 'play-circle-outline', plano_aula: 'clipboard-list-outline', pesquisa: 'magnify', legislacao: 'gavel', outro: 'file-outline' };
const TIPO_CORES: Record<TipoMaterial, string> = { artigo: '#1565C0', livro: '#2E7D32', cartilha: '#E65100', video: '#6A1B9A', plano_aula: '#00838F', pesquisa: '#37474F', legislacao: '#C62828', outro: '#757575' };

function tipoLabel(tipo: TipoMaterial): string {
  return ({ artigo: 'Artigo', livro: 'Livro', cartilha: 'Cartilha', video: 'Vídeo', plano_aula: 'Plano de Aula', pesquisa: 'Pesquisa', legislacao: 'Legislação', outro: 'Outro' } as any)[tipo] || tipo;
}

function MaterialCard({ material, isFavorito, onPress, onFavorito }: { material: Material; isFavorito: boolean; onPress: () => void; onFavorito: () => void }) {
  const cor = TIPO_CORES[material.tipo];
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <View style={[styles.tipoIcone, { backgroundColor: cor + '15' }]}><MaterialCommunityIcons name={TIPO_ICONS[material.tipo] as any} size={22} color={cor} /></View>
            <View style={styles.cardHeaderInfo}><Chip style={[styles.tipoChip, { backgroundColor: cor + '20' }]} textStyle={{ color: cor, fontSize: 10 }}>{tipoLabel(material.tipo)}</Chip><Text style={styles.cardAno}>{material.ano}</Text></View>
            <TouchableOpacity onPress={onFavorito}><MaterialCommunityIcons name={isFavorito ? 'heart' : 'heart-outline'} size={22} color={isFavorito ? '#E53935' : Colors.textLight} /></TouchableOpacity>
          </View>
          <Text style={styles.cardTitulo} numberOfLines={2}>{material.titulo}</Text>
          <Text style={styles.cardAutor}>{material.autor}</Text>
          <Text style={styles.cardDesc} numberOfLines={2}>{material.descricao}</Text>
          <View style={styles.cardFooter}>
            <View style={styles.stat}><MaterialCommunityIcons name="download" size={14} color={Colors.textLight} /><Text style={styles.statText}>{material.downloads.toLocaleString('pt-BR')}</Text></View>
            <View style={styles.stat}><MaterialCommunityIcons name="heart" size={14} color={Colors.textLight} /><Text style={styles.statText}>{material.favoritos}</Text></View>
            <View style={styles.tagWrap}>{material.tags.slice(0, 2).map((t) => <Text key={t} style={styles.tag}>#{t}</Text>)}</View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

export default function BibliotecaScreen() {
  const { filtros, setFiltros, toggleFavorito, favoritos, getMateriaisFiltrados } = useBibliotecaStore();
  const materiais = getMateriaisFiltrados();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerBar}><Text style={styles.headerTitulo}>Biblioteca Digital</Text><Text style={styles.headerSub}>{materiais.length} material(is) disponível(is)</Text></View>
      <View style={styles.buscaContainer}><Searchbar placeholder="Buscar materiais, autores, tags..." value={filtros.busca} onChangeText={(t) => setFiltros({ busca: t })} style={styles.busca} iconColor={Colors.categoryColors.biblioteca} /></View>
      <View style={styles.filtrosContainer}>
        <FlatList data={TIPOS} horizontal showsHorizontalScrollIndicator={false} keyExtractor={(i) => i.value} contentContainerStyle={{ paddingHorizontal: Spacing.lg, gap: 8 }}
          renderItem={({ item }) => <Chip selected={filtros.tipo === item.value} onPress={() => setFiltros({ tipo: item.value })} style={[styles.filtroChip, filtros.tipo === item.value && { backgroundColor: Colors.categoryColors.biblioteca }]} textStyle={{ fontSize: FontSize.sm, color: filtros.tipo === item.value ? Colors.textInverse : Colors.text }}>{item.label}</Chip>} />
      </View>
      <FlatList data={materiais} keyExtractor={(m) => m.id} contentContainerStyle={styles.lista} showsVerticalScrollIndicator={false}
        ListEmptyComponent={<View style={styles.vazio}><MaterialCommunityIcons name="book-open-outline" size={48} color={Colors.border} /><Text style={styles.vazioText}>Nenhum material encontrado</Text></View>}
        renderItem={({ item }) => <MaterialCard material={item} isFavorito={favoritos.includes(item.id)} onPress={() => router.push(`/(tabs)/biblioteca/${item.id}` as any)} onFavorito={() => toggleFavorito(item.id)} />} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  headerBar: { backgroundColor: Colors.categoryColors.biblioteca, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.lg, paddingTop: Spacing.md },
  headerTitulo: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.textInverse },
  headerSub: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  buscaContainer: { padding: Spacing.lg, paddingBottom: Spacing.sm },
  busca: { backgroundColor: Colors.surface, elevation: 2 },
  filtrosContainer: { paddingBottom: Spacing.md },
  filtroChip: { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border },
  lista: { padding: Spacing.lg, paddingTop: 0, paddingBottom: 20 },
  card: { marginBottom: Spacing.md, backgroundColor: Colors.surface, borderRadius: BorderRadius.md },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm },
  tipoIcone: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  cardHeaderInfo: { flex: 1, paddingHorizontal: Spacing.sm },
  tipoChip: { alignSelf: 'flex-start', height: 24 },
  cardAno: { fontSize: FontSize.xs, color: Colors.textLight, marginTop: 2 },
  cardTitulo: { fontSize: FontSize.md, fontWeight: '700', color: Colors.text, marginBottom: 2 },
  cardAutor: { fontSize: FontSize.sm, color: Colors.primary, marginBottom: 4, fontStyle: 'italic' },
  cardDesc: { fontSize: FontSize.sm, color: Colors.textLight, lineHeight: 20 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', marginTop: Spacing.sm, gap: Spacing.md },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText: { fontSize: FontSize.xs, color: Colors.textLight },
  tagWrap: { flex: 1, flexDirection: 'row', gap: 6 },
  tag: { fontSize: FontSize.xs, color: Colors.categoryColors.biblioteca },
  vazio: { alignItems: 'center', paddingTop: 60 },
  vazioText: { fontSize: FontSize.md, color: Colors.textLight, marginTop: Spacing.md },
});
