import { useEffect, useState } from "react";

function useAuthUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authUser = async () => {
      try {
        let res = await fetch("/api/auth/me", { credentials: "include" });
        if (res.status === 200) {
          const data = await res.json();
          setUser(data);
        } else if (res.status === 401) {
          const refreshRes = await fetch("/api/auth/refresh", {
            method: "POST",
            credentials: "include",
          });

          if (refreshRes.status === 200) {
            res = await fetch("/api/auth/me", { credentials: "include" });
            if (res.status === 200) {
              const data = await res.json();
              setUser(data);
              return;
            }
          }
          setUser(null);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      }
    };

    authUser();
  }, []);

  return user;
}

export default useAuthUser;
