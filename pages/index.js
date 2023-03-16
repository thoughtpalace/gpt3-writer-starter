// import Head from 'next/head';
// import Image from 'next/image';
// import Calendar  from './components/calendar';
// import buildspaceLogo from '../assets/buildspace-logo.png';

// import { useState } from 'react';
// import StreakBar from './components/streakbar';
// import FlashcardController from './components/flashcardcontroller';
// import Flashcard from './components/Flashcard';



// const Home = () => {
//   const [userInput, setUserInput] = useState('');

//   const [apiOutput, setApiOutput] = useState('')
//   const [isGenerating, setIsGenerating] = useState(false)

//   const callGenerateEndpoint = async () => {
//   setIsGenerating(true);
  
//   console.log("Calling OpenAI...")
//   const response = await fetch('/api/generate', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ userInput }),
//   });

//   const data = await response.json();
//   const { output } = data;
//   console.log("OpenAI replied...", output.text)

//   setApiOutput(`${output.text}`);
//   setIsGenerating(false);
// }

//   const onUserChangedText = (event) => {
//     setUserInput(event.target.value);
//   };

//   return (
//     <div className="root">
//       <Head>
//         <title> SkillQuest!</title>
//       </Head>
//       <div className="container">
//         <div className="header">
//           <div className="header-title">
//             <h1> SkillQuest  </h1> 
//           </div>
//           <div className="header-subtitle">
//             <h2> Enter A topic and master it through prompts </h2>
//           </div>
//         </div>

    
//         <div className="prompt-container">
//           <textarea 
//           className="prompt-box"
//           placeholder="start typing what they said here"
//           value={userInput}
//           onChange={onUserChangedText}
          
//           />
//         </div>


//         <div className="prompt-buttons">
//     <a className="generate-button" onClick={callGenerateEndpoint}>
//       <div className="generate">
//         {isGenerating ? <span class="loader"></span> : <p>Learn</p>}
//       </div>
//     </a>
//   </div>
// {/* 
//   {apiOutput && (
//   <div className="output">
//     <div className="output-header-container">
//       <div className="output-header">
//         <h3>Output</h3>
//       </div>
//     </div>
//     <div className="output-content">
//       <p>{apiOutput}</p>
//     </div>
//   </div>
// )} */}

//  {console.log(apiOutput)}
// {apiOutput && <Flashcard question={apiOutput.question} answer={apiOutput.answer} />}






//       </div>
//       <div className="badge-container grow">
//         <a
//           href="https://buildspace.so/builds/ai-writer"
//           target="_blank"
//           rel="noreferrer"
//         >
//           <div className="badge">
//             <Image src={buildspaceLogo} alt="buildspace logo" />
//             <p>Learn to focus on mastery</p>
//           </div>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Home;

import Head from 'next/head';
import Image from 'next/image';
import Calendar from './components/calendar';
import buildspaceLogo from '../assets/buildspace-logo.png';

import { useState } from 'react';
import StreakBar from './components/streakbar';
import FlashcardController from './components/flashcardcontroller';
import Flashcard from './components/Flashcard';

const Home = () => {
  const [userInput, setUserInput] = useState('');

  const [apiOutput, setApiOutput] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  


  const processApiResponse = (response) => {
    // Ensure the response is a valid JSON string
    if (typeof response !== 'string') return [];
  
    // Split the response by line breaks
    const lines = response.split('\n');
  
    // Initialize an empty array to store question-answer objects
    const questionAnswerPairs = [];
  
    // Iterate through each line
    lines.forEach((line) => {
      console.log("Raw JSON:", line); // Add this line to log the raw JSON string

      try {
        // Attempt to parse the line as JSON
        const obj = JSON.parse(line);
  
        // Check if the parsed object has both "question" and "answer" properties
        if (obj.hasOwnProperty('question') && obj.hasOwnProperty('answer')) {
          questionAnswerPairs.push(obj);
        }
      } catch (error) {
        // If there's an error parsing the JSON, ignore the line
        console.error('Error parsing JSON:', error);
      }
    });
  
    return questionAnswerPairs;
  };
  
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
  
    console.log("Calling OpenAI...");
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);
  
    // Process the API response and get the question-answer pairs
    const questionAnswerPairs = processApiResponse(output.text);
  
    setApiOutput(questionAnswerPairs);
    setIsGenerating(false);
  };
  


  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title> SkillQuest!</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1> SkillQuest </h1>
          </div>
          <div className="header-subtitle">
            <h2> Enter A topic and master it through prompts </h2>
          </div>
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
              {isGenerating ? <span className="loader"></span> : <p>Learn</p>}
            </div>
          </a>
        </div>

        {apiOutput.map((flashcard, index) => (
          <Flashcard
            key={index}
            question={flashcard.question}
            answer={Array.isArray(flashcard.answer) ? flashcard.answer.join(', ') : flashcard.answer}
          />
        ))}
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
