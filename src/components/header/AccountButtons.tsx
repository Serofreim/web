import { Link, useNavigate } from '@tanstack/react-router'
import { Button } from '../ui/button'
import AvatarDropdown from '../dashboard/AvatarDropdown'
import { useAuthStore } from '@/stores/authStore'

export default function AccountButtons() {
  const { user, signOut } = useAuthStore()
  const nav = useNavigate()

  const handleLogout = async () => {
    await signOut()
    nav({ to: '/' })
  }

  return (
    <div className="flex gap-2 items-center">
      {user ? (
        <>
          <Button variant="secondary" asChild>
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
          <AvatarDropdown logout={handleLogout} email={user.email || ''} />
        </>
      ) : (
        <Button variant="outline" asChild>
          <Link to="/login">Sign In</Link>
        </Button>
      )}
    </div>
  )
}
