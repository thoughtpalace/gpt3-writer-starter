import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Flashcard = ({ question, answer }) => {
  return (
    <div>
      <div>Question: {question}</div>
      <div>Answer: {answer}</div>
    </div>
  );
}

const FlashcardController = () => {
  const [topic, setTopic] = useState('');
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: `What is ${topic}`,
      max_tokens: 2048,
      temperature: 0.5,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`
      }
    });
    const data = response.data.choices[0].text;
    const responseList = data.split("\n");
    const flashcards = responseList.map(item => {
      const res = item.split("\t");
      return { question: res[0], answer: res[1] };
    });
    setResponses(flashcards);
    setIsLoading(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Topic:
          <input type="text" value={topic} onChange={handleTopicChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {isLoading ? <div>Loading...</div> : (
        <div>
          {responses.map((response, index) => (
            <Flashcard key={index} question={response.question} answer={response.answer} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FlashcardController;
