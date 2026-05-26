const AGENTES = [
  {
    ure: 'Açailândia',
    municipios: ['Açailândia', 'Bom Jesus das Selvas', 'Buriticupu', 'Cidelândia', 'Itinga do Maranhão', 'São Francisco do Brejão', 'São Pedro da Água Branca', 'Vila Nova dos Martírios'],
    agentes: ['Eliane Almeida Diniz', 'Marcos Antônio Alves da Silva'],
  },
  {
    ure: 'Bacabal',
    municipios: ['Altamira do Maranhão', 'Bacabal', 'Bom Lugar', 'Brejo de Areia', 'Conceição do Lago-Açu', 'Lago Verde', 'Marajá do Sena', 'Olho d\'Água das Cunhãs', 'Paulo Ramos', 'São Luís Gonzaga do Maranhão', 'Vitorino Freire'],
    agentes: ['Saara Silva da Silva', 'Jose de Ribamar Souza Vieira'],
  },
  {
    ure: 'Balsas',
    municipios: ['Alto Parnaíba', 'Balsas', 'Carolina', 'Feira Nova do Maranhão', 'Formosa da Serra Negra', 'Fortaleza dos Nogueiras', 'Loreto', 'Nova Colinas', 'Riachão', 'Sambaíba', 'São Félix de Balsas', 'São Pedro dos Crentes', 'São Raimundo das Mangabeiras', 'Tasso Fragoso'],
    agentes: ['Eliane Maria Pereira'],
  },
  {
    ure: 'Barra do Corda',
    municipios: ['Arame', 'Barra do Corda', 'Fernando Falcão', 'Grajaú', 'Itaipava do Grajaú', 'Jenipapo dos Vieiras', 'São Raimundo do Doca Bezerra', 'São Roberto'],
    agentes: ['Makson de Sousa Santos', 'Gisele da Silva'],
  },
  {
    ure: 'Caxias',
    municipios: ['Afonso Cunha', 'Aldeias Altas', 'Caxias', 'Coelho Neto', 'Duque Bacelar', 'São João do Sóter'],
    agentes: ['Sergio Boaventura Carvalho', 'Francisca Caroline Teixeira da Silva'],
  },
  {
    ure: 'Chapadinha',
    municipios: ['Água Doce do Maranhão', 'Anapurus', 'Araioses', 'Brejo', 'Buriti', 'Chapadinha', 'Magalhães de Almeida', 'Mata Roma', 'Milagres do Maranhão', 'Paulino Neves', 'Santa Quitéria do Maranhão', 'Santana do Maranhão', 'São Bernardo', 'Tutóia'],
    agentes: ['Maria Amanda Coelho da Cruz', 'Douglas Leão da Silva'],
  },
  {
    ure: 'Codó',
    municipios: ['Alto Alegre do Maranhão', 'Codó', 'Coroatá', 'Peritoró', 'São Mateus do Maranhão', 'Timbiras'],
    agentes: ['Ozemias Cavalcante Lima', 'Joyciara Alvim Muniz'],
  },
  {
    ure: 'Imperatriz',
    municipios: ['Amarante do Maranhão', 'Buritirana', 'Campestre do Maranhão', 'Davinópolis', 'Estreito', 'Governador Edison Lobão', 'Imperatriz', 'João Lisboa', 'Lajeado Novo', 'Montes Altos', 'Porto Franco', 'Ribamar Fiquene', 'São João do Paraíso', 'Senador La Rocque'],
    agentes: ['Mikaellen S. Silva', 'Glaucia dos Reis Moura Fernandes'],
  },
  {
    ure: 'Itapecuru Mirim',
    municipios: ['Anajatuba', 'Belágua', 'Cantanhede', 'Itapecuru Mirim', 'Matões do Norte', 'Miranda do Norte', 'Nina Rodrigues', 'Pirapemas', 'Presidente Vargas', 'São Benedito do Rio Preto', 'Urbano Santos', 'Vargem Grande'],
    agentes: ['José de Ribamar Nascimento Filho', 'José Carlos da Silva Fernandes'],
  },
  {
    ure: 'Pedreiras',
    municipios: ['Bernardo do Mearim', 'Esperantinópolis', 'Igarapé Grande', 'Lima Campos', 'Pedreiras', 'Poção de Pedras', 'Trizidela do Vale'],
    agentes: ['Luís Santos Vieira Neto'],
  },
  {
    ure: 'Pinheiro',
    municipios: ['Apicum-Açu', 'Bacuri', 'Bequimão', 'Cedral', 'Central do Maranhão', 'Cururupu', 'Guimarães', 'Mirinzal', 'Palmeirândia', 'Pedro do Rosário', 'Peri Mirim', 'Pinheiro', 'Porto Rico do Maranhão', 'Presidente Sarney', 'Santa Helena', 'Serrano do Maranhão', 'Turiaçu', 'Turilândia'],
    agentes: ['Josiane Santos da Silva', 'Mayara Regina Lisboa F. Bentes', 'João Batista Gomes da Silva'],
  },
  {
    ure: 'Presidente Dutra',
    municipios: ['Capinzal do Norte', 'Dom Pedro', 'Fortuna', 'Gonçalves Dias', 'Governador Archer', 'Governador Eugênio Barros', 'Governador Luís Rocha', 'Graça Aranha', 'Joselândia', 'Presidente Dutra', 'Santa Filomena do Maranhão', 'Santo Antônio dos Lopes', 'São Domingos do Maranhão', 'São José dos Basílios', 'Senador Alexandre Costa', 'Tuntum'],
    agentes: ['Dhelbson Relwlety das Chagas Pereira', 'Antônia Mayra Nascimento da Silva'],
  },
  {
    ure: 'Rosário',
    municipios: ['Axixá', 'Bacabeira', 'Barreirinhas', 'Cachoeira Grande', 'Humberto de Campos', 'Icatu', 'Morros', 'Presidente Juscelino', 'Primeira Cruz', 'Rosário', 'Santa Rita', 'Santo Amaro do Maranhão'],
    agentes: ['Maria do Socorro Viana Pereira', 'Ivanildo Carvalho Rodrigues', 'Luzilene dos Santos Sousa'],
  },
  {
    ure: 'São João dos Patos',
    municipios: ['Barão de Grajaú', 'Benedito Leite', 'Buriti Bravo', 'Colinas', 'Jatobá', 'Lagoa do Mato', 'Mirador', 'Nova Iorque', 'Paraibano', 'Passagem Franca', 'Pastos Bons', 'São Domingos do Azeitão', 'São João dos Patos', 'Sucupira do Norte', 'Sucupira do Riachão'],
    agentes: ['Felix Ferreira Sandes', 'Kerollaynne da Silva Sá'],
  },
  {
    ure: 'Santa Inês',
    municipios: ['Alto Alegre do Pindaré', 'Bela Vista do Maranhão', 'Bom Jardim', 'Igarapé do Meio', 'Monção', 'Pindaré-Mirim', 'Pio XII', 'Santa Inês', 'Santa Luzia', 'Satubinha', 'São João do Carú', 'Tufilândia'],
    agentes: ['Leide Daiana Teixeira Barros', 'Leonardo Lisboa Sousa', 'Francisca Raquel Ramos dos Santos'],
  },
  {
    ure: 'Timon',
    municipios: ['Matões', 'Parnarama', 'São Francisco do Maranhão', 'Timon'],
    agentes: ['Lindete Martins Santos', 'Jeane Ferreira Aires'],
  },
  {
    ure: 'Viana',
    municipios: ['Arari', 'Bacurituba', 'Cajapió', 'Cajari', 'Matinha', 'Olinda Nova do Maranhão', 'Penalva', 'São Bento', 'São João Batista', 'São Vicente Ferrer', 'Viana', 'Vitória do Mearim'],
    agentes: ['Raimundo Nonato dos Santos Moraes', 'José Maria Mendonça'],
  },
  {
    ure: 'Zé Doca',
    municipios: ['Amapá do Maranhão', 'Araguanã', 'Boa Vista do Gurupi', 'Cândido Mendes', 'Carutapera', 'Centro do Guilherme', 'Centro Novo do Maranhão', 'Godofredo Viana', 'Governador Newton Bello', 'Governador Nunes Freire', 'Junco do Maranhão', 'Luís Domingues', 'Maracaçumé', 'Maranhãozinho', 'Nova Olinda do Maranhão', 'Presidente Médici', 'Santa Luzia do Paruá', 'Zé Doca'],
    agentes: ['Francisco de Assis Costa', 'Maria Francisca dos Anjos Silva', 'Maria Elizabete da Silva e Silva'],
  },
  {
    ure: 'São Luís',
    municipios: ['Alcântara', 'Paço do Lumiar', 'Raposa', 'São José de Ribamar', 'São Luís'],
    agentes: ['Cristiane Mendes do Nascimento', 'Cristiane Rego Pinheiro', 'Soraia França Weba dos Santos'],
  },
  {
    ure: 'Lago da Pedra',
    municipios: ['Lago da Pedra', 'Lago do Junco', 'Lago dos Rodrigues', 'Lagoa Grande do Maranhão', 'Marajá do Sena', 'Paulo Ramos'],
    agentes: ['Raul de Jesus Santos', 'Rafael Lima Nascimento'],
  },
];

const totalAgentes = AGENTES.reduce((acc, u) => acc + u.agentes.length, 0);
const totalMunicipios = AGENTES.reduce((acc, u) => acc + u.municipios.length, 0);

export default function AgentesTerritoriaísPage() {
  return (
    <>
      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 60%, #388E3C 100%)', padding: '48px 24px', textAlign: 'center', color: 'white' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🗺️</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>Agentes de Governança Territorial</h1>
        <p style={{ fontSize: 15, opacity: 0.9, marginBottom: 20 }}>
          Política Nacional de Educação do Campo — Novo PRONACAMPO · SEDUC-MA
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 20, padding: '6px 20px', fontSize: 14, fontWeight: 700 }}>
            👤 {totalAgentes} agentes selecionados
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 20, padding: '6px 20px', fontSize: 14, fontWeight: 700 }}>
            📍 {totalMunicipios} municípios atendidos
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 20, padding: '6px 20px', fontSize: 14, fontWeight: 700 }}>
            🏫 20 UREs
          </div>
        </div>
      </div>

      {/* INFO */}
      <div style={{ background: '#E8F5E9', padding: '14px 32px', borderBottom: '1px solid #C8E6C9' }}>
        <p style={{ fontSize: 13, color: '#2E7D32', fontWeight: 600, textAlign: 'center', margin: 0 }}>
          📋 Resultado da seleção — Portaria MEC nº 538/2025 · Agente Estadual: Jocenilson M. Costa (Matrícula nº 00098271-03)
        </p>
      </div>

      {/* LISTA */}
      <div className="content-area" style={{ maxWidth: 1100 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {AGENTES.map((ure, i) => (
            <div key={i} className="card" style={{ borderLeft: '5px solid #2E7D32' }}>
              <div className="card-body">
                {/* Cabeçalho URE */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ background: '#2E7D32', color: 'white', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, flexShrink: 0 }}>
                    {i + 1}
                  </span>
                  <h3 style={{ fontSize: 17, fontWeight: 900, color: '#1B5E20', margin: 0 }}>
                    URE {ure.ure}
                  </h3>
                </div>

                {/* Municípios */}
                <div style={{ marginBottom: 12, padding: '8px 12px', background: '#F1F8E9', borderRadius: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#558B2F', marginRight: 6 }}>📍 Municípios:</span>
                  <span style={{ fontSize: 13, color: '#424242', lineHeight: 1.6 }}>
                    {ure.municipios.join(', ')}
                  </span>
                </div>

                {/* Agentes */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {ure.agentes.map((nome, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: '#E8F5E9', border: '1px solid #A5D6A7', borderRadius: 20, fontSize: 13, color: '#1B5E20', fontWeight: 700 }}>
                      👤 {nome}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, padding: 20, background: '#E3F2FD', borderRadius: 12, borderLeft: '4px solid #01579B', textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: '#01579B', fontWeight: 600, margin: 0 }}>
            🏛️ Seleção coordenada pela SEDUC-MA em observância à Portaria MEC nº 538, de 24 de julho de 2025,<br />
            que institui a Política Nacional de Educação do Campo, das Águas e das Florestas — Novo PRONACAMPO.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, marginBottom: 16 }}>
          <a href="/agentes" style={{ color: 'var(--verde)', fontWeight: 700, fontSize: 14 }}>← Voltar ao Portal dos Agentes</a>
        </div>
      </div>
    </>
  );
}
