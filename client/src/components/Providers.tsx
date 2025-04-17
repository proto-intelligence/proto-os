'use client';

import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export function Providers({ children }: { children: ReactNode }) {
  // Create a client with custom configuration
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Disable automatic refetching on window focus
        refetchOnWindowFocus: false,
        // Disable automatic refetching on network reconnection
        refetchOnReconnect: false,
        // Set a longer stale time (5 minutes)
        staleTime: 5 * 60 * 1000,
        // Disable automatic background refetching
        refetchOnMount: false,
      },
    },
  }));

  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ClerkProvider>
  );
} 