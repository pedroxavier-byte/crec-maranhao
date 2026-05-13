import { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/useAuthStore';
import { Colors, Spacing, FontSize, BorderRadius } from '../../constants/Colors';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [erro, setErro] = useState('');
  const { login, loading } = useAuthStore();

  const handleLogin = async () => {
    setErro('');
    if (!email || !senha) { setErro('Preencha e-mail e senha.'); return; }
    const res = await login(email.trim(), senha);
    if (res.ok) router.replace('/(tabs)');
    else setErro(res.mensagem);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          <View style={styles.header}>
            <View style={styles.logoWrap}>
              <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.titulo}>Centro de Referência de Educação do Campo, das Águas e das Florestas do Maranhão</Text>
            <View style={styles.sloganWrap}>
              <Text style={styles.slogan}>Política Nacional de Educação do Campo, das Águas e das Florestas</Text>
            </View>
          </View>

          <View style={styles.form}>
            <Text style={styles.formTitulo}>Entrar na plataforma</Text>
            <Text style={styles.formSub}>Use suas credenciais de acesso</Text>

            <TextInput
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              left={<TextInput.Icon icon="email-outline" />}
              style={styles.input}
              outlineColor={Colors.border}
              activeOutlineColor={Colors.primary}
            />
            <TextInput
              label="Senha"
              value={senha}
              onChangeText={setSenha}
              mode="outlined"
              secureTextEntry={!senhaVisivel}
              left={<TextInput.Icon icon="lock-outline" />}
              right={<TextInput.Icon icon={senhaVisivel ? 'eye-off' : 'eye'} onPress={() => setSenhaVisivel(!senhaVisivel)} />}
              style={styles.input}
              outlineColor={Colors.border}
              activeOutlineColor={Colors.primary}
            />

            {erro ? <HelperText type="error">{erro}</HelperText> : null}

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={styles.botaoEntrar}
              contentStyle={styles.botaoContent}
              buttonColor={Colors.primary}
            >
              Entrar
            </Button>

            <Button
              mode="outlined"
              onPress={() => router.push('/(auth)/register')}
              style={styles.botaoCadastro}
              textColor={Colors.primary}
            >
              Não tem conta? Cadastre-se
            </Button>

            <View style={styles.adminDica}>
              <Text style={styles.adminDicaTexto}>Admin: admin@crec.ma.gov.br / crec2025</Text>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.primary },
  scroll: { flexGrow: 1 },
  header: { alignItems: 'center', paddingTop: Spacing.xl, paddingBottom: Spacing.lg, paddingHorizontal: Spacing.lg },
  logoWrap: { width: 180, height: 180, borderRadius: 90, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.lg, borderWidth: 3, borderColor: 'rgba(255,255,255,0.3)' },
  logo: { width: 165, height: 165, borderRadius: 82 },
  titulo: { fontSize: FontSize.md, fontWeight: '800', color: Colors.textInverse, textAlign: 'center', lineHeight: 22, marginBottom: Spacing.md },
  sloganWrap: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: BorderRadius.md, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  slogan: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.95)', textAlign: 'center', fontStyle: 'italic', lineHeight: 20 },
  form: { backgroundColor: Colors.background, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: Spacing.xl, paddingTop: Spacing.xxl, minHeight: 420 },
  formTitulo: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.text, marginBottom: 4 },
  formSub: { fontSize: FontSize.sm, color: Colors.textLight, marginBottom: Spacing.lg },
  input: { marginBottom: Spacing.md, backgroundColor: Colors.surface },
  botaoEntrar: { marginTop: Spacing.sm, borderRadius: 8 },
  botaoContent: { paddingVertical: 6 },
  botaoCadastro: { marginTop: Spacing.sm, borderRadius: 8, borderColor: Colors.primary },
  adminDica: { marginTop: Spacing.lg, padding: Spacing.sm, backgroundColor: Colors.border + '40', borderRadius: BorderRadius.sm },
  adminDicaTexto: { fontSize: FontSize.xs, color: Colors.textLight, textAlign: 'center' },
});
