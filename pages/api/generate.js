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
Write me a detailed funny dirty joke in response to the text below like kevin hart clapping back in detail and hilarious.

text:
`

const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.8,
    max_tokens: 800,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  // I build Prompt #2.
  const secondPrompt = 
  `
  Take the text of content and output  below and generate a response written in the style of Kevin Hart and Eddie Murphy. Make it feel like a funny story. Don't just list the points. Go deep into each one. Explain why using funny words.

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
