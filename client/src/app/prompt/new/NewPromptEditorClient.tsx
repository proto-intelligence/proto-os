"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconButton } from "@/ui/components/IconButton";
import { TextField } from "@/ui/components/TextField";
import { TextArea } from "@/ui/components/TextArea";
import { Badge } from "@/ui/components/Badge";
import { Button } from "@/ui/components/Button";
import { useCreatePrompt } from "@/hooks/useCreatePrompt";
import { useUpdatePrompt } from "@/hooks/useUpdatePrompt";
import type { Prompt, PromptFieldDto } from "@/lib/api/client";

type NewPromptEditorClientProps = {
  newPromptToEdit?: Prompt | null;
};

export default function NewPromptEditorClient({ newPromptToEdit: promptToEdit }: NewPromptEditorClientProps) {
  const router = useRouter();
  const isEditMode = !!promptToEdit;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [actualPrompt, setActualPrompt] = useState("");
  const [collection, setCollection] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [inputs, setInputs] = useState<PromptFieldDto[]>([]);
  const [outputs, setOutputs] = useState<PromptFieldDto[]>([]);

  const { createPrompt } = useCreatePrompt();
  const { updatePrompt } = useUpdatePrompt();

  useEffect(() => {
    if (promptToEdit) {
      setName(promptToEdit.name);
      setDescription(promptToEdit.description);
      setActualPrompt(promptToEdit.actualPrompt);
      setCollection(promptToEdit.collection ?? "");
      setTags(promptToEdit.tags ?? []);
      setInputs(promptToEdit.inputs ?? []);
      setOutputs(promptToEdit.outputs ?? []);
    }
  }, [promptToEdit]);

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
      if (isEditMode && promptToEdit?.id) {
        await updatePrompt(promptToEdit.id, payload);
      } else {
        await createPrompt(payload);
      }
      router.back();
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
    <div className="flex h-256 w-full flex-col items-start gap-6 bg-default-background px-12 py-12">
      <div className="flex w-full items-center justify-between">
        <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
          {isEditMode ? "Edit Prompt" : "Create Prompt"}
        </span>
        <IconButton icon="FeatherX" onClick={() => router.back()} />
      </div>

      <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-6">
        <TextField
          className="h-auto w-full flex-none"
          label="Name"
          helpText="Give your prompt a descriptive name"
        >
          <TextField.Input
            placeholder="Enter prompt name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </TextField>

        <TextArea
          className="h-auto w-full flex-none"
          label="Description"
          helpText="Provide a detailed description of what this prompt does"
        >
          <TextArea.Input
            placeholder="Enter detailed description of the prompt"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </TextArea>

        <TextField
          className="h-auto w-full flex-none"
          label="Collection"
          helpText="Group or category this prompt belongs to"
        >
          <TextField.Input
            placeholder="Enter collection name"
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
          />
        </TextField>

        <div className="flex w-full flex-col items-start gap-4">
          <span className="w-full text-body-bold font-body-bold text-default-font">Tags</span>
          <div className="flex w-full flex-wrap items-start gap-2">
            {tags.map((tag) => (
              <div key={tag} className="flex items-center gap-1">
                <Badge variant="neutral">{tag}</Badge>
                <IconButton size="small" icon="FeatherX" onClick={() => removeTag(tag)} />
              </div>
            ))}
          </div>
          <TextField className="h-auto w-full flex-none" label="" helpText="Add tags and press enter">
            <TextField.Input
              placeholder="Add new tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            />
          </TextField>
        </div>

        <div className="flex w-full flex-col items-start gap-4">
          <span className="text-body-bold font-body-bold text-default-font">Input Fields</span>
          <div className="flex w-full flex-col items-start gap-2">
            {inputs.map((field, i) => (
              <div key={i} className="flex w-full items-center gap-2">
                <TextField className="grow" label="" helpText="Name of the input field">
                  <TextField.Input
                    placeholder="Input field name"
                    value={field.name}
                    onChange={(e) => updateField(inputs, i, "name", e.target.value, setInputs)}
                  />
                </TextField>
                <TextField className="grow" label="" helpText="Description of the input">
                  <TextField.Input
                    placeholder="Input field description"
                    value={field.description}
                    onChange={(e) => updateField(inputs, i, "description", e.target.value, setInputs)}
                  />
                </TextField>
                <IconButton icon="FeatherTrash" onClick={() => removeField(inputs, i, setInputs)} />
              </div>
            ))}
            <Button
              variant="neutral-secondary"
              icon="FeatherPlus"
              onClick={() => setInputs([...inputs, { name: "", description: "" }])}
            >
              Add Input Field
            </Button>
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-4">
          <span className="text-body-bold font-body-bold text-default-font">Output Fields</span>
          <div className="flex w-full flex-col items-start gap-2">
            {outputs.map((field, i) => (
              <div key={i} className="flex w-full items-center gap-2">
                <TextField className="grow" label="" helpText="Name of the output field">
                  <TextField.Input
                    placeholder="Output field name"
                    value={field.name}
                    onChange={(e) => updateField(outputs, i, "name", e.target.value, setOutputs)}
                  />
                </TextField>
                <TextField className="grow" label="" helpText="Description of the output">
                  <TextField.Input
                    placeholder="Output field description"
                    value={field.description}
                    onChange={(e) => updateField(outputs, i, "description", e.target.value, setOutputs)}
                  />
                </TextField>
                <IconButton icon="FeatherTrash" onClick={() => removeField(outputs, i, setOutputs)} />
              </div>
            ))}
            <Button
              variant="neutral-secondary"
              icon="FeatherPlus"
              onClick={() => setOutputs([...outputs, { name: "", description: "" }])}
            >
              Add Output Field
            </Button>
          </div>
        </div>

        <TextArea
          className="h-auto w-full flex-none"
          label="Prompt Text"
          helpText="The actual prompt template text"
        >
          <TextArea.Input
            className="h-auto min-h-[144px] w-full flex-none"
            placeholder="Enter the actual prompt text"
            value={actualPrompt}
            onChange={(e) => setActualPrompt(e.target.value)}
          />
        </TextArea>
      </div>

      <div className="flex w-full flex-col items-end justify-between border-t border-solid border-neutral-border py-6">
        <div className="flex w-full items-center justify-end gap-2">
          <Button variant="neutral-secondary" onClick={() => router.back()}>
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
