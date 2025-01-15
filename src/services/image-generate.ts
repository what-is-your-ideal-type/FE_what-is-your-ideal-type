import OpenAI from "openai";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

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

export async function imageGenerate(order: orderType) {
  const prompt = `Create a realistic and passport-style image.  The subject is a Korean ${order.gender} in ${order.gender === "man" ? "his " : "her "} ${order.age} with a ${order.bodyShape} physique and a ${order.faceShape}. ${order.gender === "man" ? "He " : "She "} has ${order.skinTone}, distinguishing ${order.eyesShape}, and a ${order.hairStyle} cut with ${order.hairColor}. ${order.gender === "man" ? "He " : "She "} is wearing a ${order.outfit} outfit. The image is set against a plain light-colored background with soft lighting, exuding a natural, polished, and refined look`;

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    return response?.data[0];
  } catch (err) {
    console.error(err);
  }
}
