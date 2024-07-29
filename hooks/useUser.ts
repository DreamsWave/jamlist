"use client";

import { createClient } from "@/utils/supabase/client";
import type { AuthError, User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";

function useUser() {
  const supabase = createClient();
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<AuthError | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const getUser = useCallback(async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) setError(error);
    if (user) setUser(user);

    setIsLoading(false);
  }, [supabase.auth]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return { user, isLoading, error };
}

export default useUser;
