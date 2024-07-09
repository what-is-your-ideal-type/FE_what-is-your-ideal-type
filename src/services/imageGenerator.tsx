import OpenAI from 'openai';

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function imageGenerate(order: string[]) {
  const prompt = order.join('의 ') + "실사 전신 사진을 생성해주세요"

  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });

    return response

  } catch (err) {
    console.error(err);
  }
}
