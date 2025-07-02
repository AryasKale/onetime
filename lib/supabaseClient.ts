import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL')
}

if (!supabaseAnonKey) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Create and export Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'X-Client-Info': 'onetime-email-app',
    },
  },
})

// Export database types (will be useful later)
export type Database = {
  public: {
    Tables: {
      inbox: {
        Row: {
          id: string
          email_address: string
          created_at: string
          expires_at: string
        }
        Insert: {
          id?: string
          email_address: string
          created_at?: string
          expires_at: string
        }
        Update: {
          id?: string
          email_address?: string
          created_at?: string
          expires_at?: string
        }
      }
      emails: {
        Row: {
          id: string
          inbox_id: string
          sender: string
          subject: string
          body: string
          received_at: string
          is_read: boolean
          attachments: string[] | null
        }
        Insert: {
          id?: string
          inbox_id: string
          sender: string
          subject: string
          body: string
          received_at?: string
          is_read?: boolean
          attachments?: string[] | null
        }
        Update: {
          id?: string
          inbox_id?: string
          sender?: string
          subject?: string
          body?: string
          received_at?: string
          is_read?: boolean
          attachments?: string[] | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 