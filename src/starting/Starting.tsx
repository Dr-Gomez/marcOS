import './Starting.css';
import photoID from '../assets/starting/photoID.png';
import wallpaper from '../assets/starting/wallpaper.png';
import PasswordPrompt from './Password.tsx';
import { useEffect, useState } from 'react';

function Starting() {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

  const enterStart = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      setStarted(true);
      console.log('Code reached');
      document.removeEventListener('keydown', enterStart);
      document.removeEventListener('mousedown', handleStart);
    }
  };

  useEffect(() => {
    const startButton = document.getElementById('login');
    const passwordPrompt = document.getElementById('passwordPrompt');

    startButton?.addEventListener('mousedown', handleStart);
    passwordPrompt?.addEventListener('keydown', enterStart);

    return () => {
      startButton?.removeEventListener('mousedown', handleStart);
      passwordPrompt?.removeEventListener('keydown', enterStart);
    };
  });

  if (started) {
    return <></>;
  }

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
