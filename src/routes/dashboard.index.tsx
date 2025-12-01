import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'

export const Route = createFileRoute('/dashboard/')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="p-8">
      <h1>Dashboard</h1>
      <p className="mt-4">Welcome, {user?.email}!</p>
    </div>
  )
}
