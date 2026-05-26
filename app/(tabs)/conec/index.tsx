import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNoticiasStore } from '../../../store/useNoticiasStore';

const COR = '#01579B';
const COR_CLARO = '#E3F2FD';
const COR_MEDIO = '#0277BD';

const MEMBROS_PUBLICO = [
  { nome: 'SEDUC-MA', desc: 'Secretaria de Estado da Educação — Presidência do CONEC', icone: 'domain' as const },
  { nome: 'UFMA', desc: 'Universidade Federal do Maranhão', icone: 'school-outline' as const },
  { nome: 'UEMA', desc: 'Universidade Estadual do Maranhão', icone: 'school-outline' as const },
  { nome: 'IFMA', desc: 'Instituto Federal do Maranhão', icone: 'school-outline' as const },
  { nome: 'INCRA', desc: 'Instituto Nacional de Colonização e Reforma Agrária', icone: 'map-outline' as const },
  { nome: 'SAF', desc: 'Secretaria da Agricultura Familiar', icone: 'sprout' as const },
  { nome: 'AGERP', desc: 'Agência Estadual de Pesquisa Agropecuária e Extensão Rural', icone: 'leaf' as const },
  { nome: 'ITERMA', desc: 'Instituto de Terras do Maranhão', icone: 'terrain' as const },
];

const MEMBROS_CIVIL = [
  { nome: 'MST', desc: 'Movimento dos Trabalhadores Rurais Sem Terra', icone: 'account-group-outline' as const },
  { nome: 'UNDIME-MA', desc: 'União Nacional dos Dirigentes Municipais de Educação', icone: 'account-group-outline' as const },
  { nome: 'ACONERUQ', desc: 'Associação das Comunidades Negras Rurais Quilombolas do Maranhão', icone: 'account-group-outline' as const },
  { nome: 'ASSEMA', desc: 'Associação em Áreas de Assentamento no Estado do Maranhão', icone: 'account-group-outline' as const },
];

const COMPETENCIAS = [
  'Fortalecer as políticas públicas de Educação do Campo no Maranhão',
  'Construir a Lei Estadual de Educação do Campo',
  'Coordenar ações em todos os níveis e etapas educacionais',
  'Realizar bienalmente o Seminário Estadual de Educação do Campo',
  'Estimular metodologias diferenciadas nas escolas do campo',
  'Representar o Maranhão nos fóruns nacionais de Educação do Campo',
  'Estimular a criação de comissões municipais de Educação do Campo',
  'Articular as políticas federais (PRONACAMPO) com as ações estaduais',
];

const AGENDA = [
  { data: 'Janeiro 2024', evento: 'Reunião de Reativação do CONEC', local: 'Palácio dos Leões — São Luís', destaque: true },
  { data: 'Março 2024', evento: 'Aprovação do Plano de Trabalho 2024–2025', local: 'SEDUC-MA — São Luís', destaque: false },
  { data: '2025', evento: 'III Seminário Estadual de Educação do Campo (previsto)', local: 'Maranhão', destaque: false },
  { data: 'Maio 2007', evento: 'II Seminário — Institucionalização do CONEC', local: 'São Luís', destaque: false },
  { data: '2003', evento: 'I Seminário Estadual — Criação do CONEC', local: 'São Luís', destaque: false },
];

export default function ConecScreen() {
  const [abaAtiva, setAbaAtiva] = useState<'info' | 'membros' | 'agenda' | 'noticias'>('info');
  const { noticias } = useNoticiasStore();
  const noticiasConec = noticias.filter(n =>
    n.tags?.some(t => t.toLowerCase().includes('conec'))
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerIcone}>
          <MaterialCommunityIcons name="hand-heart-outline" size={36} color="white" />
        </View>
        <Text style={styles.headerTitulo}>Comitê-MA</Text>
        <Text style={styles.headerNome}>Comitê Executivo Estadual de{'\n'}Educação do Campo do Maranhão (CONEC)</Text>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeTexto}>Reativado em Janeiro de 2024</Text>
        </View>
        <View style={[styles.headerBadge, { marginTop: 6, backgroundColor: 'rgba(255,255,255,0.1)' }]}>
          <Text style={styles.headerBadgeTexto}>46 membros · Presidência: SEDUC-MA</Text>
        </View>
      </View>

      {/* ABAS */}
      <View style={styles.abas}>
        {[
          { id: 'info', label: 'O Comitê' },
          { id: 'membros', label: 'Membros' },
          { id: 'agenda', label: 'Agenda' },
          { id: 'noticias', label: 'Notícias' },
        ].map(aba => (
          <TouchableOpacity
            key={aba.id}
            style={[styles.aba, abaAtiva === aba.id && styles.abaAtiva]}
            onPress={() => setAbaAtiva(aba.id as any)}
          >
            <Text style={[styles.abaTexto, abaAtiva === aba.id && styles.abaTextoAtivo]}>
              {aba.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.conteudo}>

        {/* ABA: O COMITÊ */}
        {abaAtiva === 'info' && (
          <View>
            <View style={styles.card}>
              <Text style={styles.cardTitulo}>🏛️ O que é o CONEC?</Text>
              <Text style={styles.cardTexto}>
                O <Text style={styles.negrito}>Comitê Executivo Estadual de Educação do Campo do Maranhão (CONEC)</Text> é o principal espaço de articulação interinstitucional entre o poder público e a sociedade civil em defesa das políticas de Educação do Campo no estado.
              </Text>
              <Text style={[styles.cardTexto, { marginTop: 10 }]}>
                Criado em <Text style={styles.negrito}>2003</Text> e institucionalizado em <Text style={styles.negrito}>2007</Text>, o CONEC é presidido pela <Text style={styles.negrito}>SEDUC-MA</Text> e reúne 46 membros de 13 instituições públicas e organizações da sociedade civil.
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitulo}>📋 Competências</Text>
              {COMPETENCIAS.map((c, i) => (
                <View key={i} style={styles.itemLista}>
                  <View style={styles.bullet} />
                  <Text style={styles.itemTexto}>{c}</Text>
                </View>
              ))}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitulo}>📅 Histórico</Text>
              {[
                { ano: '2003', texto: 'Criação do CONEC no I Seminário Estadual de Educação do Campo' },
                { ano: '2007', texto: 'Institucionalização no II Seminário (maio de 2007)' },
                { ano: '2020', texto: 'Comitê entra em inatividade' },
                { ano: 'Jan 2024', texto: 'Reativação no Palácio dos Leões com 46 membros' },
                { ano: '2025', texto: 'III Seminário Estadual previsto e Lei Estadual em construção' },
              ].map((item, i) => (
                <View key={i} style={styles.timeline}>
                  <View style={styles.timelineAno}>
                    <Text style={styles.timelineAnoTexto}>{item.ano}</Text>
                  </View>
                  <Text style={styles.timelineTexto}>{item.texto}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ABA: MEMBROS */}
        {abaAtiva === 'membros' && (
          <View>
            <Text style={styles.secaoTitulo}>🏛️ Poder Público (13 instituições)</Text>
            {MEMBROS_PUBLICO.map((m, i) => (
              <View key={i} style={styles.membroCard}>
                <View style={[styles.membroIcone, { backgroundColor: COR }]}>
                  <MaterialCommunityIcons name={m.icone} size={20} color="white" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.membroNome}>{m.nome}</Text>
                  <Text style={styles.membroDesc}>{m.desc}</Text>
                </View>
              </View>
            ))}

            <Text style={[styles.secaoTitulo, { marginTop: 20 }]}>✊ Sociedade Civil</Text>
            {MEMBROS_CIVIL.map((m, i) => (
              <View key={i} style={styles.membroCard}>
                <View style={[styles.membroIcone, { backgroundColor: '#2E7D32' }]}>
                  <MaterialCommunityIcons name={m.icone} size={20} color="white" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.membroNome}>{m.nome}</Text>
                  <Text style={styles.membroDesc}>{m.desc}</Text>
                </View>
              </View>
            ))}

            <View style={[styles.card, { marginTop: 16, backgroundColor: COR_CLARO }]}>
              <Text style={[styles.cardTexto, { textAlign: 'center', color: COR_MEDIO, fontWeight: '700' }]}>
                Total: 46 membros (titulares e suplentes){'\n'}Coordenadora Executiva: Patrícia Carlos de Sousa
              </Text>
            </View>
          </View>
        )}

        {/* ABA: AGENDA */}
        {abaAtiva === 'agenda' && (
          <View>
            {AGENDA.map((item, i) => (
              <View key={i} style={[styles.agendaCard, item.destaque && { borderLeftColor: COR, borderLeftWidth: 4 }]}>
                <View style={[styles.agendaData, { backgroundColor: item.destaque ? COR : '#E0E0E0' }]}>
                  <Text style={[styles.agendaDataTexto, { color: item.destaque ? 'white' : '#616161' }]}>{item.data}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.agendaEvento}>{item.evento}</Text>
                  <View style={styles.agendaLocalRow}>
                    <MaterialCommunityIcons name="map-marker-outline" size={13} color="#9E9E9E" />
                    <Text style={styles.agendaLocal}>{item.local}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* ABA: NOTÍCIAS */}
        {abaAtiva === 'noticias' && (
          <View>
            {noticiasConec.length === 0 ? (
              <Text style={styles.semDados}>Nenhuma notícia encontrada sobre o CONEC.</Text>
            ) : (
              noticiasConec.map(n => (
                <View key={n.id} style={styles.noticiaCard}>
                  <Text style={styles.noticiaTipo}>{n.tipo.toUpperCase()}</Text>
                  <Text style={styles.noticiaTitulo}>{n.titulo}</Text>
                  <Text style={styles.noticiaResumo}>{n.resumo}</Text>
                  <Text style={styles.noticiaData}>
                    📅 {new Date(n.dataPublicacao).toLocaleDateString('pt-BR')}
                  </Text>
                </View>
              ))
            )}
          </View>
        )}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { backgroundColor: COR, padding: 24, paddingTop: 48, alignItems: 'center' },
  headerIcone: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 12, borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)' },
  headerTitulo: { fontSize: 28, fontWeight: '900', color: 'white' },
  headerNome: { fontSize: 13, color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginTop: 6, lineHeight: 18 },
  headerBadge: { marginTop: 10, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)' },
  headerBadgeTexto: { color: 'white', fontSize: 12, fontWeight: '700' },
  abas: { flexDirection: 'row', backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  aba: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 3, borderBottomColor: 'transparent' },
  abaAtiva: { borderBottomColor: COR },
  abaTexto: { fontSize: 11, fontWeight: '600', color: '#757575' },
  abaTextoAtivo: { color: COR, fontWeight: '800' },
  conteudo: { padding: 16 },
  card: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 16, elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4 },
  cardTitulo: { fontSize: 16, fontWeight: '800', color: COR, marginBottom: 12 },
  cardTexto: { fontSize: 14, color: '#424242', lineHeight: 21 },
  negrito: { fontWeight: '800', color: COR_MEDIO },
  itemLista: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, gap: 10 },
  bullet: { width: 7, height: 7, borderRadius: 4, backgroundColor: COR, marginTop: 7, flexShrink: 0 },
  itemTexto: { fontSize: 13, color: '#424242', flex: 1, lineHeight: 20 },
  timeline: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, gap: 12 },
  timelineAno: { backgroundColor: COR_CLARO, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, minWidth: 60, alignItems: 'center' },
  timelineAnoTexto: { fontSize: 11, fontWeight: '800', color: COR },
  timelineTexto: { fontSize: 13, color: '#424242', flex: 1, lineHeight: 19 },
  secaoTitulo: { fontSize: 15, fontWeight: '800', color: COR, marginBottom: 12 },
  membroCard: { backgroundColor: 'white', borderRadius: 10, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 14, elevation: 1, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 3 },
  membroIcone: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  membroNome: { fontSize: 14, fontWeight: '800', color: '#212121', marginBottom: 2 },
  membroDesc: { fontSize: 12, color: '#757575', lineHeight: 17 },
  agendaCard: { backgroundColor: 'white', borderRadius: 10, padding: 14, marginBottom: 10, flexDirection: 'row', gap: 12, elevation: 1, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 3 },
  agendaData: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6, alignSelf: 'flex-start', minWidth: 72, alignItems: 'center' },
  agendaDataTexto: { fontSize: 11, fontWeight: '800' },
  agendaEvento: { fontSize: 14, fontWeight: '700', color: '#212121', marginBottom: 4, lineHeight: 19 },
  agendaLocalRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  agendaLocal: { fontSize: 12, color: '#9E9E9E' },
  noticiaCard: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4 },
  noticiaTipo: { fontSize: 10, fontWeight: '800', color: COR_MEDIO, backgroundColor: COR_CLARO, alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, marginBottom: 8 },
  noticiaTitulo: { fontSize: 15, fontWeight: '800', color: '#212121', marginBottom: 6, lineHeight: 21 },
  noticiaResumo: { fontSize: 13, color: '#616161', lineHeight: 18, marginBottom: 8 },
  noticiaData: { fontSize: 12, color: '#9E9E9E' },
  semDados: { textAlign: 'center', color: '#9E9E9E', marginTop: 40, fontSize: 14 },
});
