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
