import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Chip } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/useAuthStore';
import { useEscolasStore } from '../../store/useEscolasStore';
import { useBibliotecaStore } from '../../store/useBibliotecaStore';
import { useNoticiasStore } from '../../store/useNoticiasStore';
import { relatorioGeralMock } from '../../data/relatorios';
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants/Colors';
import { Noticia } from '../../types';

function QuickCard({ icon, label, valor, cor, rota }: { icon: any; label: string; valor: string | number; cor: string; rota: string }) {
  return (
    <TouchableOpacity style={[styles.quickCard, { borderLeftColor: cor }]} onPress={() => router.push(rota as any)}>
      <MaterialCommunityIcons name={icon} size={28} color={cor} />
      <Text style={styles.quickValor}>{valor}</Text>
      <Text style={styles.quickLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function tipoColor(tipo: string) {
  const map: Record<string, string> = { noticia: Colors.categoryColors.noticia, evento: Colors.primary, edital: Colors.secondary, comunicado: Colors.categoryColors.biblioteca };
  return map[tipo] || Colors.primary;
}

function tipoLabel(tipo: string) {
  const map: Record<string, string> = { noticia: 'Notícia', evento: 'Evento', edital: 'Edital', comunicado: 'Comunicado' };
  return map[tipo] || tipo;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const { escolas } = useEscolasStore();
  const { materiais } = useBibliotecaStore();
  const { getDestaques } = useNoticiasStore();
  const destaques = getDestaques();
  const { totalAlunos, totalProfessores } = relatorioGeralMock;

  const saudacao = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Bom dia';
    if (h < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.saudacao}>{saudacao()}, {user?.nome?.split(' ')[0]} 👋</Text>
            <Text style={styles.headerSub}>Centro de Referência de Educação do Campo, das Águas e das Florestas do MA</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visão Geral</Text>
          <View style={styles.quickGrid}>
            <QuickCard icon="school-outline" label="Escolas" valor={escolas.length} cor={Colors.categoryColors.escola} rota="/(tabs)/escolas/index" />
            <QuickCard icon="account-group-outline" label="Alunos" valor={totalAlunos.toLocaleString('pt-BR')} cor={Colors.secondary} rota="/(tabs)/relatorios/index" />
            <QuickCard icon="book-open-outline" label="Materiais" valor={materiais.length} cor={Colors.categoryColors.biblioteca} rota="/(tabs)/biblioteca/index" />
            <QuickCard icon="map-marker-outline" label="Municípios" valor={217} cor={Colors.categoryColors.pesquisador} rota="/(tabs)/relatorios/index" />
          </View>
        </View>

        {destaques.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Destaques</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/noticias/index')}><Text style={styles.verTodos}>Ver todos</Text></TouchableOpacity>
            </View>
            {destaques.map((n: Noticia) => (
              <TouchableOpacity key={n.id} onPress={() => router.push(`/(tabs)/noticias/${n.id}` as any)}>
                <Card style={styles.noticiaCard}>
                  <Card.Content>
                    <Chip style={[styles.chip, { backgroundColor: tipoColor(n.tipo) + '20' }]} textStyle={{ color: tipoColor(n.tipo), fontSize: FontSize.xs }}>{tipoLabel(n.tipo)}</Chip>
                    <Text style={styles.noticiaTitle} numberOfLines={2}>{n.titulo}</Text>
                    <Text style={styles.noticiaResumo} numberOfLines={2}>{n.resumo}</Text>
                    <Text style={styles.noticiaData}>{formatDate(n.dataPublicacao)}</Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acesso Rápido</Text>
          <View style={styles.acessoGrid}>
            {[
              { icon: 'magnify' as const, label: 'Buscar Materiais', rota: '/(tabs)/biblioteca/index' },
              { icon: 'plus-circle-outline' as const, label: 'Cadastrar Escola', rota: '/(tabs)/escolas/nova' },
              { icon: 'account-plus-outline' as const, label: 'Ver Pesquisadores', rota: '/(tabs)/pesquisadores/index' },
              { icon: 'chart-line' as const, label: 'Ver Relatórios', rota: '/(tabs)/relatorios/index' },
              { icon: 'gavel' as const, label: 'Legislação', rota: '/(tabs)/legislacao/index' },
            ].map((item) => (
              <TouchableOpacity key={item.label} style={styles.acessoItem} onPress={() => router.push(item.rota as any)}>
                <View style={styles.acessoIcone}><MaterialCommunityIcons name={item.icon} size={24} color={Colors.primary} /></View>
                <Text style={styles.acessoLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.section, styles.statsSection]}>
          <Text style={[styles.sectionTitle, { color: Colors.textInverse }]}>Educação do Campo no MA</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}><Text style={styles.statValor}>{totalProfessores.toLocaleString('pt-BR')}</Text><Text style={styles.statLabel}>Professores</Text></View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}><Text style={styles.statValor}>217</Text><Text style={styles.statLabel}>Municípios</Text></View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}><Text style={styles.statValor}>1.247</Text><Text style={styles.statLabel}>Escolas</Text></View>
          </View>
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.primary },
  container: { flex: 1, backgroundColor: Colors.background },
  header: { backgroundColor: Colors.primary, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl, paddingTop: Spacing.md },
  saudacao: { fontSize: FontSize.xl, fontWeight: '700', color: Colors.textInverse },
  headerSub: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  section: { padding: Spacing.lg, paddingBottom: 0 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text, marginBottom: Spacing.md },
  verTodos: { fontSize: FontSize.sm, color: Colors.primary, fontWeight: '600' },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  quickCard: { flex: 1, minWidth: '45%', backgroundColor: Colors.surface, borderRadius: BorderRadius.md, padding: Spacing.md, borderLeftWidth: 4, elevation: 2 },
  quickValor: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.text, marginTop: 6 },
  quickLabel: { fontSize: FontSize.sm, color: Colors.textLight, marginTop: 2 },
  noticiaCard: { marginBottom: Spacing.md, backgroundColor: Colors.surface, borderRadius: BorderRadius.md },
  chip: { alignSelf: 'flex-start', marginBottom: 6, height: 24 },
  noticiaTitle: { fontSize: FontSize.md, fontWeight: '700', color: Colors.text, marginBottom: 4 },
  noticiaResumo: { fontSize: FontSize.sm, color: Colors.textLight, lineHeight: 20 },
  noticiaData: { fontSize: FontSize.xs, color: Colors.textLight, marginTop: 6 },
  acessoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  acessoItem: { flex: 1, minWidth: '45%', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: BorderRadius.md, padding: Spacing.md, borderWidth: 1, borderColor: Colors.border },
  acessoIcone: { width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.primary + '15', alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  acessoLabel: { fontSize: FontSize.sm, color: Colors.text, textAlign: 'center', fontWeight: '500' },
  statsSection: { backgroundColor: Colors.primary, margin: Spacing.lg, borderRadius: BorderRadius.lg, padding: Spacing.lg, paddingBottom: Spacing.lg },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  statItem: { alignItems: 'center', flex: 1 },
  statValor: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.textInverse },
  statLabel: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  statDivider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.3)' },
});
