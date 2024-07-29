"use server";

import { env } from "@/env";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signInWithDiscord() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: env.SUPABASE_REDIRECT_URL,
    },
  });

  if (data.url) {
    redirect(data.url);
  }
  return revalidatePath("/");
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return revalidatePath("/");
}

export async function getUser() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return { user, error };
}
