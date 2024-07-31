import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_API_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_API_KEY || ''

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and Key must be defined');
  }

const supabase = createClient(supabaseUrl, supabaseKey)

export {supabase}