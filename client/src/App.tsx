import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'components/Theme/ThemeProvider.tsx'
import ThemeToggle from 'components/Theme/ThemeToggle.tsx'
import { Separator } from 'components/ui/separator.tsx'
import { queryClient, trpc, trpcClient } from 'lib/trpc'
import Users from 'views/Users'

const App = () => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="p-2">
            <ThemeToggle />
          </div>
          <Separator />
          <main className="p-8">
            <Users />
          </main>
        </ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App
