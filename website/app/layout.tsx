import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CREC-MA — Centro de Referência de Educação do Campo do Maranhão',
  description: 'Política Nacional de Educação do Campo, das Águas e das Florestas do Maranhão. Acesse escolas, biblioteca, notícias e legislação.',
  keywords: 'educação do campo, maranhão, quilombola, indígena, CREC, FOPEC',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <script dangerouslySetInnerHTML={{ __html: `
          function toggleMenu() {
            document.getElementById('mobileMenu').classList.toggle('aberto');
          }
          document.addEventListener('DOMContentLoaded', function() {
            var btn = document.querySelector('.hamburger');
            if (btn) btn.addEventListener('click', toggleMenu);
          });
        `}} />
      </body>
    </html>
  );
}

function Header() {
  const links = [
    { href: '/', label: 'Início' },
    { href: '/escolas', label: 'Escolas' },
    { href: '/biblioteca', label: 'Biblioteca' },
    { href: '/noticias', label: 'Notícias' },
    { href: '/fopec', label: 'FOPEC-MA' },
    { href: '/pronacampo', label: 'PRONACAMPO' },
    { href: '/conec', label: 'CONEC' },
    { href: '/legislacao', label: 'Legislação' },
    { href: '/agentes', label: '🗺️ Agentes' },
  ];
  return (
    <>
      <header className="header">
        <div className="header-inner">
          <a href="/" className="header-logo">
            <img src="/logo.png" alt="CREC-MA" className="header-logo-img" />
            <div className="header-logo-text">
              <div className="header-logo-sigla">CREC-MA</div>
              <div className="header-logo-nome">Educação do Campo</div>
            </div>
          </a>
          <nav className="header-nav">
            {links.map(l => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <button className="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
        </div>
      </header>
      <div id="mobileMenu" className="mobile-menu">
        {links.map(l => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-titulo">CREC-MA</div>
          <p className="footer-texto">
            Centro de Referência de Educação do Campo, das Águas e das Florestas do Maranhão.<br />
            Política Nacional de Educação do Campo, das Águas e das Florestas.
          </p>
          <p className="footer-texto" style={{ marginTop: 14 }}>📧 crec@educacao.ma.gov.br</p>
        </div>
        <div>
          <div className="footer-titulo">Navegação</div>
          <div className="footer-links">
            <a href="/escolas">Escolas</a>
            <a href="/biblioteca">Biblioteca</a>
            <a href="/noticias">Notícias</a>
            <a href="/fopec">FOPEC-MA</a>
            <a href="/legislacao">Legislação</a>
          </div>
        </div>
        <div>
          <div className="footer-titulo">Parceiros</div>
          <div className="footer-links">
            <a href="https://www.educacao.ma.gov.br" target="_blank">SEDUC-MA</a>
            <a href="https://portais.ufma.br" target="_blank">UFMA</a>
            <a href="https://www.uema.br" target="_blank">UEMA</a>
            <a href="https://www.ifma.edu.br" target="_blank">IFMA</a>
            <a href="https://fonec.org" target="_blank">FONEC</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CREC-MA · Maranhão · Todos os direitos reservados</p>
      </div>
    </footer>
  );
}
