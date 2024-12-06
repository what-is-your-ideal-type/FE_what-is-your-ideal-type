import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
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
  const prompt = `Create a realistic profile for a ${order.age} ${order.gender} with a ${order.bodyShape} body and a ${order.faceShape} face. The person has ${order.skinTone} skin, ${order.eyesShape} eyes, and ${order.hairStyle} hair in ${order.hairColor} color. They are wearing a ${order.outfit}. Generate a name, age, occupation, personality traits, andhobbies for this profile. Provide the response in a valid JSON format with keys "name", "age", "occupation", "personality", and "hobbies". The response should be in Korean.`;

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
