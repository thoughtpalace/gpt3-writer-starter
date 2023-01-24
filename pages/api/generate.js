 import { Configuration, OpenAIApi } from 'openai';

 const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
 });

const openai = new OpenAIApi(configuration)

// const basePromptPrefix = `Give me a long funny response to my enemies comments below and make it sound like kevin hart clap back and use curse words and make sure it sounds black:

// `

// const generateAction = async (req, res) => {
//   // Run first prompt
//   console.log(`API: ${basePromptPrefix}\n ${req.body.userInput}\n response:`)

//   const baseCompletion = await openai.createCompletion({
//     model: 'text-davinci-002',
//     prompt: `${basePromptPrefix}${req.body.userInput}`,
//     temperature: 0.73,
//     max_tokens: 1000,
//   });
  
//   const basePromptOutput = baseCompletion.data.choices.pop();

//   res.status(200).json({ output: basePromptOutput });
// };

// export default generateAction;


const basePromptPrefix =
`
Generate sub topics for the Topic Area to include any sub topics that are related to the Topic Area.  The sub topics should be a mix from beginner to advanced.

subtopics:
`

const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.65,
    max_tokens: 1000,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();


   /* Take the text of content and output  below and generate a response written in the style of Kevin Hart and Eddie Murphy. Make it feel like a funny story. Don't just list the points. Go deep into each one. Explain why using funny words. */

  // I build Prompt #2.
  const secondPrompt = 
  `
    Take the subtopics an generate a question and answer format that would work with 
    a quiz. Make sure the subtopics as a question and answer format. You should give the questions and the answers. If generate a question that requires math equations. Please include mathematical expresssions where necessary.  The questions generated from subtopics should be a mix from beginner to advanced. When you are done please include the correct answer to the question.

     Question: 

     Answer:


  content: ${req.body.userInput}

  output : ${basePromptOutput.text}

  response:
  `
  
  // I call the OpenAI API a second time with Prompt #2
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `${secondPrompt}`,
    // I set a higher temperature for this one. Up to you!
    temperature: 0.85,
		// I also increase max_tokens.
    max_tokens: 1250,
  });
  
  // Get the output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;
