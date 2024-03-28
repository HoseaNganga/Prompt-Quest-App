import React from "react";
import Link from "next/link";

const PromptForm = ({
  type,
  createdPrompt,
  setCreatedPrompt,
  submitting,
  handleSubmit,
}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col p-8 ">
      <h1 className="head_text text-left blue_gradient">{type} Post</h1>
      <p className="desc text-left max-w-md ">
        {type} and share amazing prompts with the world and let your imagination
        run wild with any AI-Powered Platforms
      </p>
      <form
        className="mt-10 w-full max-w-2xl flex flex-col gap-8 glassmorphism  "
        onSubmit={handleSubmit}
      >
        <div className="grid gap-4">
          <label htmlFor="ai-prompt" className=" text-2xl ">
            Your Ai-Prompt:{" "}
          </label>
          <textarea
            id="ai-prompt"
            cols="30"
            rows="10"
            value={createdPrompt.prompt}
            onChange={(e) =>
              setCreatedPrompt({ ...createdPrompt, prompt: e.target.value })
            }
            placeholder="Write your Prompt"
            required
            className="form_textarea"
          ></textarea>
        </div>
        <div className="grid gap-4">
          <label htmlFor="tag" className=" text-2xl ">
            Tag (#coding):
          </label>
          <input
            type="text"
            id="tag"
            value={createdPrompt.tag}
            onChange={(e) =>
              setCreatedPrompt({ ...createdPrompt, tag: e.target.value })
            }
            placeholder="#coding"
            required
            className="form_input"
          />
        </div>
        <div className=" flex-end mx-3 mb-5 gap-4 ">
          <Link href={"/"} className="outline_btn">
            Cancel
          </Link>
          <button type="submit" disabled={submitting} className="black_btn">
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default PromptForm;
