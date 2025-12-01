import { Link, useNavigate } from '@tanstack/react-router'
import { Button } from '../ui/button'
import AvatarDropdown from '../dashboard/AvatarDropdown'
import { useAuthStore } from '@/stores/authStore'
import { SunIcon, MoonIcon } from '@phosphor-icons/react'
import { useTheme } from '../ui/theme-provider'

export default function AccountButtons() {
  const { user, signOut } = useAuthStore()
  const { theme, setTheme } = useTheme()
  const nav = useNavigate()

  const handleLogout = async () => {
    await signOut()
    nav({ to: '/' })
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="flex gap-2 items-center">
      <Button className="cursor-pointer" variant="ghost" onClick={toggleTheme}>
        {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
      </Button>

      {user ? (
        <>
          <Button asChild>
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
          <AvatarDropdown logout={handleLogout} email={user.email || ''} />
        </>
      ) : (
        <Button asChild>
          <Link to="/login">Sign In</Link>
        </Button>
      )}
    </div>
  )
}
