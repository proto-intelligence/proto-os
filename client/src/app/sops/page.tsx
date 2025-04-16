"use client";

import { AppLayout } from "@/components/AppLayout";

export default function SOPsPage() {
  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-neutral-900 mb-6">
          Standard Operating Procedures
        </h1>
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
          <p className="text-neutral-600">
            This page will contain your organization&apos;s Standard Operating Procedures.
          </p>
        </div>
      </div>
    </AppLayout>
  );
} 