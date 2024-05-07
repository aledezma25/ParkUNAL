import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar la aplicación.
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token) {
          setUser({ token });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const login = (token) => {
    setUser({ token });
    AsyncStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    AsyncStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
