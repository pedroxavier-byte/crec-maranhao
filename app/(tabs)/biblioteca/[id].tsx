import { ScrollView, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Text, Chip, Divider, Button } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useBibliotecaStore } from '../../../store/useBibliotecaStore';
import { Colors, Spacing, FontSize, BorderRadius } from '../../../constants/Colors';
import { TipoMaterial } from '../../../types';

const TIPO_ICONS: Record<TipoMaterial, string> = { artigo: 'file-document-outline', livro: 'book-outline', cartilha: 'booklet-outline', video: 'play-circle-outline', plano_aula: 'clipboard-list-outline', pesquisa: 'magnify', legislacao: 'gavel', outro: 'file-outline' };
const TIPO_CORES: Record<TipoMaterial, string> = { artigo: '#1565C0', livro: '#2E7D32', cartilha: '#E65100', video: '#6A1B9A', plano_aula: '#00838F', pesquisa: '#37474F', legislacao: '#C62828', outro: '#757575' };

function tipoLabel(tipo: TipoMaterial): string {
  return ({ artigo: 'Artigo', livro: 'Livro', cartilha: 'Cartilha', video: 'Vídeo', plano_aula: 'Plano de Aula', pesquisa: 'Pesquisa', legislacao: 'Legislação', outro: 'Outro' } as any)[tipo] || tipo;
}

export default function MaterialDetalheScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { materiais, favoritos, toggleFavorito, incrementarDownload } = useBibliotecaStore();
  const material = materiais.find((m) => m.id === id);

  if (!material) return (
    <SafeAreaView style={styles.safe}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Material não encontrado.</Text>
        <Button onPress={() => router.back()}>Voltar</Button>
      </View>
    </SafeAreaView>
  );

  const isFavorito = favoritos.includes(material.id);
  const cor = TIPO_CORES[material.tipo];

  const handleAcessar = () => {
    incrementarDownload(material.id);
    if (material.url) Linking.openURL(material.url).catch(() => {});
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { backgroundColor: cor }]}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => router.back()}><MaterialCommunityIcons name="arrow-left" size={24} color="#fff" /></TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFavorito(material.id)}><MaterialCommunityIcons name={isFavorito ? 'heart' : 'heart-outline'} size={24} color={isFavorito ? '#FFCDD2' : '#fff'} /></TouchableOpacity>
          </View>
          <View style={styles.headerIcone}>
            <MaterialCommunityIcons name={TIPO_ICONS[material.tipo] as any} size={48} color="#fff" />
          </View>
          <Chip style={styles.tipoChip} textStyle={{ color: cor, fontWeight: '700', fontSize: FontSize.sm }}>{tipoLabel(material.tipo)}</Chip>
          <Text style={styles.headerTitulo}>{material.titulo}</Text>
          <Text style={styles.headerAutor}>{material.autor}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}><MaterialCommunityIcons name="download" size={20} color={Colors.primary} /><Text style={styles.statNum}>{material.downloads.toLocaleString('pt-BR')}</Text><Text style={styles.statLabel}>Downloads</Text></View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}><MaterialCommunityIcons name="heart" size={20} color="#E53935" /><Text style={styles.statNum}>{material.favoritos}</Text><Text style={styles.statLabel}>Favoritos</Text></View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}><MaterialCommunityIcons name="calendar" size={20} color={Colors.textLight} /><Text style={styles.statNum}>{material.ano}</Text><Text style={styles.statLabel}>Ano</Text></View>
        </View>

        <View style={styles.content}>
          <Text style={styles.secaoTitulo}>Descrição</Text>
          <Text style={styles.descricao}>{material.descricao}</Text>

          <Divider style={styles.divider} />

          <Text style={styles.secaoTitulo}>Informações</Text>
          <View style={styles.infoRow}><MaterialCommunityIcons name="tag-outline" size={18} color={Colors.primary} /><Text style={styles.infoText}>Área: {material.areaTematica.replace(/_/g, ' ')}</Text></View>
          <View style={styles.infoRow}><MaterialCommunityIcons name="download" size={18} color={Colors.primary} /><Text style={styles.infoText}>{material.downloads.toLocaleString('pt-BR')} downloads</Text></View>

          <Divider style={styles.divider} />

          <Text style={styles.secaoTitulo}>Tags</Text>
          <View style={styles.tagsWrap}>
            {material.tags.map((tag) => (
              <Chip key={tag} style={styles.tag} textStyle={{ fontSize: FontSize.sm, color: cor }}>#{tag}</Chip>
            ))}
          </View>

          <Button mode="contained" onPress={handleAcessar} style={[styles.botao, { backgroundColor: cor }]} contentStyle={styles.botaoContent} icon="open-in-new">
            Acessar Material
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
  tipoChip: { alignSelf: 'center', backgroundColor: '#fff', marginBottom: Spacing.md },
  headerTitulo: { fontSize: FontSize.xl, fontWeight: '800', color: '#fff', textAlign: 'center', lineHeight: 28, marginBottom: 8 },
  headerAutor: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.85)', textAlign: 'center', fontStyle: 'italic' },
  statsRow: { flexDirection: 'row', backgroundColor: Colors.surface, paddingVertical: Spacing.lg, borderBottomWidth: 1, borderBottomColor: Colors.border },
  statBox: { flex: 1, alignItems: 'center', gap: 4 },
  statNum: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text },
  statLabel: { fontSize: FontSize.xs, color: Colors.textLight },
  statDivider: { width: 1, backgroundColor: Colors.border },
  content: { padding: Spacing.lg },
  secaoTitulo: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text, marginBottom: Spacing.md },
  descricao: { fontSize: FontSize.md, color: Colors.textLight, lineHeight: 24 },
  divider: { marginVertical: Spacing.lg },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingVertical: Spacing.sm },
  infoText: { fontSize: FontSize.md, color: Colors.text, textTransform: 'capitalize' },
  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Spacing.lg },
  tag: { backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.border },
  botao: { marginTop: Spacing.md, borderRadius: 8 },
  botaoContent: { paddingVertical: 6 },
});
