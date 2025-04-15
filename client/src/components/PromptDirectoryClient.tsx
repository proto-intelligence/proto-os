"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PromptPlaybookSearchBar } from "@/ui/components/PromptPlaybookSearchBar";
import { PromptCard } from "@/ui/components/PromptCard";
import { useGetAllPrompts } from "@/hooks/useGetAllPrompts";
import { useGetAllTags } from "@/hooks/useGetAllTags";
import { useGetAllCollections } from "@/hooks/useGetAllCollections";
import { useSearchPromptsByText } from "@/hooks/useSearchPromptsByText";
import { useSearchPromptsByCollection } from "@/hooks/useSearchPromptsByCollection";
import { useSearchPromptsByTags } from "@/hooks/useSearchPromptsByTags";
import { Badge } from "@/ui/components/Badge";
import { Button } from "@/ui/components/Button";
import { PromptTabs } from "@/ui/components/PromptTabs";
import { TagBadge } from "@/ui/components/TagBadge";

function PromptDirectoryClient() {
  const router = useRouter();

  const { prompts, loading: allLoading, error: allError } = useGetAllPrompts();
  const { tags, loading: tagsLoading, error: tagsError } = useGetAllTags();
  const { collections } = useGetAllCollections();

  const {
    data: searchResults,
    loading: searchLoading,
    error: searchError,
    searchByText,
  } = useSearchPromptsByText();

  const {
    data: collectionResults,
    loading: collectionLoading,
    error: collectionError,
    searchByCollection,
  } = useSearchPromptsByCollection();

  const {
    data: tagResults,
    loading: tagLoading,
    error: tagError,
    searchByTags,
  } = useSearchPromptsByTags();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const q = event.target.value;
    setSearchQuery(q);
    setSelectedCollection(null);
    setSelectedTags([]);
    if (q.trim().length > 0) {
      searchByText(q);
    }
  };

  const handleCollectionClick = (collection: string) => {
    setSelectedCollection(collection);
    setSearchQuery("");
    setSelectedTags([]);
    searchByCollection(collection);
  };

  const handleTagClick = (tag: string) => {
    let updatedTags: string[];
    if (selectedTags.includes(tag)) {
      updatedTags = selectedTags.filter((t) => t !== tag);
    } else {
      updatedTags = [...selectedTags, tag];
    }
    setSelectedCollection(null);
    setSearchQuery("");
    setSelectedTags(updatedTags);
    searchByTags(updatedTags);
  };

  const displayPrompts =
    searchQuery.trim().length > 0
      ? searchResults
      : selectedCollection
      ? collectionResults
      : selectedTags.length > 0
      ? tagResults
      : prompts;

  return (
    <div className="flex h-full w-full flex-col items-start bg-[#000000ff] px-6 py-6">
      <div className="flex w-full flex-col items-start gap-6">
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex w-full items-center justify-between">
            <span className="font-['monospace'] text-[20px] font-[500] leading-[24px] text-white">
              Prompt Playbook
            </span>
          </div>

          <div className="flex w-full items-center gap-2">
            <PromptPlaybookSearchBar
              disabled={false}
              error={false}
              variant="outline"
              label=""
              helpText=""
              icon="FeatherSearch"
              iconRight={null}
            >
              <PromptPlaybookSearchBar.Input
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </PromptPlaybookSearchBar>
          </div>

          <div className="flex w-72 flex-wrap items-start gap-1">
            {tagsLoading && <Badge>Loading...</Badge>}
            {tagsError && <Badge>Error</Badge>}
            {tags &&
              tags.map((tag) => (
                <TagBadge
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  active={selectedTags.includes(tag)}
                >
                  {tag}
                </TagBadge>
              ))}
          </div>

          <PromptTabs>
            <PromptTabs.Item
              active={!selectedCollection && searchQuery.trim() === "" && selectedTags.length === 0}
              onClick={() => {
                setSelectedCollection(null);
                setSearchQuery("");
                setSelectedTags([]);
              }}
            >
              All
            </PromptTabs.Item>
            {collections?.map((collection) => (
              <PromptTabs.Item
                key={collection}
                active={selectedCollection === collection}
                onClick={() => handleCollectionClick(collection)}
              >
                {collection}
              </PromptTabs.Item>
            ))}
          </PromptTabs>
        </div>

        {(allLoading || searchLoading || collectionLoading || tagLoading) && (
          <p className="text-white">Loading prompts...</p>
        )}
        {(allError || searchError || collectionError || tagError) && (
          <p className="text-red-500">
            Error loading prompts:{" "}
            {allError?.message ||
              searchError?.message ||
              collectionError?.message ||
              tagError?.message}
          </p>
        )}

        <div className="flex flex-wrap items-start gap-4">
          {displayPrompts?.map((prompt) => (
            <div
              key={prompt.id}
              className="cursor-pointer"
              onClick={() => router.push(`/prompt/${prompt.id}`)}
            >
              <PromptCard
                text={prompt.name}
                prompt={prompt.actualPrompt}
                tags={(prompt.tags ?? []).map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              />
            </div>
          ))}
        </div>
      </div>

      <Button
        className="h-14 w-14 flex-none fixed bottom-8 right-8 rounded-full shadow-lg"
        variant="brand-secondary"
        size="large"
        icon="FeatherPlus"
        onClick={() => router.push("/prompt/new")}
      />
    </div>
  );
}

export default PromptDirectoryClient;
