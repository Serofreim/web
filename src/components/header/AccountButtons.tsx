import { Button } from '../ui/button'

export default function AccountButtons() {
  return (
    <div className="flex gap-2">
      <Button variant="outline">Login</Button>
      <Button>Sign Up</Button>
    </div>
  )
}
