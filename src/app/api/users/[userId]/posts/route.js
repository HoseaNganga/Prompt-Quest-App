import { connectToDB } from "@/Utilities/database";
import userPrompt from "@/models/Prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const populatedPrompts = await userPrompt
      .find({
        creator: params.userId,
      })
      .populate(`creator`);

    return new Response(
      JSON.stringify(populatedPrompts, {
        status: 200,
      })
    );
  } catch (error) {
    return new Response(`Failed to fetch Creator Data`, {
      status: 500,
    });
  }
};
