import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function profileGenerate(order: string[]) {
  const prompt = `Create a realistic and coherent profile with the following characteristics: ${order.join(
    ", ",
  )}. Generate a name, age, occupation, personality traits, and hobbies for this profile. Please provide the response in a valid JSON format with keys "name", "age", "occupation", "personality  ", and "hobbies". The response should be in Korean.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
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

interface Profile {
  name: string;
  age: number;
  occupation: string;
  personality: string;
  hobbies: string;
}

// 문자열을 객체로 변환하는 함수
export const parseProfile = (responseText: string): Profile => {
  const profile = {
    name: "",
    age: 0,
    occupation: "",
    personality: "",
    hobbies: "",
  };

  // 각 항목을 추출하기 위한 정규식
  const nameMatch = responseText.match(/이름:\s*(.*)/i);
  const ageMatch = responseText.match(/나이:\s*(\d+)/i);
  const occupationMatch = responseText.match(/직업:\s*(.*)/i);
  const personalityMatch = responseText.match(/성격(?: 특징)?:\s*(.*)/i);
  const hobbiesMatch = responseText.match(/취미:\s*(.*)/i);

  // 정규식 결과를 프로필 객체에 할당
  if (nameMatch) profile.name = nameMatch[1].trim();
  if (ageMatch) profile.age = parseInt(ageMatch[1], 10);
  if (occupationMatch) profile.occupation = occupationMatch[1].trim();
  if (personalityMatch) profile.personality = personalityMatch[1].trim();
  if (hobbiesMatch) profile.hobbies = hobbiesMatch[1].trim();

  return profile;
};
