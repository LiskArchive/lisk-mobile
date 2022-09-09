import React from 'react'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { addCleanup } from '@testing-library/react-hooks'

export function queryWrapper({ children }) {
  const mutationCache = new MutationCache()

  const queryCache = new QueryCache()

  const queryClient = new QueryClient({
    queryCache,
    mutationCache,
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  addCleanup(() => {
    mutationCache.clear()
    queryCache.clear()
  })

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
