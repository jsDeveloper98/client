import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwt, id) => {
    setToken(jwt);
    setUserId(id);

    window.localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: jwt,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    window.localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);

  return { login, logout, token, userId };
};
