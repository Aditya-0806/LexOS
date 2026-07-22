import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Restore auth state from localStorage on every refresh
    const savedToken = localStorage.getItem('lexos_token')
    const savedUser = localStorage.getItem('lexos_user')
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = (userData, userToken) => {
    setUser(userData)
    setToken(userToken)
    localStorage.setItem('lexos_token', userToken)
    localStorage.setItem('lexos_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('lexos_token')
    localStorage.removeItem('lexos_user')
  }

  // Show nothing while checking auth state
  if (loading) return null

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, useAuth }