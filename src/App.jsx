import { useEffect, useState } from 'react'
import './App.css'

const WORDSLIST = [
  "APPLE", "PEARL", "CANDY", "DIRTY", "HELLO", "BREAD", "TOAST", "SHORT", "GHOST", "QUERY", "EXIST", "UNITE", "WORTH", "PIGGY", "BRAWL", "COUCH", "YUMMY", "SMILE", "QUITE", "MAYBE", "PAUSE", "STAND", "DRINK", "CAUSE", "SLEEP"
];

const generateDefaultWords = () => {
  return Array(5).fill({ char: "", val: -1 });
};

const startNewGame = () => {
  return WORDSLIST[Math.floor(Math.random() * WORDSLIST.length)];
};

var ANSWER = startNewGame();

function App() {
  const [words, setWords] = useState(generateDefaultWords());
  const [check, setCheck] = useState(0);
  // const [done, setDone] = useState(0);

  useEffect(() => {
    let count = -1;

    function handleKeyDown(e) {
      if (e.key.match(/^[a-z]$/i)) {
        if (count < 4) {
          count += 1;
          setWords(prev => {
            const test = count == 0 ? generateDefaultWords() : [...prev];
            test[count] = {char: e.key.toUpperCase(), val: 0};
            return test;
          });
        }
      } else if (e.key == "Enter") {
        if (count == 4) {
          const ans = ANSWER.split("");
          setWords(prev => {
            return [...prev].map((word, i) => {
              if (word.char === ans[i]) {
                word.val = 3;
              } else if (ans.indexOf(word.char) > -1) {
                word.val = 2;
              } else {
                word.val = 1;
              }
              return word;
            })
          });
          count = -1;
          setCheck((prev) => (prev + 1));
        }
      } else if (e.key == "Backspace") {
        if (count > -1) {
          setWords(prev => {
            const test = [...prev];
            test[count+1] = {char: "", val: -1};
            return test;
          });
          count -= 1;
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
  }, []);

  function reset() {
    ANSWER = startNewGame();
    setWords(generateDefaultWords());
    setCheck(0);
    count = -1;
    // document.getElementById("show").checked = false;
  }

  return (
    <div className={
      words.every(word => word.val == 3) ? "App yeah" : "App"}>
      <h1>Hello Wordle!</h1>
      <div className="boxs">
        {words.map((word) => (
        <div className={
          word.val == -1 || word.val == 0 ? "box" : 
          word.val == 1 ? "box exclude" :
          word.val == 2 ? "box include" : "box correct"}>
        {word.char}
        </div>))}
      </div>
      <div className="btn">TIMES: {Math.floor(check/2)}</div>
      <button className="btn reset" onClick={reset}>NEW GAME</button>
      <input type="checkbox" id="show" />
      <label for="show" className="btn answer"><p>ANSWER</p></label>
      <div className="show-ans">{ANSWER}</div>
      {/* <div className="checkboxs">
        {check.map((word) => (
        <div className={
          word.val == 0 || word.val == -1 ? "checkbox" :
          word.val == 1 ? "checkbox include" : "checkbox correct"}>
        {word.char}
        </div>))}
      </div> */}
      <div className="foot">Designed by Lei</div>
    </div>
  );
}

export default App
