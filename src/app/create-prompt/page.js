"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import PromptForm from "@/components/PromptForm/PromptForm";
const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [createdPrompt, setCreatedPrompt] = useState({
    prompt: "",
    tag: "",
  });
  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const resp = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: createdPrompt.prompt,
          userId: session?.user.id,
          tag: createdPrompt.tag,
        }),
      });
      if (resp.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  console.log(createdPrompt);
  return (
    <>
      <PromptForm
        type="Create"
        createdPrompt={createdPrompt}
        setCreatedPrompt={setCreatedPrompt}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </>
  );
};

export default CreatePrompt;
