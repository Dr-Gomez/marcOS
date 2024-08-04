import './Password.css';
import { useState } from 'react';
import keystroke from '../assets/comic-sound.mp3';
import shhhCharacters from '../assets/privateCharacters';

let newChar: string = '';
let lastChar: string = '';

function PasswordHandler() {
  const [inputValue, setInputValue] = useState('');
  const [ignoreNext, setIgnoreNext] = useState(false);

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    if (value.length < inputValue.length) {
      setInputValue(inputValue.slice(0, -1));
    } else if (ignoreNext && inputValue.length > 0) {
      setIgnoreNext(false);
    } else {
      while (lastChar === newChar) {
        newChar =
          shhhCharacters[Math.floor(Math.random() * shhhCharacters.length)];
      }
      const keySound: HTMLAudioElement = new Audio(keystroke);
      keySound.currentTime = 0.2;
      keySound.play();
      setInputValue(value.slice(0, -1) + newChar);
      lastChar = newChar;
    }
  };

  return (
    <input
      type="text"
      placeholder="Enter a password!"
      className="passwordPrompt"
      id="passwordPrompt"
      value={inputValue}
      onChange={handleTyping}
    />
  );
}

export default PasswordHandler;
