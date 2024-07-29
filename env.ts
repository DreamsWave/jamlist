import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    DATABASE_URL: z.string().url(),
    SUPABASE_URL: z.string().url(),
    SUPABASE_ANON_KEY: z.string(),
    SUPABASE_REDIRECT_URL: z.string().url(),
    DISCORD_BOT_TOKEN: z.string(),
    DISCORD_GUILD_ID: z.string(),
    DISCORD_BOOSTY_ROLE_ID: z.string(),
    DISCORD_REFETCH_INTERVAL: z.string(),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    NEXT_PUBLIC_SUPABASE_REDIRECT_URL: z.string().url(),
    NEXT_PUBLIC_DISCORD_BOT_TOKEN: z.string(),
    NEXT_PUBLIC_DISCORD_GUILD_ID: z.string(),
    NEXT_PUBLIC_DISCORD_BOOSTY_ROLE_ID: z.string(),
    NEXT_PUBLIC_DISCORD_REFETCH_INTERVAL: z.string(),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_REDIRECT_URL: process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL,
    DISCORD_BOT_TOKEN: process.env.NEXT_PUBLIC_DISCORD_BOT_TOKEN,
    DISCORD_GUILD_ID: process.env.NEXT_PUBLIC_DISCORD_GUILD_ID,
    DISCORD_BOOSTY_ROLE_ID: process.env.NEXT_PUBLIC_DISCORD_BOOSTY_ROLE_ID,
    DISCORD_REFETCH_INTERVAL: process.env.NEXT_PUBLIC_DISCORD_REFETCH_INTERVAL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_REDIRECT_URL:
      process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL,
    NEXT_PUBLIC_DISCORD_BOT_TOKEN: process.env.NEXT_PUBLIC_DISCORD_BOT_TOKEN,
    NEXT_PUBLIC_DISCORD_GUILD_ID: process.env.NEXT_PUBLIC_DISCORD_GUILD_ID,
    NEXT_PUBLIC_DISCORD_BOOSTY_ROLE_ID:
      process.env.NEXT_PUBLIC_DISCORD_BOOSTY_ROLE_ID,
    NEXT_PUBLIC_DISCORD_REFETCH_INTERVAL:
      process.env.NEXT_PUBLIC_DISCORD_REFETCH_INTERVAL,
  },
});
