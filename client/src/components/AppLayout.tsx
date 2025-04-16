"use client";

import React, { useState } from "react";
import { ProtoIconNavButton } from "@/ui/components/ProtoIconNavButton";
import { FeatherMenu, FeatherX, FeatherWorkflow, FeatherHome } from "@subframe/core";
import { ProtoSidebarCollapsible } from "@/ui/components/ProtoSidebarCollapsible";
import { ProtoTopbar } from "@/ui/components/ProtoTopbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Route {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const routes: Route[] = [
  {
    path: "/",
    label: "Home",
    icon: <FeatherHome />,
  },
  {
    path: "/workflows",
    label: "Workflows",
    icon: <FeatherWorkflow />,
  },
];

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const pathname = usePathname();

  const handleSidebarToggle = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <ProtoSidebarCollapsible
        expanded={isSidebarExpanded}
        headerSlot={
          <div className={`flex items-center ${isSidebarExpanded ? 'justify-end' : 'justify-center'} w-full px-2`}>
            <ProtoIconNavButton
              className={isSidebarExpanded ? "hidden" : ""}
              disabled={false}
              variant="neutral-tertiary"
              size="medium"
              icon={<FeatherMenu />}
              loading={false}
              onClick={handleSidebarToggle}
            />
            <ProtoIconNavButton
              className={isSidebarExpanded ? "" : "hidden"}
              disabled={false}
              variant="neutral-tertiary"
              size="medium"
              icon={<FeatherX />}
              loading={false}
              onClick={handleSidebarToggle}
            />
          </div>
        }
        routesSlot={
          <>
            {routes.map((route) => (
              <Link key={route.path} href={route.path} className="w-full">
                <ProtoSidebarCollapsible.NavItem 
                  icon={route.icon}
                  selected={pathname === route.path}
                >
                  {route.label}
                </ProtoSidebarCollapsible.NavItem>
              </Link>
            ))}
          </>
        }
      />
      <div className="flex flex-col flex-1 min-h-0">
        <ProtoTopbar />
        <main className="flex-1 min-h-0">
          {children}
        </main>
      </div>
    </div>
  );
} 