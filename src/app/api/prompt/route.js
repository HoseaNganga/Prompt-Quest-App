import { connectToDB } from "@/Utilities/database";
import userPrompt from "@/models/Prompt";

export const GET = async (request) => {
  try {
    await connectToDB();
    const populatedPrompts = await userPrompt.find({}).populate("creator");
    return new Response(
      JSON.stringify(populatedPrompts, {
        status: 200,
      })
    );
  } catch (error) {
    return new Response("Failed to collect UserPrompts", {
      status: 500,
    });
  }
};
