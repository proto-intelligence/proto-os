"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUpdatePrompt } from "@/hooks/useUpdatePrompt";
import { useGetPromptById } from "@/hooks/useGetPromptById"; // you'll need to create this
import { IconButton } from "@/ui/components/IconButton";
import { TextField } from "@/ui/components/TextField";
import { TextArea } from "@/ui/components/TextArea";
import { Badge } from "@/ui/components/Badge";
import { Button } from "@/ui/components/Button";
import type { PromptFieldDto } from "@/lib/api/client";

export default function PromptEditorClient() {
  const router = useRouter();
  const rawId = useParams()?.id;
  const promptId = typeof rawId === 'string' ? rawId : Array.isArray(rawId) ? rawId[0] : null;

  const { prompt, loading } = useGetPromptById(promptId);
  const { updatePrompt } = useUpdatePrompt();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [actualPrompt, setActualPrompt] = useState("");
  const [collection, setCollection] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [inputs, setInputs] = useState<PromptFieldDto[]>([]);
  const [outputs, setOutputs] = useState<PromptFieldDto[]>([]);

  useEffect(() => {
    if (prompt) {
      setName(prompt.name);
      setDescription(prompt.description);
      setActualPrompt(prompt.actualPrompt);
      setCollection(prompt.collection ?? "");
      setTags(prompt.tags ?? []);
      setInputs(prompt.inputs ?? []);
      setOutputs(prompt.outputs ?? []);
    }
  }, [prompt]);

  const handleSave = async () => {
    const payload = {
      name,
      description,
      actualPrompt,
      collection,
      tags,
      inputs,
      outputs,
    };

    try {
      if (promptId) {
        await updatePrompt(promptId, payload);
      }
      router.push("/");
    } catch (error) {
      console.error("Failed to save prompt", error);
    }
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const updateField = (
    arr: PromptFieldDto[],
    index: number,
    key: keyof PromptFieldDto,
    value: string,
    setter: (val: PromptFieldDto[]) => void
  ) => {
    const copy = [...arr];
    copy[index][key] = value;
    setter(copy);
  };

  const removeField = (
    arr: PromptFieldDto[],
    index: number,
    setter: (val: PromptFieldDto[]) => void
  ) => {
    const copy = [...arr];
    copy.splice(index, 1);
    setter(copy);
  };

  return (
    <div className="flex h-256 w-full flex-col items-start gap-8 bg-default-background px-12 py-12">
      <div className="flex w-full items-center justify-between">
        <span className="text-heading-3 font-heading-3 text-default-font">
          {"Create Prompt"}
        </span>
        <IconButton icon="FeatherX" onClick={() => router.push("/")} />
      </div>

      {loading ? (
        <p className="text-white">Loading prompt...</p>
      ) : (
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-6">
          <TextField
            label="Name"
            helpText="Give your prompt a descriptive name"
            className="h-auto w-full flex-none"
          >
            <TextField.Input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </TextField>

          <TextArea
            label="Description"
            helpText="Describe what this prompt does"
            className="h-auto w-full flex-none"
          >
            <TextArea.Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </TextArea>

          <TextField
            label="Collection"
            helpText="Group this prompt belongs to"
            className="h-auto w-full flex-none"
          >
            <TextField.Input
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
            />
          </TextField>

          {/* Tags */}
          <div className="flex w-full flex-col items-start gap-4">
            <span className="text-body-bold font-body-bold text-default-font">
              Tags
            </span>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div key={tag} className="flex items-center gap-1">
                  <Badge variant="neutral">{tag}</Badge>
                  <IconButton
                    size="small"
                    icon="FeatherX"
                    onClick={() => removeTag(tag)}
                  />
                </div>
              ))}
            </div>
            <TextField
              label=""
              helpText="Add tags and press enter"
              className="h-auto w-full flex-none"
            >
              <TextField.Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
                className="h-auto w-full flex-none"
              />
            </TextField>
          </div>

          {/* Input Fields */}
          <div className="flex w-full flex-col items-start gap-4">
            <span className="text-body-bold font-body-bold text-default-font">
              Input Fields
            </span>
            {inputs.map((field, i) => (
              <div key={i} className="flex w-full items-center gap-2">
                <TextField helpText="Field name" className="grow">
                  <TextField.Input
                    value={field.name}
                    onChange={(e) =>
                      updateField(inputs, i, "name", e.target.value, setInputs)
                    }
                    className="h-auto w-full flex-none"
                  />
                </TextField>
                <TextField helpText="Description" className="grow">
                  <TextField.Input
                    value={field.description}
                    onChange={(e) =>
                      updateField(
                        inputs,
                        i,
                        "description",
                        e.target.value,
                        setInputs
                      )
                    }
                    className="h-auto w-full flex-none"
                  />
                </TextField>
                <IconButton
                  icon="FeatherTrash"
                  onClick={() => removeField(inputs, i, setInputs)}
                />
              </div>
            ))}
            <Button
              icon="FeatherPlus"
              variant="neutral-secondary"
              onClick={() =>
                setInputs([...inputs, { name: "", description: "" }])
              }
            >
              Add Input Field
            </Button>
          </div>

          {/* Output Fields */}
          <div className="flex w-full flex-col items-start gap-4">
            <span className="text-body-bold font-body-bold text-default-font">
              Output Fields
            </span>
            {outputs.map((field, i) => (
              <div key={i} className="flex w-full items-center gap-2">
                <TextField helpText="Field name" className="grow">
                  <TextField.Input
                    value={field.name}
                    onChange={(e) =>
                      updateField(
                        outputs,
                        i,
                        "name",
                        e.target.value,
                        setOutputs
                      )
                    }
                  />
                </TextField>
                <TextField helpText="Description" className="grow">
                  <TextField.Input
                    value={field.description}
                    onChange={(e) =>
                      updateField(
                        outputs,
                        i,
                        "description",
                        e.target.value,
                        setOutputs
                      )
                    }
                  />
                </TextField>
                <IconButton
                  icon="FeatherTrash"
                  onClick={() => removeField(outputs, i, setOutputs)}
                />
              </div>
            ))}
            <Button
              icon="FeatherPlus"
              variant="neutral-secondary"
              onClick={() =>
                setOutputs([...outputs, { name: "", description: "" }])
              }
            >
              Add Output Field
            </Button>
          </div>

          <TextArea
            label="Prompt Text"
            helpText="The actual text of the prompt"
                        className="h-auto w-full flex-none"
          >
            <TextArea.Input
              className="min-h-[144px]"
              value={actualPrompt}
              onChange={(e) => setActualPrompt(e.target.value)}
            />
          </TextArea>
        </div>
      )}

      <div className="flex w-full flex-col items-end justify-between border-t border-solid border-neutral-border py-6">
        <div className="flex gap-2">
          <Button variant="neutral-secondary" onClick={() => router.push("/")}>
            Cancel
          </Button>
          <Button icon="FeatherSave" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}