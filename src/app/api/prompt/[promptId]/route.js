/* GET METHOD */
import { connectToDB } from "@/Utilities/database";
import userPrompt from "@/models/Prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const populatedPrompt = await userPrompt
      .findById(params.promptId)
      .populate("creator");
    if (!populatedPrompt) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }
    return new Response(
      JSON.stringify(populatedPrompt, {
        status: 200,
      })
    );
  } catch (error) {
    return new Response("Failed to collect UserPrompts", {
      status: 500,
    });
  }
};

/* PATCH */
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const existingPrompt = await userPrompt.findById(params.promptId);
    if (!existingPrompt) {
      return new Response(`Prompt not Found`, {
        status: 404,
      });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(
      JSON.stringify(existingPrompt, {
        status: 200,
      })
    );
  } catch (error) {
    return new Response("Failed to update Prompt", {
      status: 500,
    });
  }
};

/* DELETE  */

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await userPrompt.findByIdAndDelete(params.promptId);
    return new Response(`Successfully deleted the Prompt`, {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to delete Prompt", {
      status: 500,
    });
  }
};
