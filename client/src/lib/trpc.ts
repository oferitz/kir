import { QueryClient } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from 'kir-server/src'

export const trpc = createTRPCReact<AppRouter>()
export const queryClient = new QueryClient()
export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:9000'
    })
  ]
})
