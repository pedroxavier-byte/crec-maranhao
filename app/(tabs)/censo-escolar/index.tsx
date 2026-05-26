import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../../constants/Colors';

const POWERBI_URL = 'https://app.powerbi.com/view?r=eyJrIjoiN2ViNDBjNDEtMTM0OC00ZmFhLWIyZWYtZjI1YjU0NzQzMTJhIiwidCI6IjI2ZjczODk3LWM4YWMtNGIxZS05NzhmLWVhNGMwNzc0MzRiZiJ9';

export default function CensoEscolarScreen() {
  const abrirPainel = () => {
    Linking.openURL(POWERBI_URL);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <MaterialCommunityIcons name="chart-bar" size={48} color="white" />
        <Text style={styles.headerTitle}>Painéis Estatísticos do Censo Escolar</Text>
        <Text style={styles.headerSub}>Dados e indicadores educacionais do campo — Maranhão</Text>
      </View>

      {/* Card principal */}
      <View style={styles.card}>
        <View style={styles.cardIconRow}>
          <MaterialCommunityIcons name="microsoft-power-bi" size={32} color="#01579B" />
          <Text style={styles.cardTitle}>Power BI — INEP/MEC</Text>
        </View>
        <Text style={styles.cardDesc}>
          Acesse os painéis interativos com dados do Censo Escolar. Visualize indicadores de matrículas,
          infraestrutura, docentes e muito mais nas escolas do campo do Maranhão.
        </Text>

        <TouchableOpacity style={styles.botao} onPress={abrirPainel} activeOpacity={0.85}>
          <MaterialCommunityIcons name="open-in-new" size={20} color="white" />
          <Text style={styles.botaoTexto}>Abrir Painel Estatístico</Text>
        </TouchableOpacity>
      </View>

      {/* Informações */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitulo}>📌 Sobre o Censo Escolar</Text>
        <Text style={styles.infoTexto}>
          O Censo Escolar é o principal instrumento de coleta de informações da educação básica brasileira,
          realizado anualmente pelo INEP em parceria com as secretarias estaduais e municipais de educação.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitulo}>📊 O que você encontra</Text>
        {[
          'Número de matrículas por etapa e modalidade',
          'Infraestrutura das escolas do campo',
          'Dados de professores e turmas',
          'Indicadores por município e região',
          'Evolução histórica dos dados',
        ].map((item, i) => (
          <View key={i} style={styles.itemRow}>
            <MaterialCommunityIcons name="check-circle-outline" size={16} color="#01579B" />
            <Text style={styles.itemTexto}>{item}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={[styles.botao, { marginTop: 8, marginBottom: 32 }]} onPress={abrirPainel} activeOpacity={0.85}>
        <MaterialCommunityIcons name="chart-line" size={20} color="white" />
        <Text style={styles.botaoTexto}>Acessar os Painéis</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  content: { paddingBottom: 24 },
  header: {
    backgroundColor: '#01579B',
    padding: 32,
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 26,
  },
  headerSub: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    textAlign: 'center',
  },
  card: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#01579B',
  },
  cardDesc: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 22,
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#01579B',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 16,
  },
  botaoTexto: {
    color: 'white',
    fontSize: 15,
    fontWeight: '800',
  },
  infoBox: {
    margin: 16,
    marginTop: 0,
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#01579B',
  },
  infoTitulo: {
    fontSize: 14,
    fontWeight: '800',
    color: '#01579B',
    marginBottom: 8,
  },
  infoTexto: {
    fontSize: 13,
    color: '#424242',
    lineHeight: 20,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  itemTexto: {
    fontSize: 13,
    color: '#424242',
    flex: 1,
  },
});
