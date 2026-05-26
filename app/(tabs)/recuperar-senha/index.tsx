import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RECUPERAR_URL = 'https://crec-maranhao.vercel.app/agentes/recuperar-senha';

export default function RecuperarSenhaScreen() {
  const abrirSite = () => {
    Linking.openURL(RECUPERAR_URL);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <MaterialCommunityIcons name="lock-reset" size={48} color="white" />
        <Text style={styles.headerTitulo}>Recuperar Senha</Text>
        <Text style={styles.headerSub}>Agente Territorial — CREC-MA</Text>
      </View>

      {/* Card principal */}
      <View style={styles.card}>
        <View style={styles.iconRow}>
          <MaterialCommunityIcons name="email-lock-outline" size={40} color="#2E7D32" />
        </View>

        <Text style={styles.titulo}>Esqueceu sua senha?</Text>
        <Text style={styles.descricao}>
          Para redefinir sua senha, você será direcionado ao portal do CREC-MA.
          Lá você informa seu e-mail e recebe um link de recuperação.
        </Text>

        <TouchableOpacity style={styles.botao} onPress={abrirSite} activeOpacity={0.85}>
          <MaterialCommunityIcons name="open-in-new" size={20} color="white" />
          <Text style={styles.botaoTexto}>Recuperar senha no portal</Text>
        </TouchableOpacity>
      </View>

      {/* Passos */}
      <View style={styles.passosBox}>
        <Text style={styles.passosTitulo}>Como funciona:</Text>
        {[
          { num: '1', texto: 'Clique no botão acima' },
          { num: '2', texto: 'Digite seu e-mail cadastrado' },
          { num: '3', texto: 'Receba o link no seu e-mail' },
          { num: '4', texto: 'Crie uma nova senha' },
        ].map((p) => (
          <View key={p.num} style={styles.passoRow}>
            <View style={styles.passoNum}>
              <Text style={styles.passoNumTexto}>{p.num}</Text>
            </View>
            <Text style={styles.passoTexto}>{p.texto}</Text>
          </View>
        ))}
      </View>

      {/* Aviso */}
      <View style={styles.avisoBox}>
        <MaterialCommunityIcons name="information-outline" size={18} color="#E65100" />
        <Text style={styles.avisoTexto}>
          Verifique também a pasta de <Text style={{ fontWeight: '800' }}>spam</Text> caso não receba o e-mail.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  content: { paddingBottom: 40 },
  header: {
    backgroundColor: '#2E7D32',
    padding: 40,
    alignItems: 'center',
    gap: 10,
  },
  headerTitulo: {
    color: 'white',
    fontSize: 22,
    fontWeight: '900',
  },
  headerSub: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
  },
  card: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  iconRow: {
    marginBottom: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '900',
    color: '#212121',
    marginBottom: 12,
    textAlign: 'center',
  },
  descricao: {
    fontSize: 14,
    color: '#616161',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 24,
  },
  botao: {
    backgroundColor: '#2E7D32',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  botaoTexto: {
    color: 'white',
    fontSize: 15,
    fontWeight: '800',
  },
  passosBox: {
    margin: 16,
    marginTop: 0,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2E7D32',
  },
  passosTitulo: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2E7D32',
    marginBottom: 12,
  },
  passoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  passoNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passoNumTexto: {
    color: 'white',
    fontWeight: '900',
    fontSize: 13,
  },
  passoTexto: {
    fontSize: 14,
    color: '#424242',
    fontWeight: '600',
  },
  avisoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginHorizontal: 16,
    backgroundColor: '#FFF3E0',
    borderRadius: 10,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#E65100',
  },
  avisoTexto: {
    flex: 1,
    fontSize: 13,
    color: '#424242',
    lineHeight: 20,
  },
});
