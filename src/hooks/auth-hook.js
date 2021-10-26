import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [role, setRole] = useState();
  const [token, setToken] = useState();
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback(
    (userId, username, name, surname, role, token, expirationDate) => {
      setUserId(userId);
      setUsername(username);
      setName(name);
      setSurname(surname);
      setRole(role);
      setToken(token);
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 10);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: userId,
          username: username,
          name: name,
          surname: surname,
          role: role,
          token: token,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setUserId(null);
    setUsername(null);
    setName(null);
    setSurname(null);
    setRole(null);
    setToken(null);
    setTokenExpirationDate(null);

    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.username,
        storedData.name,
        storedData.surname,
        storedData.role,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { userId, username, name, surname, role, token, login, logout };
};
