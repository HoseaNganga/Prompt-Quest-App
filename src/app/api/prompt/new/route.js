import { connectToDB } from "@/Utilities/database";
import userPrompt from "@/models/Prompt";

export const POST = async (request) => {
  const { userId, prompt, tag } = await request.json();
  try {
    await connectToDB();
    const newUserPrompt = new userPrompt({
      creator: userId,
      prompt,
      tag,
    });
    await newUserPrompt.save();
    return new Response(
      JSON.stringify(newUserPrompt, {
        status: 201,
      })
    );
  } catch (error) {
    return new Response("Failed to create new Prompt", {
      status: 500,
    });
  }
};
