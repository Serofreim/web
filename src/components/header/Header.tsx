import AccountButtons from './AccountButtons'
import Logo from './Logo'
import Navigation from './Navigation'

export default function Header() {
  return (
    <div className="w-full px-4 py-2 bg-background flex justify-between items-center sticky top-0 z-50">
      <Logo />
      <Navigation />
      <AccountButtons />
    </div>
  )
}
