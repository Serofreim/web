import { createFileRoute, redirect } from '@tanstack/react-router'
import { useState } from 'react'
import { WarningCircleIcon, SpinnerGapIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'
import { Alert, AlertTitle } from '@/components/ui/alert'

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email')
      return
    }

    setLoading(true)
    setError('')

    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    setLoading(false)

    if (authError) {
      setError(authError.message)
    } else {
      setSent(true)
    }
  }

  if (sent) {
    return (
      <div className="flex justify-center my-32 text-center">
        <div className="flex flex-col gap-14 max-w-md">
          <h1 className="text-7xl font-medium">Check your email</h1>
          <div className="space-y-4">
            <p className="text-3xl font-medium text-muted-foreground">
              We've sent a magic link to <strong>{email}</strong>
            </p>
            <p className="text-lg"></p>
            <p>
              Click the link in your email to sign in. <br /> The link will
              expire in 60 minutes.
            </p>
          </div>
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => setSent(false)}
          >
            Try a different email
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center my-32 text-center">
      <div className="flex flex-col gap-14">
        <h1 className="text-7xl font-medium">
          Create w/ <br /> Serofreim
        </h1>
        <div className="space-y-2">
          <p className="text-3xl font-medium text-muted-foreground">
            Continue to Sign up / Login
          </p>
          <p>Get a magic link to your email that'll sign you in instantly.</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              disabled={loading}
            />
            <Button
              className={loading ? 'cursor-wait' : 'cursor-pointer'}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <SpinnerGapIcon className="animate-spin" />
              ) : (
                'Continue'
              )}
            </Button>
          </div>
          {error && (
            <Alert variant="destructive">
              <WarningCircleIcon />
              <AlertTitle className="text-left">{error}</AlertTitle>
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}
