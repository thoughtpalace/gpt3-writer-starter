// components/Flashcard.js
import React, { useState } from 'react';

const Flashcard = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="flashcard">
      <div className="flashcard-content">
        <h3>Question</h3>
        <p>{question}</p>
        {showAnswer && (
          <>
            <h3>Answer</h3>
            <p>{answer}</p>
          </>
        )}
        <button onClick={handleShowAnswer}>{showAnswer ? 'Hide' : 'Show'} Answer</button>
      </div>
    </div>
  );
};

export default Flashcard;
