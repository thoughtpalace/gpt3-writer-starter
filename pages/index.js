import Head from 'next/head';
import Image from 'next/image';
import Calendar  from './components/calendar';
import buildspaceLogo from '../assets/buildspace-logo.png';

import { useState } from 'react';
import StreakBar from './components/streakbar';


const Home = () => {
  const [userInput, setUserInput] = useState('');

  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}

  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>Focus Ai!</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1> Focus AI  </h1> 
          </div>
          <div className="header-subtitle">
            <h2> Enter A topic and master it through prompts </h2>
          </div>
        </div>

        <div className="streakbar-container" style={{ position: 'absolute', top: 0, left: 0 }}>
   <StreakBar /> 
 </div>
        <div className="prompt-container">
          <textarea 
          className="prompt-box"
          placeholder="start typing what they said here"
          value={userInput}
          onChange={onUserChangedText}
          
          />
        </div>


        <div className="prompt-buttons">
    <a className="generate-button" onClick={callGenerateEndpoint}>
      <div className="generate">
        {isGenerating ? <span class="loader"></span> : <p>Learn</p>}
      </div>
    </a>
  </div>

  {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}


      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>Learn to focus on mastery</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
