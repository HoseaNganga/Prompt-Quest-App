"use client";

import { useState, useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import PromptForm from "@/components/PromptForm/PromptForm";
const EditPrompt = () => {
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [createdPrompt, setCreatedPrompt] = useState({
    prompt: "",
    tag: "",
  });
  const updatePrompt = async (e) => {
    if (!promptId) {
      return alert("PromptId not found");
    }
    e.preventDefault();
    setSubmitting(true);
    try {
      const resp = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: createdPrompt.prompt,
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
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(`/api/prompt/${promptId}`);
      const respData = await resp.json();
      setCreatedPrompt({
        prompt: respData.prompt,
        tag: respData.tag,
      });
    };
    if (promptId) {
      fetchData();
    }
  }, [promptId]);

  return (
    <>
      <PromptForm
        type="Edit"
        createdPrompt={createdPrompt}
        setCreatedPrompt={setCreatedPrompt}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </>
  );
};

export default EditPrompt;
