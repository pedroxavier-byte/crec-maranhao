import { useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, Chip, HelperText } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore, ROLES_RESTRITAS } from '../../store/useAuthStore';
import { UserRole } from '../../types';
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants/Colors';

type RoleOption = { value: UserRole; label: string; icon: string; descricao: string; restrito: boolean };

const ROLES: RoleOption[] = [
  { value: 'professor', label: 'Professor(a)', icon: 'human-male-board', descricao: 'Docente de escola do campo', restrito: false },
  { value: 'pesquisador', label: 'Pesquisador(a)', icon: 'flask-outline', descricao: 'Pesquisador acadêmico ou independente', restrito: false },
  { value: 'estudante', label: 'Estudante', icon: 'school-outline', descricao: 'Aluno de graduação, pós-graduação ou educação básica', restrito: false },
  { value: 'gestor', label: 'Gestão', icon: 'briefcase-outline', descricao: 'Gestor escolar ou educacional — requer aprovação', restrito: true },
  { value: 'agente_territorial', label: 'Agente Territorial', icon: 'map-marker-radius-outline', descricao: 'Agente de educação territorial — requer aprovação', restrito: true },
  { value: 'conselho', label: 'Conselho', icon: 'account-group-outline', descricao: 'Membro de conselho educacional — requer aprovação', restrito: true },
];

export default function RegisterScreen() {
  const { registrar, loading } = useAuthStore();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [role, setRole] = useState<UserRole | null>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [telefone, setTelefone] = useState('');
  const [instituicao, setInstituicao] = useState('');
  const [cargo, setCargo] = useState('');
  const [escola, setEscola] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [curso, setCurso] = useState('');
  const [lattes, setLattes] = useState('');
  const [tipoConselho, setTipoConselho] = useState('');
  const [zonaAtuacao, setZonaAtuacao] = useState('');
  const [observacao, setObservacao] = useState('');
  const [erro, setErro] = useState('');
  const [resultado, setResultado] = useState<{ ok: boolean; mensagem: string; pendente?: boolean } | null>(null);

  const roleAtual = ROLES.find((r) => r.value === role);
  const isRestrito = role ? ROLES_RESTRITAS.includes(role) : false;

  const validarStep2 = () => {
    if (!nome.trim()) return 'Informe seu nome completo.';
    if (!email.trim() || !email.includes('@')) return 'Informe um e-mail válido.';
    if (senha.length < 6) return 'A senha deve ter ao menos 6 caracteres.';
    if (senha !== confirmarSenha) return 'As senhas não coincidem.';
    if (!municipio.trim()) return 'Informe seu município.';
    return '';
  };

  const handleStep2 = () => {
    const err = validarStep2();
    if (err) { setErro(err); return; }
    setErro('');
    setStep(3);
  };

  const handleSubmit = async () => {
    if (!role) return;
    setErro('');
    const res = await registrar({
      nome, email, senha, role, municipio, telefone, instituicao,
      cargo, escola, disciplina, curso, lattes, tipoConselho, zonaAtuacao, observacao,
    });
    setResultado(res);
  };

  if (resultado) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.resultadoContainer}>
          <View style={[styles.resultadoIcone, { backgroundColor: resultado.pendente ? '#FFF8E1' : '#E8F5E9' }]}>
            <MaterialCommunityIcons
              name={resultado.pendente ? 'clock-outline' : 'check-circle-outline'}
              size={72}
              color={resultado.pendente ? '#F9A825' : Colors.success}
            />
          </View>
          <Text style={styles.resultadoTitulo}>
            {resultado.pendente ? 'Cadastro Enviado!' : 'Cadastro Realizado!'}
          </Text>
          <Text style={styles.resultadoTexto}>{resultado.mensagem}</Text>
          {resultado.pendente && (
            <View style={styles.infoBox}>
              <MaterialCommunityIcons name="information-outline" size={18} color={Colors.info} />
              <Text style={styles.infoTexto}>
                O administrador do CREC-MA irá analisar seu cadastro. Você receberá acesso após a aprovação.
              </Text>
            </View>
          )}
          <Button mode="contained" onPress={() => router.replace('/(auth)/login')} style={styles.botao} buttonColor={Colors.primary}>
            Ir para o Login
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => step === 1 ? router.back() : setStep((s) => (s - 1) as any)}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.textInverse} />
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>
          {step === 1 ? 'Tipo de Acesso' : step === 2 ? 'Dados Pessoais' : 'Informações Complementares'}
        </Text>
        <Text style={styles.headerStep}>{step}/3</Text>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(step / 3) * 100}%` as any }]} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {step === 1 && (
          <View>
            <Text style={styles.secaoTitulo}>Como você vai participar?</Text>

            <Text style={styles.secaoSub}>Acesso imediato</Text>
            {ROLES.filter((r) => !r.restrito).map((r) => (
              <TouchableOpacity key={r.value} style={[styles.roleCard, role === r.value && styles.roleCardAtivo]} onPress={() => setRole(r.value)}>
                <View style={[styles.roleIcone, { backgroundColor: Colors.primary + '15' }]}>
                  <MaterialCommunityIcons name={r.icon as any} size={28} color={Colors.primary} />
                </View>
                <View style={styles.roleInfo}>
                  <Text style={styles.roleLabel}>{r.label}</Text>
                  <Text style={styles.roleDesc}>{r.descricao}</Text>
                </View>
                <View style={[styles.roleCheck, role === r.value && styles.roleCheckAtivo]}>
                  {role === r.value && <MaterialCommunityIcons name="check" size={16} color="#fff" />}
                </View>
              </TouchableOpacity>
            ))}

            <Text style={[styles.secaoSub, { marginTop: Spacing.lg }]}>Acesso com aprovação</Text>
            <View style={styles.avisoBox}>
              <MaterialCommunityIcons name="shield-lock-outline" size={18} color={Colors.warning} />
              <Text style={styles.avisoTexto}>Estes cadastros precisam ser aprovados pelo administrador do CREC-MA antes de liberar o acesso.</Text>
            </View>
            {ROLES.filter((r) => r.restrito).map((r) => (
              <TouchableOpacity key={r.value} style={[styles.roleCard, styles.roleCardRestrito, role === r.value && styles.roleCardAtivoRestrito]} onPress={() => setRole(r.value)}>
                <View style={[styles.roleIcone, { backgroundColor: Colors.warning + '20' }]}>
                  <MaterialCommunityIcons name={r.icon as any} size={28} color={Colors.warning} />
                </View>
                <View style={styles.roleInfo}>
                  <Text style={styles.roleLabel}>{r.label}</Text>
                  <Text style={styles.roleDesc}>{r.descricao}</Text>
                </View>
                <View style={[styles.roleCheck, styles.roleCheckRestrito, role === r.value && styles.roleCheckAtivoRestrito]}>
                  {role === r.value && <MaterialCommunityIcons name="check" size={16} color="#fff" />}
                </View>
              </TouchableOpacity>
            ))}

            {erro ? <HelperText type="error" style={{ textAlign: 'center' }}>{erro}</HelperText> : null}
            <Button mode="contained" onPress={() => { if (!role) { setErro('Selecione um tipo de acesso.'); return; } setErro(''); setStep(2); }} style={styles.botao} buttonColor={Colors.primary} disabled={!role}>
              Continuar
            </Button>
          </View>
        )}

        {step === 2 && (
          <View>
            {roleAtual && (
              <View style={[styles.roleResumo, { borderColor: isRestrito ? Colors.warning : Colors.primary }]}>
                <MaterialCommunityIcons name={roleAtual.icon as any} size={20} color={isRestrito ? Colors.warning : Colors.primary} />
                <Text style={[styles.roleResumoText, { color: isRestrito ? Colors.warning : Colors.primary }]}>{roleAtual.label}</Text>
                {isRestrito && <Chip style={styles.pendenteChip} textStyle={{ fontSize: 9, color: Colors.warning }}>Requer aprovação</Chip>}
              </View>
            )}
            <TextInput label="Nome completo *" value={nome} onChangeText={setNome} mode="outlined" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
            <TextInput label="E-mail *" value={email} onChangeText={setEmail} mode="outlined" keyboardType="email-address" autoCapitalize="none" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
            <TextInput label="Senha * (mínimo 6 caracteres)" value={senha} onChangeText={setSenha} mode="outlined" secureTextEntry style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
            <TextInput label="Confirmar senha *" value={confirmarSenha} onChangeText={setConfirmarSenha} mode="outlined" secureTextEntry style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
            <TextInput label="Município *" value={municipio} onChangeText={setMunicipio} mode="outlined" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
            <TextInput label="Telefone / WhatsApp" value={telefone} onChangeText={setTelefone} mode="outlined" keyboardType="phone-pad" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
            {erro ? <HelperText type="error">{erro}</HelperText> : null}
            <Button mode="contained" onPress={handleStep2} style={styles.botao} buttonColor={Colors.primary}>Continuar</Button>
          </View>
        )}

        {step === 3 && (
          <View>
            {role === 'professor' && (
              <>
                <TextInput label="Escola onde leciona" value={escola} onChangeText={setEscola} mode="outlined" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
                <TextInput label="Disciplina(s)" value={disciplina} onChangeText={setDisciplina} mode="outlined" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
                <TextInput label="Nível de ensino" value={curso} onChangeText={setCurso} mode="outlined" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
              </>
            )}
            {role === 'pesquisador' && (
              <>
                <TextInput label="Instituição / Universidade" value={instituicao} onChangeText={setInstituicao} mode="outlined" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
                <TextInput label="Área de pesquisa" value={disciplina} onChangeText={setDisciplina} mode="outlined" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
                <TextInput label="Link do Currículo Lattes" value={lattes} onChangeText={setLattes} mode="outlined" autoCapitalize="none" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
              </>
            )}
            {role === 'estudante' && (
              <>
                <TextInput label="Instituição de ensino" value={instituicao} onChangeText={setInstituicao} mode="outlined" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
                <TextInput label="Curso" value={curso} onChangeText={setCurso} mode="outlined" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
                <TextInput label="Nível (graduação, pós, ensino médio...)" value={disciplina} onChangeText={setDisciplina} mode="outlined" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
              </>
            )}
            {role === 'gestor' && (
              <>
                <TextInput label="Órgão / Secretaria" value={instituicao} onChangeText={setInstituicao} mode="outlined" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
                <TextInput label="Cargo" value={cargo} onChangeText={setCargo} mode="outlined" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
                <TextInput label="Justificativa de acesso" value={observacao} onChangeText={setObservacao} mode="outlined" multiline numberOfLines={3} style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
              </>
            )}
            {role === 'agente_territorial' && (
              <>
                <TextInput label="Zona / Território de atuação" value={zonaAtuacao} onChangeText={setZonaAtuacao} mode="outlined" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
                <TextInput label="Órgão vinculado" value={instituicao} onChangeText={setInstituicao} mode="outlined" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
                <TextInput label="Justificativa de acesso" value={observacao} onChangeText={setObservacao} mode="outlined" multiline numberOfLines={3} style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
              </>
            )}
            {role === 'conselho' && (
              <>
                <TextInput label="Tipo de conselho (CME, CEE, CACS-FUNDEB...)" value={tipoConselho} onChangeText={setTipoConselho} mode="outlined" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
                <TextInput label="Cargo no conselho" value={cargo} onChangeText={setCargo} mode="outlined" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
                <TextInput label="Justificativa de acesso" value={observacao} onChangeText={setObservacao} mode="outlined" multiline numberOfLines={3} style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
              </>
            )}

            {isRestrito && (
              <View style={styles.avisoBox}>
                <MaterialCommunityIcons name="clock-alert-outline" size={18} color={Colors.warning} />
                <Text style={styles.avisoTexto}>Após o envio, seu cadastro ficará pendente até a aprovação do administrador do CREC-MA.</Text>
              </View>
            )}

            {erro ? <HelperText type="error">{erro}</HelperText> : null}
            <Button mode="contained" onPress={handleSubmit} loading={loading} disabled={loading} style={styles.botao} buttonColor={isRestrito ? Colors.warning : Colors.primary}>
              {isRestrito ? 'Enviar para Aprovação' : 'Criar Conta'}
            </Button>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  headerBar: { backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  headerTitulo: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.textInverse },
  headerStep: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.8)' },
  progressBar: { height: 4, backgroundColor: Colors.border },
  progressFill: { height: '100%', backgroundColor: Colors.primary },
  scroll: { padding: Spacing.lg },
  secaoTitulo: { fontSize: FontSize.xl, fontWeight: '700', color: Colors.text, marginBottom: Spacing.lg },
  secaoSub: { fontSize: FontSize.sm, fontWeight: '700', color: Colors.textLight, marginBottom: Spacing.sm, textTransform: 'uppercase', letterSpacing: 0.5 },
  roleCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: BorderRadius.md, padding: Spacing.md, marginBottom: Spacing.sm, borderWidth: 2, borderColor: Colors.border, gap: Spacing.md },
  roleCardAtivo: { borderColor: Colors.primary, backgroundColor: Colors.primary + '08' },
  roleCardRestrito: { borderColor: Colors.warning + '50' },
  roleCardAtivoRestrito: { borderColor: Colors.warning, backgroundColor: Colors.warning + '08' },
  roleIcone: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  roleInfo: { flex: 1 },
  roleLabel: { fontSize: FontSize.md, fontWeight: '700', color: Colors.text },
  roleDesc: { fontSize: FontSize.sm, color: Colors.textLight, marginTop: 2 },
  roleCheck: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  roleCheckAtivo: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  roleCheckRestrito: { borderColor: Colors.warning },
  roleCheckAtivoRestrito: { backgroundColor: Colors.warning, borderColor: Colors.warning },
  avisoBox: { flexDirection: 'row', gap: Spacing.sm, backgroundColor: Colors.warning + '15', padding: Spacing.md, borderRadius: BorderRadius.md, marginBottom: Spacing.md, alignItems: 'flex-start' },
  avisoTexto: { flex: 1, fontSize: FontSize.sm, color: Colors.text, lineHeight: 20 },
  input: { marginBottom: Spacing.md, backgroundColor: Colors.surface },
  botao: { marginTop: Spacing.md, borderRadius: 8 },
  roleResumo: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, borderWidth: 1, borderRadius: BorderRadius.md, padding: Spacing.md, marginBottom: Spacing.lg, backgroundColor: Colors.surface },
  roleResumoText: { fontSize: FontSize.md, fontWeight: '700', flex: 1 },
  pendenteChip: { backgroundColor: Colors.warning + '20', height: 22 },
  resultadoContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl },
  resultadoIcone: { width: 120, height: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.lg },
  resultadoTitulo: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.text, marginBottom: Spacing.md, textAlign: 'center' },
  resultadoTexto: { fontSize: FontSize.md, color: Colors.textLight, textAlign: 'center', lineHeight: 24, marginBottom: Spacing.lg },
  infoBox: { flexDirection: 'row', gap: Spacing.sm, backgroundColor: Colors.info + '15', padding: Spacing.md, borderRadius: BorderRadius.md, marginBottom: Spacing.lg, alignItems: 'flex-start' },
  infoTexto: { flex: 1, fontSize: FontSize.sm, color: Colors.text, lineHeight: 20 },
});
