import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Chip, Divider, Button } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNoticiasStore } from '../../../store/useNoticiasStore';
import { Colors, Spacing, FontSize } from '../../../constants/Colors';
import { TipoNoticia } from '../../../types';

const TIPO_CORES: Record<TipoNoticia, string> = { noticia: Colors.categoryColors.noticia, evento: Colors.primary, edital: Colors.secondary, comunicado: Colors.categoryColors.biblioteca };
const TIPO_ICONS: Record<TipoNoticia, string> = { noticia: 'newspaper-variant-outline', evento: 'calendar-star', edital: 'file-sign', comunicado: 'bullhorn-outline' };

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function NoticiaDetalheScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { noticias } = useNoticiasStore();
  const noticia = noticias.find((n) => n.id === id);

  if (!noticia) return (
    <SafeAreaView style={styles.safe}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Publicação não encontrada.</Text>
        <Button onPress={() => router.back()}>Voltar</Button>
      </View>
    </SafeAreaView>
  );

  const cor = TIPO_CORES[noticia.tipo];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { backgroundColor: cor }]}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => router.back()}><MaterialCommunityIcons name="arrow-left" size={24} color="#fff" /></TouchableOpacity>
            {noticia.destaque && <MaterialCommunityIcons name="star" size={22} color="#FFD54F" />}
          </View>
          <View style={styles.headerMeta}>
            <View style={styles.iconeBadge}><MaterialCommunityIcons name={TIPO_ICONS[noticia.tipo] as any} size={20} color={cor} /></View>
            <Text style={styles.tipoText}>{noticia.tipo.charAt(0).toUpperCase() + noticia.tipo.slice(1)}</Text>
          </View>
          <Text style={styles.headerTitulo}>{noticia.titulo}</Text>
          <View style={styles.dataMeta}>
            <MaterialCommunityIcons name="calendar" size={14} color="rgba(255,255,255,0.8)" />
            <Text style={styles.dataText}>{formatDate(noticia.dataPublicacao)}</Text>
            {noticia.autor && <>
              <Text style={styles.dataText}> • </Text>
              <Text style={styles.dataText}>{noticia.autor}</Text>
            </>}
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.resumo}>{noticia.resumo}</Text>

          {noticia.conteudo && (
            <>
              <Divider style={styles.divider} />
              <Text style={styles.conteudo}>{noticia.conteudo}</Text>
            </>
          )}

          {(noticia.dataEvento || noticia.localEvento) && (
            <>
              <Divider style={styles.divider} />
              <Text style={styles.secaoTitulo}>Detalhes do Evento</Text>
              {noticia.dataEvento && (
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons name="calendar-clock" size={18} color={cor} />
                  <Text style={styles.infoText}>{formatDate(noticia.dataEvento)}</Text>
                </View>
              )}
              {noticia.localEvento && (
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons name="map-marker-outline" size={18} color={cor} />
                  <Text style={styles.infoText}>{noticia.localEvento}</Text>
                </View>
              )}
            </>
          )}

          {noticia.tags.length > 0 && (
            <>
              <Divider style={styles.divider} />
              <Text style={styles.secaoTitulo}>Tags</Text>
              <View style={styles.tagsWrap}>
                {noticia.tags.map((tag) => (
                  <Chip key={tag} style={styles.tag} textStyle={{ fontSize: FontSize.sm, color: cor }}>#{tag}</Chip>
                ))}
              </View>
            </>
          )}

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
  headerMeta: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.md },
  iconeBadge: { backgroundColor: '#fff', borderRadius: 12, width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
  tipoText: { fontSize: FontSize.sm, color: '#fff', fontWeight: '600', textTransform: 'capitalize' },
  headerTitulo: { fontSize: FontSize.xl, fontWeight: '800', color: '#fff', lineHeight: 28, marginBottom: Spacing.sm },
  dataMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dataText: { fontSize: FontSize.xs, color: 'rgba(255,255,255,0.85)' },
  content: { padding: Spacing.lg },
  resumo: { fontSize: FontSize.md, color: Colors.text, lineHeight: 26, fontWeight: '500' },
  divider: { marginVertical: Spacing.lg },
  conteudo: { fontSize: FontSize.md, color: Colors.textLight, lineHeight: 26 },
  secaoTitulo: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text, marginBottom: Spacing.md },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingVertical: Spacing.sm },
  infoText: { fontSize: FontSize.md, color: Colors.text },
  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.border },
});
