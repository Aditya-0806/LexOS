import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('lexos_token'));

  useEffect(() => {
    const savedUser = localStorage.getItem('lexos_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('lexos_token', userToken);
    localStorage.setItem('lexos_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('lexos_token');
    localStorage.removeItem('lexos_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };