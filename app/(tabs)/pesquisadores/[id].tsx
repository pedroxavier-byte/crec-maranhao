import { ScrollView, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Text, Chip, Divider, Button, Avatar } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePesquisadoresStore } from '../../../store/usePesquisadoresStore';
import { Colors, Spacing, FontSize, BorderRadius } from '../../../constants/Colors';
import { TipoPessoa } from '../../../types';

const TIPO_CORES: Record<TipoPessoa, string> = { pesquisador: Colors.categoryColors.pesquisador, professor: Colors.primary, gestor: Colors.secondary, militante: '#795548' };

function getInitials(nome: string) {
  return nome.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

export default function PesquisadorDetalheScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { pesquisadores } = usePesquisadoresStore();
  const pessoa = pesquisadores.find((p) => p.id === id);

  if (!pessoa) return (
    <SafeAreaView style={styles.safe}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Pessoa não encontrada.</Text>
        <Button onPress={() => router.back()}>Voltar</Button>
      </View>
    </SafeAreaView>
  );

  const cor = TIPO_CORES[pessoa.tipo];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { backgroundColor: cor }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Avatar.Text size={80} label={getInitials(pessoa.nome)} style={{ backgroundColor: 'rgba(255,255,255,0.25)', alignSelf: 'center' }} color="#fff" />
          <Text style={styles.headerNome}>{pessoa.nome}</Text>
          <Text style={styles.headerTipo}>{pessoa.tipo.charAt(0).toUpperCase() + pessoa.tipo.slice(1)}</Text>
          <Text style={styles.headerInst}>{pessoa.instituicao}</Text>
        </View>

        <View style={styles.content}>
          {pessoa.bio && (
            <>
              <Text style={styles.secaoTitulo}>Sobre</Text>
              <Text style={styles.bio}>{pessoa.bio}</Text>
              <Divider style={styles.divider} />
            </>
          )}

          <Text style={styles.secaoTitulo}>Áreas de Atuação</Text>
          <View style={styles.chipsWrap}>
            {pessoa.areasAtuacao.map((area) => (
              <Chip key={area} style={[styles.areaChip, { backgroundColor: cor + '15' }]} textStyle={{ color: cor, fontSize: FontSize.sm, textTransform: 'capitalize' }}>
                {area.replace(/_/g, ' ')}
              </Chip>
            ))}
          </View>

          <Divider style={styles.divider} />

          <Text style={styles.secaoTitulo}>Contato</Text>
          {pessoa.email && (
            <TouchableOpacity style={styles.contatoRow} onPress={() => Linking.openURL(`mailto:${pessoa.email}`)}>
              <View style={[styles.contatoIcone, { backgroundColor: cor + '15' }]}><MaterialCommunityIcons name="email-outline" size={20} color={cor} /></View>
              <View style={styles.contatoInfo}><Text style={styles.contatoLabel}>E-mail</Text><Text style={styles.contatoValor}>{pessoa.email}</Text></View>
              <MaterialCommunityIcons name="chevron-right" size={18} color={Colors.border} />
            </TouchableOpacity>
          )}
          {pessoa.lattes && (
            <TouchableOpacity style={styles.contatoRow} onPress={() => pessoa.lattes && Linking.openURL(pessoa.lattes)}>
              <View style={[styles.contatoIcone, { backgroundColor: cor + '15' }]}><MaterialCommunityIcons name="card-account-details-outline" size={20} color={cor} /></View>
              <View style={styles.contatoInfo}><Text style={styles.contatoLabel}>Currículo Lattes</Text><Text style={styles.contatoValor} numberOfLines={1}>{pessoa.lattes}</Text></View>
              <MaterialCommunityIcons name="chevron-right" size={18} color={Colors.border} />
            </TouchableOpacity>
          )}

          {pessoa.publicacoes > 0 && (
            <>
              <Divider style={styles.divider} />
              <View style={styles.pubRow}>
                <MaterialCommunityIcons name="file-document-outline" size={20} color={cor} />
                <Text style={styles.pubText}>{pessoa.publicacoes} publicações cadastradas no currículo Lattes</Text>
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
  header: { padding: Spacing.lg, paddingTop: Spacing.md, paddingBottom: Spacing.xl, alignItems: 'center' },
  backBtn: { alignSelf: 'flex-start', marginBottom: Spacing.lg },
  headerNome: { fontSize: FontSize.xl, fontWeight: '800', color: '#fff', textAlign: 'center', marginTop: Spacing.md },
  headerTipo: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.85)', marginTop: 4, textTransform: 'capitalize', fontWeight: '600' },
  headerInst: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.75)', marginTop: 2, textAlign: 'center' },
  content: { padding: Spacing.lg },
  secaoTitulo: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text, marginBottom: Spacing.md },
  bio: { fontSize: FontSize.md, color: Colors.textLight, lineHeight: 24 },
  divider: { marginVertical: Spacing.lg },
  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Spacing.sm },
  areaChip: { borderWidth: 1, borderColor: Colors.border },
  contatoRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.border },
  contatoIcone: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  contatoInfo: { flex: 1 },
  contatoLabel: { fontSize: FontSize.xs, color: Colors.textLight },
  contatoValor: { fontSize: FontSize.sm, color: Colors.text, marginTop: 2 },
  pubRow: { flexDirection: 'row', gap: Spacing.sm, paddingVertical: Spacing.sm, borderBottomWidth: 1, borderBottomColor: Colors.border },
  pubText: { flex: 1, fontSize: FontSize.sm, color: Colors.textLight, lineHeight: 20 },
});
