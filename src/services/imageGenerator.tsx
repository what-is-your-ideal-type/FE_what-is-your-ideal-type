import OpenAI from 'openai';

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

const openai = new OpenAI({
  apiKey: "API_KEY_", // env에 추가
  dangerouslyAllowBrowser: true
});

export async function imageGenerate() {
  const prompt = "남자 20대 170cm이상 70kg이상 숏컷 무쌍 너무 밝지도 어둡지도 않은 자연스러운 피부색을 가진 증명사진을 그려줘";

  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });

    // Response를 콘솔에 출력
    console.log(response);

  } catch (err) {
    console.error(err);
  }
}
