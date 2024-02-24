import { useState, useEffect } from "react";
import "./App.css";

/* images */
import IconDice from "./assets/images/icon-dice.svg";

function App() {
  const [adviceID, setAdviceID] = useState("loading advice ID");
  const [adviceText, setAdviceText] = useState("loading advice text");
  const [adviceAvailable, setAdviceAvailable] = useState(true);

  const fetchAdvice = () => {
    if (!adviceAvailable) {
      console.log("on cooldown, too many requests");
      return;
    }

    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((data) => {
        setAdviceID(data.slip.id);
        setAdviceText(data.slip.advice);
      });

    setAdviceAvailable(false);

    // set a timeout so we don't spam the api
    // 2 second timeout -> api doesn't give new advice for 2 seconds anyways
    setTimeout(() => {
      setAdviceAvailable(true);
    }, 2000);
  };

  // load initial advice
  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <>
      <main>
        <h1>{`advice #${adviceID}`}</h1>
        <div className="advice-text">{adviceText}</div>
        <div className="divider-img-container"></div>
        <button className="random-button" onClick={() => fetchAdvice()}>
          <img className="icon-dice" src={IconDice} alt="icon dice"></img>
        </button>
      </main>
      <footer className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a href="https://github.com/exchyphen" target="_blank">
          exc
        </a>
        .
      </footer>
    </>
  );
}

export default App;
