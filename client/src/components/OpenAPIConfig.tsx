// src/components/OpenAPIConfig.tsx
'use client';

import { useEffect } from 'react';
import { OpenAPI } from '@/lib/api/client';

export const OpenAPIConfig = () => {
  useEffect(() => {
    OpenAPI.BASE = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL || 'http://localhost:3001';
  }, []);

  return null;
};
