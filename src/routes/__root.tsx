import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import Header from '../components/header/Header'
import type { User } from '@supabase/supabase-js'
import { ThemeProvider } from '@/components/ui/theme-provider'

interface MyRouterContext {
  auth: {
    user: User | null
    isAuthenticated: boolean
  }
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <>
        <Header />
        <Outlet />
      </>
    </ThemeProvider>
  ),
})
