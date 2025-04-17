'use client';

export function LoadingState() {
  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-neutral-100 animate-pulse"></div>
        <div className="flex flex-col gap-2">
          <div className="h-6 w-32 bg-neutral-100 rounded animate-pulse"></div>
          <div className="h-4 w-48 bg-neutral-100 rounded animate-pulse"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-24 bg-neutral-100 rounded animate-pulse"></div>
          <div className="h-10 w-full bg-neutral-100 rounded animate-pulse"></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-24 bg-neutral-100 rounded animate-pulse"></div>
          <div className="h-10 w-full bg-neutral-100 rounded animate-pulse"></div>
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="h-4 w-16 bg-neutral-100 rounded animate-pulse"></div>
        <div className="h-10 w-full bg-neutral-100 rounded animate-pulse"></div>
      </div>
    </div>
  );
} 