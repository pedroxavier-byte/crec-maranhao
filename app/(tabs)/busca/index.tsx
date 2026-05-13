import { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Searchbar, Chip } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEscolasStore } from '../../../store/useEscolasStore';
import { useBibliotecaStore } from '../../../store/useBibliotecaStore';
import { useNoticiasStore } from '../../../store/useNoticiasStore';
import { usePesquisadoresStore } from '../../../store/usePesquisadoresStore';
import { useLegislacaoStore } from '../../../store/useLegislacaoStore';
import { Colors, Spacing, FontSize, BorderRadius } from '../../../constants/Colors';

type ResultItem = { id: string; tipo: 'escola' | 'material' | 'noticia' | 'pesquisador' | 'legislacao'; titulo: string; subtitulo: string; icone: string; cor: string; rota: string };

const TIPO_CONFIG = {
  escola: { icone: 'school-outline', cor: Colors.categoryColors.escola },
  material: { icone: 'book-open-outline', cor: Colors.categoryColors.biblioteca },
  noticia: { icone: 'newspaper-variant-outline', cor: Colors.categoryColors.noticia },
  pesquisador: { icone: 'account-outline', cor: Colors.categoryColors.pesquisador },
  legislacao: { icone: 'gavel', cor: '#C62828' },
};

export default function BuscaScreen() {
  const [busca, setBusca] = useState('');
  const { escolas } = useEscolasStore();
  const { materiais } = useBibliotecaStore();
  const { noticias } = useNoticiasStore();
  const { pesquisadores } = usePesquisadoresStore();
  const { legislacoes } = useLegislacaoStore();

  const resultados: ResultItem[] = busca.trim().length < 2 ? [] : [
    ...escolas.filter((e) => e.nome.toLowerCase().includes(busca.toLowerCase()) || e.municipio.toLowerCase().includes(busca.toLowerCase())).map((e) => ({
      id: e.id, tipo: 'escola' as const, titulo: e.nome, subtitulo: e.municipio, icone: TIPO_CONFIG.escola.icone, cor: TIPO_CONFIG.escola.cor, rota: `/(tabs)/escolas/${e.id}`,
    })),
    ...materiais.filter((m) => m.titulo.toLowerCase().includes(busca.toLowerCase()) || m.autor.toLowerCase().includes(busca.toLowerCase()) || m.tags.some((t) => t.toLowerCase().includes(busca.toLowerCase()))).map((m) => ({
      id: m.id, tipo: 'material' as const, titulo: m.titulo, subtitulo: m.autor, icone: TIPO_CONFIG.material.icone, cor: TIPO_CONFIG.material.cor, rota: `/(tabs)/biblioteca/${m.id}`,
    })),
    ...noticias.filter((n) => n.titulo.toLowerCase().includes(busca.toLowerCase()) || n.resumo.toLowerCase().includes(busca.toLowerCase())).map((n) => ({
      id: n.id, tipo: 'noticia' as const, titulo: n.titulo, subtitulo: n.tipo, icone: TIPO_CONFIG.noticia.icone, cor: TIPO_CONFIG.noticia.cor, rota: `/(tabs)/noticias/${n.id}`,
    })),
    ...pesquisadores.filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()) || p.instituicao.toLowerCase().includes(busca.toLowerCase())).map((p) => ({
      id: p.id, tipo: 'pesquisador' as const, titulo: p.nome, subtitulo: p.instituicao, icone: TIPO_CONFIG.pesquisador.icone, cor: TIPO_CONFIG.pesquisador.cor, rota: `/(tabs)/pesquisadores/${p.id}`,
    })),
    ...legislacoes.filter((l) => l.titulo.toLowerCase().includes(busca.toLowerCase()) || l.numero.toLowerCase().includes(busca.toLowerCase()) || l.tags.some((t) => t.toLowerCase().includes(busca.toLowerCase()))).map((l) => ({
      id: l.id, tipo: 'legislacao' as const, titulo: l.titulo, subtitulo: l.numero, icone: TIPO_CONFIG.legislacao.icone, cor: TIPO_CONFIG.legislacao.cor, rota: `/(tabs)/legislacao/${l.id}`,
    })),
  ];

  const tipoLabel = { escola: 'Escola', material: 'Material', noticia: 'Notícia', pesquisador: 'Pesquisador', legislacao: 'Legislação' };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitulo}>Busca Global</Text>
        <Text style={styles.headerSub}>Pesquise em toda a plataforma</Text>
      </View>
      <View style={styles.buscaContainer}>
        <Searchbar placeholder="Buscar escolas, materiais, notícias..." value={busca} onChangeText={setBusca} style={styles.busca} iconColor={Colors.primary} autoFocus />
      </View>

      {busca.trim().length < 2 ? (
        <View style={styles.dica}>
          <MaterialCommunityIcons name="magnify" size={64} color={Colors.border} />
          <Text style={styles.dicaTitulo}>O que você procura?</Text>
          <Text style={styles.dicaText}>Digite ao menos 2 caracteres para buscar em escolas, materiais, notícias e pesquisadores.</Text>
          <View style={styles.categorias}>
            {[
              { icon: 'school-outline', label: 'Escolas', cor: Colors.categoryColors.escola },
              { icon: 'book-open-outline', label: 'Materiais', cor: Colors.categoryColors.biblioteca },
              { icon: 'newspaper-variant-outline', label: 'Notícias', cor: Colors.categoryColors.noticia },
              { icon: 'account-outline', label: 'Pessoas', cor: Colors.categoryColors.pesquisador },
              { icon: 'gavel', label: 'Legislação', cor: '#C62828' },
            ].map((c) => (
              <View key={c.label} style={[styles.categoriaItem, { backgroundColor: c.cor + '15' }]}>
                <MaterialCommunityIcons name={c.icon as any} size={22} color={c.cor} />
                <Text style={[styles.categoriaLabel, { color: c.cor }]}>{c.label}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <FlatList
          data={resultados}
          keyExtractor={(i) => `${i.tipo}-${i.id}`}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            resultados.length > 0 ? (
              <Text style={styles.totalText}>{resultados.length} resultado(s) para "{busca}"</Text>
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.vazio}>
              <MaterialCommunityIcons name="magnify-close" size={48} color={Colors.border} />
              <Text style={styles.vazioTitulo}>Nenhum resultado</Text>
              <Text style={styles.vazioText}>Tente outros termos de busca.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.resultItem} onPress={() => router.push(item.rota as any)}>
              <View style={[styles.resultIcone, { backgroundColor: item.cor + '15' }]}>
                <MaterialCommunityIcons name={item.icone as any} size={22} color={item.cor} />
              </View>
              <View style={styles.resultInfo}>
                <Text style={styles.resultTitulo} numberOfLines={1}>{item.titulo}</Text>
                <Text style={styles.resultSub} numberOfLines={1}>{item.subtitulo}</Text>
              </View>
              <Chip style={[styles.resultTipo, { backgroundColor: item.cor + '15' }]} textStyle={{ color: item.cor, fontSize: 10 }}>
                {tipoLabel[item.tipo]}
              </Chip>
            </TouchableOpacity>
          )}
        />
      )}
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
  dica: { flex: 1, alignItems: 'center', paddingTop: 40, paddingHorizontal: Spacing.xl },
  dicaTitulo: { fontSize: FontSize.xl, fontWeight: '700', color: Colors.text, marginTop: Spacing.lg, marginBottom: Spacing.sm },
  dicaText: { fontSize: FontSize.md, color: Colors.textLight, textAlign: 'center', lineHeight: 22, marginBottom: Spacing.xl },
  categorias: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, justifyContent: 'center' },
  categoriaItem: { alignItems: 'center', padding: Spacing.md, borderRadius: BorderRadius.md, minWidth: 80, gap: 6 },
  categoriaLabel: { fontSize: FontSize.sm, fontWeight: '600' },
  lista: { padding: Spacing.lg, paddingTop: Spacing.sm, paddingBottom: 20 },
  totalText: { fontSize: FontSize.sm, color: Colors.textLight, marginBottom: Spacing.md },
  resultItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, backgroundColor: Colors.surface, borderRadius: BorderRadius.md, padding: Spacing.md, marginBottom: Spacing.sm, elevation: 1 },
  resultIcone: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  resultInfo: { flex: 1 },
  resultTitulo: { fontSize: FontSize.md, fontWeight: '600', color: Colors.text },
  resultSub: { fontSize: FontSize.sm, color: Colors.textLight, marginTop: 2, textTransform: 'capitalize' },
  resultTipo: { height: 26 },
  vazio: { alignItems: 'center', paddingTop: 60 },
  vazioTitulo: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text, marginTop: Spacing.lg },
  vazioText: { fontSize: FontSize.md, color: Colors.textLight, marginTop: Spacing.sm },
});
