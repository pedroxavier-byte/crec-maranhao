import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Button, Chip, Divider, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../../store/useAuthStore';
import { User, UserRole } from '../../../types';
import { Colors, Spacing, FontSize, BorderRadius } from '../../../constants/Colors';

const ROLE_CONFIG: Record<UserRole, { label: string; cor: string; icone: string }> = {
  admin: { label: 'Admin', cor: '#C62828', icone: 'shield-crown-outline' },
  gestor: { label: 'Gestão', cor: Colors.secondary, icone: 'briefcase-outline' },
  agente_territorial: { label: 'Agente Territorial', cor: '#6A1B9A', icone: 'map-marker-radius-outline' },
  conselho: { label: 'Conselho', cor: '#01579B', icone: 'account-group-outline' },
  pesquisador: { label: 'Pesquisador(a)', cor: Colors.categoryColors.pesquisador, icone: 'flask-outline' },
  estudante: { label: 'Estudante', cor: Colors.primary, icone: 'school-outline' },
  professor: { label: 'Professor(a)', cor: Colors.primary, icone: 'human-male-board' },
};

function getInitials(nome: string) {
  return nome.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

function UsuarioCard({ usuario, onAprovar, onRejeitar }: { usuario: User; onAprovar: () => void; onRejeitar: () => void }) {
  const cfg = ROLE_CONFIG[usuario.role];
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Avatar.Text size={48} label={getInitials(usuario.nome)} style={{ backgroundColor: cfg.cor }} color="#fff" />
          <View style={styles.cardInfo}>
            <Text style={styles.cardNome}>{usuario.nome}</Text>
            <Text style={styles.cardEmail}>{usuario.email}</Text>
            <Chip style={[styles.roleChip, { backgroundColor: cfg.cor + '20' }]} textStyle={{ color: cfg.cor, fontSize: 10 }}>
              {cfg.label}
            </Chip>
          </View>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.detalhes}>
          {usuario.municipio && (
            <View style={styles.detalheRow}>
              <MaterialCommunityIcons name="map-marker-outline" size={14} color={Colors.textLight} />
              <Text style={styles.detalheText}>{usuario.municipio}</Text>
            </View>
          )}
          {usuario.instituicao && (
            <View style={styles.detalheRow}>
              <MaterialCommunityIcons name="office-building-outline" size={14} color={Colors.textLight} />
              <Text style={styles.detalheText}>{usuario.instituicao}</Text>
            </View>
          )}
          {usuario.cargo && (
            <View style={styles.detalheRow}>
              <MaterialCommunityIcons name="badge-account-outline" size={14} color={Colors.textLight} />
              <Text style={styles.detalheText}>{usuario.cargo}</Text>
            </View>
          )}
          {usuario.tipoConselho && (
            <View style={styles.detalheRow}>
              <MaterialCommunityIcons name="account-group-outline" size={14} color={Colors.textLight} />
              <Text style={styles.detalheText}>{usuario.tipoConselho}</Text>
            </View>
          )}
          {usuario.zonaAtuacao && (
            <View style={styles.detalheRow}>
              <MaterialCommunityIcons name="map-outline" size={14} color={Colors.textLight} />
              <Text style={styles.detalheText}>{usuario.zonaAtuacao}</Text>
            </View>
          )}
          {usuario.observacao && (
            <View style={[styles.detalheRow, { alignItems: 'flex-start' }]}>
              <MaterialCommunityIcons name="text-box-outline" size={14} color={Colors.textLight} style={{ marginTop: 2 }} />
              <Text style={[styles.detalheText, { flex: 1 }]}>{usuario.observacao}</Text>
            </View>
          )}
          <View style={styles.detalheRow}>
            <MaterialCommunityIcons name="calendar-outline" size={14} color={Colors.textLight} />
            <Text style={styles.detalheText}>Cadastrado em {new Date(usuario.createdAt).toLocaleDateString('pt-BR')}</Text>
          </View>
        </View>

        <View style={styles.acoes}>
          <Button mode="contained" onPress={onAprovar} buttonColor={Colors.success} style={styles.botaoAprovar} contentStyle={styles.botaoContent} icon="check">
            Aprovar
          </Button>
          <Button mode="outlined" onPress={onRejeitar} textColor={Colors.error} style={styles.botaoRejeitar} contentStyle={styles.botaoContent} icon="close">
            Rejeitar
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
}

function TodosUsuarios({ usuarios }: { usuarios: User[] }) {
  const ativos = usuarios.filter((u) => u.status === 'ativo' && u.role !== 'admin');
  const rejeitados = usuarios.filter((u) => u.status === 'rejeitado');

  return (
    <View>
      {ativos.length > 0 && (
        <>
          <Text style={styles.subSecao}>Usuários Ativos ({ativos.length})</Text>
          {ativos.map((u) => {
            const cfg = ROLE_CONFIG[u.role];
            return (
              <Card key={u.id} style={[styles.card, styles.cardAtivo]}>
                <Card.Content style={styles.cardAtivoContent}>
                  <Avatar.Text size={36} label={getInitials(u.nome)} style={{ backgroundColor: cfg.cor }} color="#fff" />
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardNome}>{u.nome}</Text>
                    <Text style={styles.cardEmail}>{u.email}</Text>
                  </View>
                  <Chip style={[styles.roleChip, { backgroundColor: cfg.cor + '20' }]} textStyle={{ color: cfg.cor, fontSize: 9 }}>{cfg.label}</Chip>
                </Card.Content>
              </Card>
            );
          })}
        </>
      )}
      {rejeitados.length > 0 && (
        <>
          <Text style={[styles.subSecao, { color: Colors.error }]}>Rejeitados ({rejeitados.length})</Text>
          {rejeitados.map((u) => {
            const cfg = ROLE_CONFIG[u.role];
            return (
              <Card key={u.id} style={[styles.card, styles.cardRejeitado]}>
                <Card.Content style={styles.cardAtivoContent}>
                  <Avatar.Text size={36} label={getInitials(u.nome)} style={{ backgroundColor: Colors.border }} color={Colors.textLight} />
                  <View style={styles.cardInfo}>
                    <Text style={[styles.cardNome, { color: Colors.textLight }]}>{u.nome}</Text>
                    <Text style={styles.cardEmail}>{u.email}</Text>
                  </View>
                  <Chip style={styles.rejeitadoChip} textStyle={{ color: Colors.error, fontSize: 9 }}>Rejeitado</Chip>
                </Card.Content>
              </Card>
            );
          })}
        </>
      )}
    </View>
  );
}

export default function AdminScreen() {
  const { usuarios, getPendentes, aprovarUsuario, rejeitarUsuario, isAdmin } = useAuthStore();
  const pendentes = getPendentes();

  if (!isAdmin()) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.semAcesso}>
          <MaterialCommunityIcons name="shield-lock-outline" size={64} color={Colors.border} />
          <Text style={styles.semAcessoTitulo}>Acesso Restrito</Text>
          <Text style={styles.semAcessoTexto}>Esta área é exclusiva para o administrador do CREC-MA.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerBar}>
        <View style={styles.headerIcone}>
          <MaterialCommunityIcons name="shield-crown-outline" size={26} color={Colors.textInverse} />
        </View>
        <View>
          <Text style={styles.headerTitulo}>Painel do Administrador</Text>
          <Text style={styles.headerSub}>Gerenciamento de cadastros</Text>
        </View>
      </View>

      <FlatList
        data={[1]}
        keyExtractor={() => 'main'}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View style={styles.content}>
            <View style={styles.statsRow}>
              <View style={[styles.statBox, { backgroundColor: Colors.warning + '20', borderColor: Colors.warning }]}>
                <Text style={[styles.statNum, { color: Colors.warning }]}>{pendentes.length}</Text>
                <Text style={styles.statLabel}>Pendentes</Text>
              </View>
              <View style={[styles.statBox, { backgroundColor: Colors.success + '15', borderColor: Colors.success }]}>
                <Text style={[styles.statNum, { color: Colors.success }]}>{usuarios.filter((u) => u.status === 'ativo' && u.role !== 'admin').length}</Text>
                <Text style={styles.statLabel}>Aprovados</Text>
              </View>
              <View style={[styles.statBox, { backgroundColor: Colors.error + '10', borderColor: Colors.error }]}>
                <Text style={[styles.statNum, { color: Colors.error }]}>{usuarios.filter((u) => u.status === 'rejeitado').length}</Text>
                <Text style={styles.statLabel}>Rejeitados</Text>
              </View>
            </View>

            {pendentes.length > 0 && (
              <>
                <View style={styles.secaoHeader}>
                  <MaterialCommunityIcons name="clock-alert-outline" size={20} color={Colors.warning} />
                  <Text style={styles.secaoTitulo}>Aguardando Aprovação ({pendentes.length})</Text>
                </View>
                {pendentes.map((u) => (
                  <UsuarioCard key={u.id} usuario={u} onAprovar={() => aprovarUsuario(u.id)} onRejeitar={() => rejeitarUsuario(u.id)} />
                ))}
                <Divider style={styles.divider} />
              </>
            )}

            {pendentes.length === 0 && (
              <View style={styles.semPendentes}>
                <MaterialCommunityIcons name="check-all" size={48} color={Colors.success} />
                <Text style={styles.semPendentesText}>Nenhum cadastro pendente</Text>
              </View>
            )}

            <View style={styles.secaoHeader}>
              <MaterialCommunityIcons name="account-multiple-outline" size={20} color={Colors.primary} />
              <Text style={styles.secaoTitulo}>Todos os Usuários</Text>
            </View>
            <TodosUsuarios usuarios={usuarios} />

            <View style={{ height: 40 }} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  headerBar: { backgroundColor: '#C62828', paddingHorizontal: Spacing.lg, paddingBottom: Spacing.lg, paddingTop: Spacing.md, flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  headerIcone: { backgroundColor: 'rgba(255,255,255,0.2)', width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  headerTitulo: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.textInverse },
  headerSub: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  content: { padding: Spacing.lg },
  statsRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg },
  statBox: { flex: 1, alignItems: 'center', padding: Spacing.md, borderRadius: BorderRadius.md, borderWidth: 1 },
  statNum: { fontSize: FontSize.xxl, fontWeight: '800' },
  statLabel: { fontSize: FontSize.xs, color: Colors.textLight, marginTop: 2 },
  secaoHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.md },
  secaoTitulo: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text },
  subSecao: { fontSize: FontSize.sm, fontWeight: '700', color: Colors.textLight, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: Spacing.sm, marginTop: Spacing.md },
  card: { marginBottom: Spacing.md, backgroundColor: Colors.surface, borderRadius: BorderRadius.md },
  cardAtivo: { borderLeftWidth: 3, borderLeftColor: Colors.success },
  cardRejeitado: { borderLeftWidth: 3, borderLeftColor: Colors.error, opacity: 0.7 },
  cardAtivoContent: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md, marginBottom: Spacing.sm },
  cardInfo: { flex: 1 },
  cardNome: { fontSize: FontSize.md, fontWeight: '700', color: Colors.text },
  cardEmail: { fontSize: FontSize.sm, color: Colors.textLight, marginTop: 2, marginBottom: 6 },
  roleChip: { alignSelf: 'flex-start', height: 22 },
  rejeitadoChip: { backgroundColor: Colors.error + '15', height: 22, alignSelf: 'flex-start' },
  divider: { marginVertical: Spacing.md },
  detalhes: { gap: 6, marginBottom: Spacing.md },
  detalheRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  detalheText: { fontSize: FontSize.sm, color: Colors.textLight },
  acoes: { flexDirection: 'row', gap: Spacing.sm },
  botaoAprovar: { flex: 1, borderRadius: 8 },
  botaoRejeitar: { flex: 1, borderRadius: 8, borderColor: Colors.error },
  botaoContent: { paddingVertical: 2 },
  semAcesso: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  semAcessoTitulo: { fontSize: FontSize.xl, fontWeight: '700', color: Colors.text, marginTop: Spacing.lg },
  semAcessoTexto: { fontSize: FontSize.md, color: Colors.textLight, textAlign: 'center', marginTop: Spacing.sm },
  semPendentes: { alignItems: 'center', paddingVertical: Spacing.xl },
  semPendentesText: { fontSize: FontSize.md, color: Colors.success, marginTop: Spacing.sm, fontWeight: '600' },
});
