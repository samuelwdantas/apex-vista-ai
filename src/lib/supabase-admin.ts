import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Simple validation without complex checks that can fail in Vercel
const isValidConfig = () => {
  return supabaseUrl && supabaseServiceKey && 
         supabaseUrl.includes('supabase.co') && 
         supabaseServiceKey.startsWith('eyJ')
}

// Create admin client with minimal validation
export const supabaseAdmin = (() => {
  if (!isValidConfig()) {
    console.warn('⚠️ Supabase admin client: Invalid configuration')
    return null
  }

  try {
    return createClient(supabaseUrl!, supabaseServiceKey!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  } catch (error) {
    console.error('🚨 Failed to create Supabase admin client:', error)
    return null
  }
})()

// Simplified function to get admin client
export const getSupabaseAdminClient = () => {
  if (supabaseAdmin) {
    return supabaseAdmin
  }

  // If client is null, try to create a new one
  if (!isValidConfig()) {
    console.error('🚨 Supabase environment variables not configured properly')
    return null
  }

  try {
    return createClient(supabaseUrl!, supabaseServiceKey!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  } catch (error) {
    console.error('🚨 Failed to create Supabase admin client:', error)
    return null
  }
}

// Export environment variables for other uses
export { supabaseUrl, supabaseServiceKey }