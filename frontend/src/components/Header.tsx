import JactoLogo from '../assets/grupo_jacto.png';
import '../styles/header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img
          src={JactoLogo}
          className="logo-img"
          alt="Logo da Jacto"
          style={{ width: '120px', height: 'auto' }}
        />
      </div>
      <p className="header-phrase">
        "Ninguém cresce sozinho" - Shunji Nishimura
      </p>
    </header>
  );
}

export default Header;