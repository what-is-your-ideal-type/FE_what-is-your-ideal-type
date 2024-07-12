import { imageGenerate } from "./imageGenerator";

export const requestImage = async(prompts: string[]): Promise<string | undefined> => {
    try{
        const data = await imageGenerate(prompts);
        return data?.url;
    }catch(error){
        console.error(error)
    }
}