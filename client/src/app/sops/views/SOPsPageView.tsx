"use client";

import { useState } from "react";
import { SOPList, type SOP } from "../components/ui/SOPList";
import { useRouter } from "next/navigation";

// Mock data - replace with actual API calls
const mockSOPs: SOP[] = [
  {
    id: "1",
    title: "Patient Admission Process",
    description: "Standard procedure for admitting new patients",
    category: "Clinical",
    status: "published",
    lastUpdated: "2024-03-15",
  },
  {
    id: "2",
    title: "Equipment Maintenance Schedule",
    description: "Regular maintenance procedures for medical equipment",
    category: "Technical",
    status: "draft",
    lastUpdated: "2024-03-14",
  },
  {
    id: "3",
    title: "Billing and Insurance Processing",
    description: "Guidelines for handling patient billing and insurance claims",
    category: "Administrative",
    status: "published",
    lastUpdated: "2024-03-13",
  },
];

export function SOPsPageView() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  // Filter SOPs based on search query and filters
  const filteredSOPs = mockSOPs.filter((sop) => {
    const matchesSearch =
      searchQuery === "" ||
      sop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sop.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      sop.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesStatus =
      selectedStatus === "all" ||
      sop.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreateNew = () => {
    router.push("/workflows");
  };

  return (
    <div className="p-6">
      <SOPList
        sops={filteredSOPs}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        selectedStatus={selectedStatus}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        onStatusChange={setSelectedStatus}
        onCreateNew={handleCreateNew}
        isLoading={isLoading}
      />
    </div>
  );
} 