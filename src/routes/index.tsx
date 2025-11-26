import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="w-full h-screen bg-linear-to-b from-background to-muted text-center">
      home
    </div>
  )
}
