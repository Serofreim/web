import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import Header from '../components/header/Header'
import type { User } from '@supabase/supabase-js'

interface MyRouterContext {
  auth: {
    user: User | null
    isAuthenticated: boolean
  }
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
})
