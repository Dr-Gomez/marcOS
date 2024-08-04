import './Starting.css';
import photoID from '../assets/starting/photoID.png';
import wallpaper from '../assets/starting/wallpaper.png';
import PasswordPrompt from './Password.tsx';

function Starting() {
  function start(e: KeyboardEventInit) {
    if (e.key === 'Enter') {
      console.log('Enter pressed');
      document.removeEventListener('keydown', start);
    }
  }
  document.addEventListener('keydown', start);

  return (
    <>
      <img src={photoID} className="photoID" id="photoID" />
      <img src={wallpaper} className="wallpaper" id="wallpaper" />
      <h1 className="username" id="username">
        Marco A. Gomez
      </h1>
      <PasswordPrompt />
      <button className="login" id="login">
        <h1>GO</h1>
      </button>
      <h2 className="passwordHint" id="passwordHint">
        Password Hint: Type Anything!
      </h2>
    </>
  );
}

export default Starting;
