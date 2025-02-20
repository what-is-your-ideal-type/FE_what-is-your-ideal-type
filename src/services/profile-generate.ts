import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

type orderType = {
  gender: string;
  age: string;
  bodyShape: string;
  faceShape: string;
  skinTone: string;
  eyesShape: string;
  hairStyle: string;
  hairColor: string;
  outfit: string;
};

export async function profileGenerate(order: orderType) {
  const prompt = `Create a realistic profile for a ${order.age} ${order.gender} that is wearing a ${order.outfit}. 
  Return the response in the following JSON format:
  {
    "name": "한글 이름",
    "age": "나이",
    "occupation": "직업",
    "hobbies": ["취미1", "취미2", "취미3"],
    "datecourse": "추천 데이트 코스",
    "personality": "성격 특성을 문장으로 설명",
    "lovestyle": "연애 스타일"
  }
  All text values should be in Korean.`;
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 300,
    });

    const responseText = response?.choices[0]?.message?.content;

    return responseText;
  } catch (error) {
    console.error(error);
  }
}
