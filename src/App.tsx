import React from "react";
import "./App.css";
import MultiSectionApplication from "./MultiSectionApplication";

const App: React.FC = () => {
  return (
    <div className="page">
      <div className="quiz-container">
        {/* 🔹 Global header – same look as the quiz */}
        <header className="header">
          <img
            src="https://i.postimg.cc/fLLWZBrp/egg_portrait.png"
            alt="Jenayalynn Riojas, CCHt"
            className="portrait"
          />
          <h1 className="title">The Three Contradictions Quiz</h1>
          <p className="subtitle">
            For each statement, select the one that feels most true for you
            right now.
          </p>
          <p className="subtitle">
            There are no wrong answers — each response reflects a pattern of
            energy within the Self.
          </p>
          <p className="signature">Jenayalynn</p>
        </header>

        {/* 🔹 Application lives under the global header */}
        <MultiSectionApplication />
      </div>
    </div>
  );
};

export default App;
