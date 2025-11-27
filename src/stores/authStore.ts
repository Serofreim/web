import { create } from 'zustand'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthState {
  user: User | null
  loading: boolean
  initialized: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  signOut: () => Promise<void>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  initialized: false,
  setUser: (user) => set({ user, loading: false }),
  setLoading: (loading) => set({ loading }),
  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null })
  },
  initialize: async () => {
    // Get initial session
    const {
      data: { session },
    } = await supabase.auth.getSession()
    set({ user: session?.user ?? null, loading: false, initialized: true })

    // Listen for auth changes
    supabase.auth.onAuthStateChange((_event, newSession) => {
      set({ user: newSession?.user ?? null, loading: false })
    })
  },
}))
