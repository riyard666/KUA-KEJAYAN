import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Supabase client.
 * - Returns a configured client if env vars are present.
 * - Returns null if Supabase is not connected yet.
 * To enable: click the Supabase button on the top-right of the platform and complete the connection.
 */
export const supabase = url && anon ? createClient(url, anon) : null;

export type NewsRecord = {
    id?: string;
    title: string;
    category?: string | null;
    summary?: string | null;
    content: string;
    image_url?: string | null;
    created_at?: string;
};