import OpenAI from 'openai';

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true
});
 
export async function imageGenerate(order: string[]) {
  const prompt = "A person who is " + order.join(' ') + " realistic photo" 

  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });

    return response?.data[0]

  } catch (err) {
    console.error(err);
  }
}
