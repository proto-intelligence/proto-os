"use client";

import React from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/ui/components/Button";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { FeatherWorkflow } from "@subframe/core";
import Link from "next/link";

function HomePage() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center gap-8 p-8 w-full h-full">
        <div className="flex flex-col items-center gap-4 text-center max-w-2xl">
          <IconWithBackground
            size="large"
            variant="brand"
            icon={<FeatherWorkflow className="h-8 w-8" />}
          />
          <h1 className="text-4xl font-bold text-default-font">
            Welcome to Workflow Creator
          </h1>
          <p className="text-lg text-subtext-color">
            Create, manage, and automate your workflows with ease. Get started by creating your first workflow or explore our templates.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/workflows">
            <Button variant="brand-primary" size="large">
              Create Workflow
            </Button>
          </Link>
          <Button variant="neutral-secondary" size="large">
            View Templates
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-6 w-full max-w-4xl mt-8">
          {[
            {
              title: "Automate Tasks",
              description: "Streamline your processes with automated workflows",
            },
            {
              title: "Collaborate",
              description: "Work together with your team in real-time",
            },
            {
              title: "Track Progress",
              description: "Monitor and analyze your workflow performance",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 p-6 bg-neutral-50 rounded-lg"
            >
              <h3 className="text-lg font-semibold text-default-font">
                {feature.title}
              </h3>
              <p className="text-sm text-subtext-color">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

export default HomePage;