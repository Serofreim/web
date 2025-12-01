import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { WarningCircleIcon, SpinnerGapIcon } from '@phosphor-icons/react'
import { useAuthStore } from '@/stores/authStore'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export const Route = createFileRoute('/auth/callback')({
  component: CallbackComponent,
})

function CallbackComponent() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    if (user) {
      navigate({ to: '/dashboard' })
    } else {
      // If no user after 3 seconds, something went wrong
      const timeout = setTimeout(() => {
        setError('Could not establish session. Please try again.')
        setTimeout(() => navigate({ to: '/login' }), 2000)
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [user, navigate])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="text-lg">Signing you in</div>
      {!error ? <SpinnerGapIcon className="animate-spin" /> : null}
      {error && (
        <Alert variant="destructive">
          <WarningCircleIcon />
          <AlertTitle className="text-left">Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
