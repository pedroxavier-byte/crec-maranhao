import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, Card, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { relatorioGeralMock } from '../../../data/relatorios';
import { Colors, Spacing, FontSize, BorderRadius } from '../../../constants/Colors';

function StatCard({ icon, label, valor, cor }: { icon: any; label: string; valor: string | number; cor: string }) {
  return (
    <View style={[styles.statCard, { borderTopColor: cor }]}>
      <MaterialCommunityIcons name={icon} size={28} color={cor} />
      <Text style={styles.statValor}>{typeof valor === 'number' ? valor.toLocaleString('pt-BR') : valor}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function RelatoriosScreen() {
  const r = relatorioGeralMock;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerBar}>
          <Text style={styles.headerTitulo}>Relatórios & Indicadores</Text>
          <Text style={styles.headerSub}>Educação do Campo no Maranhão</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.secaoTitulo}>Visão Geral</Text>
          <View style={styles.statsGrid}>
            <StatCard icon="school-outline" label="Escolas" valor={r.totalEscolas} cor={Colors.categoryColors.escola} />
            <StatCard icon="account-school" label="Alunos" valor={r.totalAlunos} cor={Colors.primary} />
            <StatCard icon="human-male-board" label="Professores" valor={r.totalProfessores} cor={Colors.secondary} />
            <StatCard icon="map-marker-outline" label="Municípios" valor={r.totalMunicipios} cor={Colors.categoryColors.pesquisador} />
          </View>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.secaoTitulo}>Distribuição por Zona</Text>
          {Object.entries(r.porZona).map(([zona, qtd]) => {
            const total = Object.values(r.porZona).reduce((a, b) => a + b, 0);
            const pct = Math.round((qtd / total) * 100);
            const CORES: Record<string, string> = { rural: '#2E7D32', quilombola: '#4A148C', assentamento: '#E65100', ribeirinha: '#01579B', indigena: '#BF360C' };
            const cor = CORES[zona] || Colors.primary;
            return (
              <View key={zona} style={styles.zonaRow}>
                <View style={styles.zonaInfo}>
                  <Text style={styles.zonaLabel}>{zona.charAt(0).toUpperCase() + zona.slice(1)}</Text>
                  <Text style={styles.zonaQtd}>{qtd.toLocaleString('pt-BR')} escolas</Text>
                </View>
                <View style={styles.barraContainer}>
                  <View style={[styles.barra, { width: `${pct}%` as any, backgroundColor: cor }]} />
                </View>
                <Text style={[styles.pct, { color: cor }]}>{pct}%</Text>
              </View>
            );
          })}
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.secaoTitulo}>Indicadores de Qualidade</Text>
          <Card style={styles.indicadorCard}>
            <Card.Content>
              <View style={styles.indicadorRow}>
                <MaterialCommunityIcons name="account-tie" size={20} color={Colors.primary} />
                <Text style={styles.indicadorLabel}>Média alunos/professor</Text>
                <Text style={styles.indicadorValor}>{(r.totalAlunos / r.totalProfessores).toFixed(1)}</Text>
              </View>
              <Divider style={{ marginVertical: Spacing.sm }} />
              <View style={styles.indicadorRow}>
                <MaterialCommunityIcons name="book-open-outline" size={20} color={Colors.secondary} />
                <Text style={styles.indicadorLabel}>Materiais digitais</Text>
                <Text style={[styles.indicadorValor, { color: Colors.secondary }]}>{r.totalMateriais}</Text>
              </View>
              <Divider style={{ marginVertical: Spacing.sm }} />
              <View style={styles.indicadorRow}>
                <MaterialCommunityIcons name="account-group-outline" size={20} color={Colors.categoryColors.pesquisador} />
                <Text style={styles.indicadorLabel}>Pesquisadores ativos</Text>
                <Text style={[styles.indicadorValor, { color: Colors.categoryColors.pesquisador }]}>{r.totalPesquisadores}</Text>
              </View>
            </Card.Content>
          </Card>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.secaoTitulo}>Por Município (Top 5)</Text>
          {r.porMunicipio.slice(0, 5).map((m, i) => (
            <Card key={m.municipio} style={styles.municipioCard}>
              <Card.Content>
                <View style={styles.municipioHeader}>
                  <View style={[styles.rankBadge, { backgroundColor: i < 3 ? Colors.primary : Colors.border }]}>
                    <Text style={styles.rankNum}>{i + 1}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.municipioNome}>{m.municipio}</Text>
                    <Text style={styles.municipioSub}>{m.totalEscolas} escolas • {m.totalAlunos.toLocaleString('pt-BR')} alunos</Text>
                  </View>
                </View>
                <View style={styles.municipioStats}>
                  <View style={styles.mStat}><Text style={styles.mStatNum}>{m.totalProfessores}</Text><Text style={styles.mStatLabel}>Professores</Text></View>
                  <View style={styles.mStat}><Text style={styles.mStatNum}>{m.escolasAtivas}</Text><Text style={styles.mStatLabel}>Ativas</Text></View>
                  <View style={styles.mStat}><Text style={[styles.mStatNum, { color: Colors.primary }]}>{(m.totalAlunos / m.totalProfessores).toFixed(0)}</Text><Text style={styles.mStatLabel}>Alunos/Prof</Text></View>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  headerBar: { backgroundColor: Colors.secondary, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.lg, paddingTop: Spacing.md },
  headerTitulo: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.textInverse },
  headerSub: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  section: { padding: Spacing.lg, paddingBottom: 0 },
  secaoTitulo: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text, marginBottom: Spacing.md },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  statCard: { flex: 1, minWidth: '45%', backgroundColor: Colors.surface, borderRadius: BorderRadius.md, padding: Spacing.md, alignItems: 'center', borderTopWidth: 3, elevation: 2 },
  statValor: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.text, marginTop: Spacing.sm },
  statLabel: { fontSize: FontSize.sm, color: Colors.textLight, marginTop: 2, textAlign: 'center' },
  divider: { marginVertical: Spacing.lg, marginHorizontal: Spacing.lg },
  zonaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md },
  zonaInfo: { width: 110 },
  zonaLabel: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.text },
  zonaQtd: { fontSize: FontSize.xs, color: Colors.textLight },
  barraContainer: { flex: 1, height: 8, backgroundColor: Colors.border, borderRadius: 4, overflow: 'hidden', marginHorizontal: Spacing.sm },
  barra: { height: '100%', borderRadius: 4 },
  pct: { width: 35, fontSize: FontSize.sm, fontWeight: '600', textAlign: 'right' },
  indicadorCard: { backgroundColor: Colors.surface, borderRadius: BorderRadius.md },
  indicadorRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  indicadorLabel: { flex: 1, fontSize: FontSize.md, color: Colors.text },
  indicadorValor: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text },
  municipioCard: { marginBottom: Spacing.md, backgroundColor: Colors.surface, borderRadius: BorderRadius.md },
  municipioHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.sm },
  rankBadge: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  rankNum: { fontSize: FontSize.sm, fontWeight: '700', color: '#fff' },
  municipioNome: { fontSize: FontSize.md, fontWeight: '700', color: Colors.text },
  municipioSub: { fontSize: FontSize.xs, color: Colors.textLight, marginTop: 2 },
  municipioStats: { flexDirection: 'row', gap: Spacing.lg },
  mStat: { alignItems: 'center' },
  mStatNum: { fontSize: FontSize.md, fontWeight: '700', color: Colors.text },
  mStatLabel: { fontSize: FontSize.xs, color: Colors.textLight },
});
