import { useEffect, useState } from 'react'
import './App.css'

const documentHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
}
window.addEventListener("resize", documentHeight);
documentHeight();

const WORDSLIST = [
  "APPLE", "PEARL", "CANDY", "DIRTY", "HELLO", "BREAD", 
  "PEACH", "TOAST", "SHORT", "GHOST", "GUESS", "WEIRD", 
  "LEAVE", "QUERY", "EXIST", "UNITY", "WORTH", "PIGGY", 
  "BRAWL", "COUCH", "YUMMY", "SMILE", "QUITE", "MAYBE", 
  "PAUSE", "STAND", "DRINK", "CAUSE", "SLEEP", "JELLY",
  "OCEAN", "SPEAD", "FRESH", "COVER", "NORTH", "VOICE",
  "RIGHT", "WRONG", "YOUNG", "MONEY", "ZEBRA", "PROUD",
  "THINK", "SWEAR", "FAITH", "HEART", "EARTH", "TRUST",
  "AGREE", "GIANT", "REACT", "SENSE", "EXCEL", "POWER",
  "SUPER", "MEDIA", "FAULT", "CHECK", "INDEX", "IMAGE",
  "PHOTO", "COLOR", "ABUSE", "QUICK", "BEACH", "TOUCH",
  "LEGAL", "DAILY", "OTHER", "GRAVE", "CHOAS", "MERCI",
  "BUILD", "JOKER", "HOTEL", "ANGEL", "HONEY", "SORRY",
  "LAUGH", "BINGO", "FIGHT", "COMIC", "ONION", "DEATH",
  "DONUT", "DEVIL", "PHASE", "PIZZA", "VIDEO", "WHITE",
  "FORCE", "EMPTY", "WATER", "SHARK", "GRAND", "ALONE",
  "THANK", "THING", "BLAME", "CHILL", "SPICY", "LOSER",
  "QUEEN", "HEAVY", "CRAFT", "MOVIE", "KNOCK", "WHERE",
  "PROOF", "SCARE", "TRASH", "TABLE", "BLACK", "GREEN",
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

  useEffect(() => {
    let count = -1;

    function handleKeyDown(e) {
      if (e.key.match(/^[a-z]$/i)) {
        if (count < 4) {
          count += 1;
          setWords(prev => {
            const test = count == 0 ? generateDefaultWords() : [...prev];
            test[count] = { char: e.key.toUpperCase(), val: 0 };
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
          document.getElementById("keyin").value = "";
        }
      } else if (e.key == "Backspace") {
        if (count > -1) {
          setWords(prev => {
            const test = [...prev];
            test[count+1] = { char: "", val: -1 };
            return test;
          });
          count -= 1;
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => removeEventListener("keydown", handleKeyDown);
  }, []);

  function reset() {
    ANSWER = startNewGame();
    setWords(generateDefaultWords());
    setCheck(0);
    document.getElementById("show").checked = false;
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
      <input type="textbox" id="keyin" value="" />
      <div className="btn">TIMES: {check}</div>
      <button className="btn reset" onClick={reset}>NEW GAME</button>
      <input type="checkbox" id="show" />
      <label for="show" className="btn answer"><p>ANSWER</p></label>
      <div className="show-ans">{ANSWER}</div>
      <div className="foot" id="info"><i className="fa fa-question-circle" aria-hidden="true"></i></div>
      <div className="explain">
        <p><b>Hello Wordle!</b></p>
        <p>Try to guess a five-letter word and reach the final answer!</p>
        <p><b>ENTER</b> to check the result of your attempt.</p>
        <p><b>TIMES</b> shows your number of attempts.</p>
        <p><b>NEW GAME</b> button brings you start with a new word!</p>
        <p><b>ANSWER</b> button simply shows the answer!</p>
      </div>
      <div><a className="foot" href="https://github.com/r09521516/wordle.git">Designed by Lei</a></div>
    </div>
  );
}

export default App
