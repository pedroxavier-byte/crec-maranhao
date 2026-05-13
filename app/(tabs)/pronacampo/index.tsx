import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNoticiasStore } from '../../../store/useNoticiasStore';

const COR = '#1B5E20';
const COR_CLARO = '#E8F5E9';
const COR_MEDIO = '#2E7D32';

const EIXOS = [
  {
    num: '1',
    titulo: 'Gestão e Práticas Pedagógicas',
    cor: '#1565C0',
    icone: 'book-education-outline' as const,
    acoes: [
      'Calendário escolar diferenciado (ciclos agrícolas)',
      'Material didático contextualizado — PNLD Campo e Indígena',
      'Apoio às escolas multisseriadas',
      'Diretrizes Operacionais para Escolas do Campo',
      'Pedagogia da Alternância (CEFFAs e CFRs)',
    ],
  },
  {
    num: '2',
    titulo: 'Formação de Professores',
    cor: '#6A1B9A',
    icone: 'account-school-outline' as const,
    acoes: [
      'PROCAMPO — Licenciatura em Educação do Campo (UFMA, UEMA)',
      'Escola da Terra — Classes multisseriadas',
      'PARFOR — Formação de professores leigos',
      'Especialização em Pedagogia da Alternância',
      'Formação continuada em educação indígena e quilombola',
    ],
  },
  {
    num: '3',
    titulo: 'EJA e Educação Profissional',
    cor: '#E65100',
    icone: 'school-outline' as const,
    acoes: [
      'PRONERA — Educação na Reforma Agrária (assentados)',
      'EJA integrada à formação profissional no campo',
      'Alfabetização de jovens e adultos camponeses',
      'Formação técnica para agricultores familiares',
      'PRONATEC Campo — cursos técnicos no campo',
    ],
  },
  {
    num: '4',
    titulo: 'Infraestrutura',
    cor: '#BF360C',
    icone: 'domain' as const,
    acoes: [
      'PDDE Campo — Manutenção e melhoria das escolas',
      'PDDE Água e Esgoto nas escolas',
      'Construção e reforma de escolas do campo',
      'Energia elétrica e internet para escolas rurais',
      'Transporte escolar — PNATE',
    ],
  },
];

const PROGRAMAS = [
  { nome: 'PROCAMPO', desc: 'Licenciatura em Educação do Campo nas universidades federais e estaduais', icone: '🎓' },
  { nome: 'Escola da Terra', desc: 'Formação de professores de classes multisseriadas quilombolas e do campo', icone: '🌱' },
  { nome: 'PRONERA', desc: 'Educação para jovens e adultos assentados da reforma agrária', icone: '🏡' },
  { nome: 'PNLD Campo', desc: 'Livros didáticos específicos para escolas do campo e quilombolas', icone: '📚' },
  { nome: 'PNLD Indígena', desc: 'Material didático em línguas indígenas para escolas indígenas', icone: '🪶' },
  { nome: 'PDDE Campo', desc: 'Recursos para manutenção e melhoria das escolas do campo', icone: '🏗️' },
  { nome: 'PNATE', desc: 'Programa Nacional de Apoio ao Transporte do Escolar rural', icone: '🚌' },
  { nome: 'PARFOR', desc: 'Formação inicial de professores em exercício sem graduação', icone: '👩‍🏫' },
];

export default function PronacampoScreen() {
  const [abaAtiva, setAbaAtiva] = useState<'info' | 'eixos' | 'programas' | 'noticias'>('info');
  const { noticias } = useNoticiasStore();
  const noticiasPronacampo = noticias.filter(n =>
    n.tags?.some(t => t.toLowerCase().includes('pronacampo'))
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerIcone}>
          <MaterialCommunityIcons name="sprout" size={36} color="white" />
        </View>
        <Text style={styles.headerTitulo}>Novo PRONACAMPO</Text>
        <Text style={styles.headerSub}>
          Política Nacional de Educação do Campo, das Águas e das Florestas
        </Text>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeTexto}>Portaria MEC nº 538/2025</Text>
        </View>
      </View>

      {/* ABAS */}
      <View style={styles.abas}>
        {[
          { id: 'info', label: 'O Programa' },
          { id: 'eixos', label: 'Eixos' },
          { id: 'programas', label: 'Ações' },
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

        {/* ABA: O PROGRAMA */}
        {abaAtiva === 'info' && (
          <View>
            <View style={styles.card}>
              <Text style={styles.cardTitulo}>🌿 O que é o Novo PRONACAMPO?</Text>
              <Text style={styles.cardTexto}>
                O <Text style={styles.negrito}>Programa Nacional de Educação do Campo, das Águas e das Florestas</Text> — Novo PRONACAMPO — é a principal política pública federal de educação para as populações que vivem e trabalham no campo, nas águas e nas florestas do Brasil.
              </Text>
              <Text style={[styles.cardTexto, { marginTop: 10 }]}>
                Instituído pela <Text style={styles.negrito}>Portaria MEC nº 538, de 24 de julho de 2025</Text>, o programa resgata e amplia o PRONACAMPO original (2013), incorporando comunidades ribeirinhas, pescadores artesanais, extrativistas e povos das florestas.
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitulo}>👥 Quem são os sujeitos do programa?</Text>
              {[
                { emoji: '🚜', label: 'Agricultores familiares e assentados da reforma agrária' },
                { emoji: '⭐', label: 'Comunidades quilombolas' },
                { emoji: '🪶', label: 'Povos indígenas' },
                { emoji: '🌊', label: 'Ribeirinhos e pescadores artesanais' },
                { emoji: '🌿', label: 'Extrativistas e povos das florestas' },
                { emoji: '🏡', label: 'Acampados e assentados de reforma agrária' },
              ].map((item, i) => (
                <View key={i} style={styles.itemLista}>
                  <Text style={styles.itemEmoji}>{item.emoji}</Text>
                  <Text style={styles.itemTexto}>{item.label}</Text>
                </View>
              ))}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitulo}>📅 Histórico</Text>
              {[
                { ano: '2010', texto: 'Decreto 7.352 institui a Política de Educação do Campo e o PRONERA' },
                { ano: '2013', texto: 'Portaria MEC nº 86 cria o PRONACAMPO com 4 eixos' },
                { ano: '2019–22', texto: 'Desmonte das políticas de Educação do Campo' },
                { ano: '2023', texto: 'Retomada e reconstrução das políticas no governo Lula' },
                { ano: '2025', texto: 'Portaria MEC nº 538 institui o Novo PRONACAMPO ampliado' },
              ].map((item, i) => (
                <View key={i} style={styles.timeline}>
                  <View style={styles.timelineAno}>
                    <Text style={styles.timelineAnoTexto}>{item.ano}</Text>
                  </View>
                  <Text style={styles.timelineTexto}>{item.texto}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.btnLegislacao}
              onPress={() => Linking.openURL('https://www.in.gov.br')}
            >
              <MaterialCommunityIcons name="gavel" size={18} color="white" />
              <Text style={styles.btnTexto}>Ver Legislação Completa</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ABA: EIXOS */}
        {abaAtiva === 'eixos' && (
          <View>
            <Text style={styles.secaoDesc}>
              O Novo PRONACAMPO está estruturado em <Text style={styles.negrito}>4 eixos</Text> que organizam as ações e investimentos da política:
            </Text>
            {EIXOS.map(eixo => (
              <View key={eixo.num} style={[styles.eixoCard, { borderLeftColor: eixo.cor }]}>
                <View style={[styles.eixoHeader, { backgroundColor: eixo.cor + '15' }]}>
                  <View style={[styles.eixoNum, { backgroundColor: eixo.cor }]}>
                    <Text style={styles.eixoNumTexto}>{eixo.num}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.eixoTitulo, { color: eixo.cor }]}>{eixo.titulo}</Text>
                  </View>
                  <MaterialCommunityIcons name={eixo.icone} size={28} color={eixo.cor} />
                </View>
                <View style={styles.eixoBody}>
                  {eixo.acoes.map((acao, i) => (
                    <View key={i} style={styles.acaoItem}>
                      <View style={[styles.acaoBullet, { backgroundColor: eixo.cor }]} />
                      <Text style={styles.acaoTexto}>{acao}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* ABA: PROGRAMAS */}
        {abaAtiva === 'programas' && (
          <View>
            <Text style={styles.secaoDesc}>
              Ações e programas que compõem o Novo PRONACAMPO:
            </Text>
            {PROGRAMAS.map((prog, i) => (
              <View key={i} style={styles.progCard}>
                <Text style={styles.progEmoji}>{prog.icone}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.progNome}>{prog.nome}</Text>
                  <Text style={styles.progDesc}>{prog.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* ABA: NOTÍCIAS */}
        {abaAtiva === 'noticias' && (
          <View>
            {noticiasPronacampo.length === 0 ? (
              <Text style={styles.semDados}>Nenhuma notícia encontrada sobre o PRONACAMPO.</Text>
            ) : (
              noticiasPronacampo.map(n => (
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
  headerTitulo: { fontSize: 22, fontWeight: '900', color: 'white', textAlign: 'center' },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginTop: 6, lineHeight: 18 },
  headerBadge: { marginTop: 12, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)' },
  headerBadgeTexto: { color: 'white', fontSize: 12, fontWeight: '700' },
  abas: { flexDirection: 'row', backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  aba: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 3, borderBottomColor: 'transparent' },
  abaAtiva: { borderBottomColor: COR },
  abaTexto: { fontSize: 12, fontWeight: '600', color: '#757575' },
  abaTextoAtivo: { color: COR, fontWeight: '800' },
  conteudo: { padding: 16 },
  card: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 16, elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4 },
  cardTitulo: { fontSize: 16, fontWeight: '800', color: COR, marginBottom: 12 },
  cardTexto: { fontSize: 14, color: '#424242', lineHeight: 21 },
  negrito: { fontWeight: '800', color: COR_MEDIO },
  itemLista: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 10 },
  itemEmoji: { fontSize: 20 },
  itemTexto: { fontSize: 14, color: '#424242', flex: 1, lineHeight: 20 },
  timeline: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, gap: 12 },
  timelineAno: { backgroundColor: COR_CLARO, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, minWidth: 52, alignItems: 'center' },
  timelineAnoTexto: { fontSize: 11, fontWeight: '800', color: COR },
  timelineTexto: { fontSize: 13, color: '#424242', flex: 1, lineHeight: 19 },
  btnLegislacao: { backgroundColor: COR, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 14, borderRadius: 10, marginBottom: 24 },
  btnTexto: { color: 'white', fontWeight: '800', fontSize: 15 },
  secaoDesc: { fontSize: 14, color: '#424242', lineHeight: 20, marginBottom: 16 },
  eixoCard: { backgroundColor: 'white', borderRadius: 12, marginBottom: 16, elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, borderLeftWidth: 4, overflow: 'hidden' },
  eixoHeader: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  eixoNum: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  eixoNumTexto: { color: 'white', fontWeight: '900', fontSize: 16 },
  eixoTitulo: { fontSize: 15, fontWeight: '800' },
  eixoBody: { padding: 14, paddingTop: 8 },
  acaoItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8, gap: 8 },
  acaoBullet: { width: 6, height: 6, borderRadius: 3, marginTop: 6, flexShrink: 0 },
  acaoTexto: { fontSize: 13, color: '#424242', flex: 1, lineHeight: 19 },
  progCard: { backgroundColor: 'white', borderRadius: 12, padding: 14, marginBottom: 12, flexDirection: 'row', alignItems: 'flex-start', gap: 14, elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4 },
  progEmoji: { fontSize: 28 },
  progNome: { fontSize: 15, fontWeight: '800', color: COR, marginBottom: 4 },
  progDesc: { fontSize: 13, color: '#616161', lineHeight: 18 },
  noticiaCard: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4 },
  noticiaTipo: { fontSize: 10, fontWeight: '800', color: COR_MEDIO, backgroundColor: COR_CLARO, alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, marginBottom: 8 },
  noticiaTitulo: { fontSize: 15, fontWeight: '800', color: '#212121', marginBottom: 6, lineHeight: 21 },
  noticiaResumo: { fontSize: 13, color: '#616161', lineHeight: 18, marginBottom: 8 },
  noticiaData: { fontSize: 12, color: '#9E9E9E' },
  semDados: { textAlign: 'center', color: '#9E9E9E', marginTop: 40, fontSize: 14 },
});
