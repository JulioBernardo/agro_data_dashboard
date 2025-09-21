import JactoLogo from '../assets/grupo_jacto.png';

// Importa o arquivo CSS para estilizar o componente de cabeçalho.
// O estilo `.header` e `.logo-img` provavelmente estão definidos aqui.
import '../styles/header.css';

// Componente funcional 'Header' que renderiza o cabeçalho da página.
function Header() {
  // Retorna a estrutura JSX que compõe o cabeçalho.
  return (
    // 'header' é uma tag HTML semântica que representa o cabeçalho.
    // A classe CSS 'header' é aplicada para estilização.
    <header className="header">
      {/* Container para o logo, com a classe 'logo' para estilização. */}
      <div className="logo">
        {/* Elemento de imagem que exibe o logo. */}
        <img
          // 'src' define o caminho da imagem importada.
          src={JactoLogo}
          // 'className' aplica estilos CSS específicos para a imagem.
          className="logo-img"
          // 'alt' é um texto alternativo para acessibilidade e quando a imagem não carrega.
          alt="Logo da Jacto"
          // Estilos inline para definir a largura e altura da imagem.
          style={{ width: '120px', height: 'auto' }}
        />
      </div>
      {/* Um parágrafo para a frase do cabeçalho. */}
      <p className="header-phrase">
        {/* O texto da frase, incluindo aspas e a autoria. */}
        "Ninguém cresce sozinho" - Shunji Nishimura
      </p>
    </header>
  );
}

// Exporta o componente 'Header' para que ele possa ser importado e utilizado em outros arquivos.
export default Header;