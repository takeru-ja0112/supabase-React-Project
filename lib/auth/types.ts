import type { User, Session, AuthError } from '@supabase/supabase-js'

export interface AuthResult {
  user: User | null
  session: Session | null
  error: AuthError | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData extends LoginCredentials {
  username: string
  firstname?: string
  lastname?: string
}