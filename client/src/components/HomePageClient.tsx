"use client";

import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Button } from "@/ui/components/Button";
import { FeatherFilter } from "@subframe/core";
import { FeatherPlus } from "@subframe/core";
import { Badge } from "@/ui/components/Badge";
import { FeatherArrowUp } from "@subframe/core";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { FeatherGitBranch } from "@subframe/core";
import { AreaChart } from "@/ui/components/AreaChart";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherGitPullRequest } from "@subframe/core";
import { Avatar } from "@/ui/components/Avatar";
import { FeatherMoreHorizontal } from "@subframe/core";

export default function HomePageClient() {
  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start">
        <div className="flex w-full items-center gap-2 border-b border-solid border-neutral-border px-8 py-2">
          <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
            Workflows
          </span>
          <Button
            variant="neutral-tertiary"
            icon={<FeatherFilter />}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            Filter
          </Button>
          <Button
            icon={<FeatherPlus />}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            New workflow
          </Button>
        </div>
        <div className="container max-w-none flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 bg-default-background py-12 overflow-auto">
          <div className="flex w-full flex-wrap items-start gap-4">
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
              <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
                Active workflows
              </span>
              <div className="flex w-full flex-col items-start gap-2">
                <span className="text-heading-2 font-heading-2 text-default-font">
                  24
                </span>
                <Badge variant="success" icon={<FeatherArrowUp />}>
                  12%
                </Badge>
              </div>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
              <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
                Completed this month
              </span>
              <div className="flex w-full flex-col items-start gap-2">
                <span className="text-heading-2 font-heading-2 text-default-font">
                  156
                </span>
                <Badge variant="success" icon={<FeatherArrowUp />}>
                  8%
                </Badge>
              </div>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
              <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
                Average completion time
              </span>
              <div className="flex w-full flex-col items-start gap-2">
                <span className="text-heading-2 font-heading-2 text-default-font">
                  2.4 days
                </span>
                <Badge variant="error" icon={<FeatherArrowUp />}>
                  5%
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-8 py-8 shadow-sm">
            <div className="flex w-full items-center gap-4">
              <IconWithBackground
                variant="neutral"
                size="medium"
                icon={<FeatherGitBranch />}
                square={true}
              />
              <span className="text-heading-3 font-heading-3 text-default-font">
                Active Workflows
              </span>
            </div>
            <AreaChart
              categories={["Biology", "Business", "Psychology"]}
              data={[
                { Year: "2015", Psychology: 120, Business: 110, Biology: 100 },
                { Year: "2016", Psychology: 130, Business: 95, Biology: 105 },
                { Year: "2017", Psychology: 115, Business: 105, Biology: 110 },
                { Year: "2018", Psychology: 125, Business: 120, Biology: 90 },
                { Year: "2019", Psychology: 110, Business: 130, Biology: 85 },
                { Year: "2020", Psychology: 135, Business: 100, Biology: 95 },
                { Year: "2021", Psychology: 105, Business: 115, Biology: 120 },
                { Year: "2022", Psychology: 140, Business: 125, Biology: 130 },
              ]}
              index={"Year"}
            />
          </div>
          <div className="flex w-full flex-col items-start">
            <div className="flex w-full items-center gap-4 border-b border-solid border-neutral-border px-4 py-4">
              <IconButton
                size="small"
                icon={<FeatherGitPullRequest />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
              <div className="flex grow shrink-0 basis-0 flex-col items-start">
                <span className="line-clamp-1 w-full text-body-bold font-body-bold text-default-font">
                  Employee Onboarding
                </span>
                <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                  HR Department
                </span>
              </div>
              <div className="flex grow shrink-0 basis-0 items-center gap-2">
                <Avatar
                  size="small"
                  image="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                >
                  A
                </Avatar>
                <span className="text-body font-body text-subtext-color">
                  12 active
                </span>
              </div>
              <Badge variant="success">Running</Badge>
              <IconButton
                icon={<FeatherMoreHorizontal />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
            </div>
            <div className="flex w-full items-center gap-4 border-b border-solid border-neutral-border px-4 py-4">
              <IconButton
                size="small"
                icon={<FeatherGitPullRequest />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
              <div className="flex grow shrink-0 basis-0 flex-col items-start">
                <span className="line-clamp-1 w-full text-body-bold font-body-bold text-default-font">
                  Content Approval
                </span>
                <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                  Marketing Team
                </span>
              </div>
              <div className="flex grow shrink-0 basis-0 items-center gap-2">
                <Avatar
                  size="small"
                  image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                >
                  A
                </Avatar>
                <span className="text-body font-body text-subtext-color">
                  8 active
                </span>
              </div>
              <Badge variant="success">Running</Badge>
              <IconButton
                icon={<FeatherMoreHorizontal />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
            </div>
            <div className="flex w-full items-center gap-4 border-b border-solid border-neutral-border px-4 py-4">
              <IconButton
                size="small"
                icon={<FeatherGitPullRequest />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
              <div className="flex grow shrink-0 basis-0 flex-col items-start">
                <span className="line-clamp-1 w-full text-body-bold font-body-bold text-default-font">
                  Invoice Processing
                </span>
                <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                  Finance Department
                </span>
              </div>
              <div className="flex grow shrink-0 basis-0 items-center gap-2">
                <Avatar
                  size="small"
                  image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
                >
                  A
                </Avatar>
                <span className="text-body font-body text-subtext-color">
                  4 active
                </span>
              </div>
              <Badge variant="warning">Pending</Badge>
              <IconButton
                icon={<FeatherMoreHorizontal />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}