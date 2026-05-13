import { useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, Chip, HelperText } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEscolasStore } from '../../../store/useEscolasStore';
import { ZonaEscola, NivelEnsino } from '../../../types';
import { Colors, Spacing, FontSize } from '../../../constants/Colors';

const ZONAS: { label: string; value: ZonaEscola }[] = [{ label: 'Rural', value: 'rural' }, { label: 'Quilombola', value: 'quilombola' }, { label: 'Assentamento', value: 'assentamento' }, { label: 'Ribeirinha', value: 'ribeirinha' }, { label: 'Indígena', value: 'indigena' }];
const NIVEIS: { label: string; value: NivelEnsino }[] = [{ label: 'Ed. Infantil', value: 'infantil' }, { label: 'Fundamental', value: 'fundamental' }, { label: 'Médio', value: 'medio' }, { label: 'EJA', value: 'eja' }, { label: 'Superior', value: 'superior' }];

export default function NovaEscolaScreen() {
  const { adicionarEscola } = useEscolasStore();
  const [nome, setNome] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [endereco, setEndereco] = useState('');
  const [diretor, setDiretor] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [totalAlunos, setTotalAlunos] = useState('');
  const [totalProfessores, setTotalProfessores] = useState('');
  const [zona, setZona] = useState<ZonaEscola>('rural');
  const [niveis, setNiveis] = useState<NivelEnsino[]>([]);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const toggleNivel = (nivel: NivelEnsino) => setNiveis((prev) => prev.includes(nivel) ? prev.filter((n) => n !== nivel) : [...prev, nivel]);

  const handleSalvar = () => {
    if (!nome || !municipio || !diretor) { setErro('Preencha nome, município e diretor(a).'); return; }
    if (niveis.length === 0) { setErro('Selecione ao menos um nível de ensino.'); return; }
    adicionarEscola({ nome, municipio, endereco, diretor, telefone, email, zona, niveis, totalAlunos: parseInt(totalAlunos) || 0, totalProfessores: parseInt(totalProfessores) || 0, ativa: true });
    setSucesso(true);
    setTimeout(() => router.replace('/(tabs)/escolas/index'), 1500);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()}><MaterialCommunityIcons name="arrow-left" size={24} color={Colors.textInverse} /></TouchableOpacity>
        <Text style={styles.headerTitulo}>Nova Escola</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
        {sucesso && <View style={styles.sucessoBox}><MaterialCommunityIcons name="check-circle" size={24} color={Colors.success} /><Text style={styles.sucessoText}>Escola cadastrada com sucesso!</Text></View>}
        <Text style={styles.secaoTitulo}>Identificação</Text>
        <TextInput label="Nome da Escola *" value={nome} onChangeText={setNome} mode="outlined" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
        <TextInput label="Município *" value={municipio} onChangeText={setMunicipio} mode="outlined" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
        <TextInput label="Endereço" value={endereco} onChangeText={setEndereco} mode="outlined" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
        <TextInput label="Diretor(a) *" value={diretor} onChangeText={setDiretor} mode="outlined" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
        <TextInput label="Telefone" value={telefone} onChangeText={setTelefone} mode="outlined" keyboardType="phone-pad" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
        <TextInput label="E-mail" value={email} onChangeText={setEmail} mode="outlined" keyboardType="email-address" autoCapitalize="none" style={styles.input} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
        <Text style={styles.secaoTitulo}>Tipo de Zona</Text>
        <View style={styles.chipWrap}>{ZONAS.map((z) => <Chip key={z.value} selected={zona === z.value} onPress={() => setZona(z.value)} style={[styles.chip, zona === z.value && { backgroundColor: Colors.primary }]} textStyle={{ color: zona === z.value ? Colors.textInverse : Colors.text }}>{z.label}</Chip>)}</View>
        <Text style={styles.secaoTitulo}>Níveis de Ensino</Text>
        <View style={styles.chipWrap}>{NIVEIS.map((n) => <Chip key={n.value} selected={niveis.includes(n.value)} onPress={() => toggleNivel(n.value)} style={[styles.chip, niveis.includes(n.value) && { backgroundColor: Colors.primaryLight }]} textStyle={{ color: niveis.includes(n.value) ? Colors.textInverse : Colors.text }}>{n.label}</Chip>)}</View>
        <Text style={styles.secaoTitulo}>Números</Text>
        <View style={styles.rowInputs}>
          <TextInput label="Total de Alunos" value={totalAlunos} onChangeText={setTotalAlunos} mode="outlined" keyboardType="numeric" style={[styles.input, { flex: 1 }]} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
          <View style={{ width: Spacing.sm }} />
          <TextInput label="Total de Professores" value={totalProfessores} onChangeText={setTotalProfessores} mode="outlined" keyboardType="numeric" style={[styles.input, { flex: 1 }]} outlineColor={Colors.border} activeOutlineColor={Colors.primary} />
        </View>
        {erro ? <HelperText type="error">{erro}</HelperText> : null}
        <Button mode="contained" onPress={handleSalvar} style={styles.botao} contentStyle={styles.botaoContent} buttonColor={Colors.primary}>Cadastrar Escola</Button>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  headerBar: { backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  headerTitulo: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.textInverse },
  form: { padding: Spacing.lg },
  secaoTitulo: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text, marginTop: Spacing.lg, marginBottom: Spacing.md },
  input: { marginBottom: Spacing.md, backgroundColor: Colors.surface },
  rowInputs: { flexDirection: 'row' },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Spacing.sm },
  chip: { borderWidth: 1, borderColor: Colors.border, backgroundColor: Colors.surface },
  botao: { marginTop: Spacing.lg, borderRadius: 8 },
  botaoContent: { paddingVertical: 6 },
  sucessoBox: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: Colors.success + '15', padding: Spacing.md, borderRadius: 8, marginBottom: Spacing.lg },
  sucessoText: { fontSize: FontSize.md, color: Colors.success, fontWeight: '600' },
});
