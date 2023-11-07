import { FC, PropsWithChildren, createContext, useState } from 'react';
import { instance, login, logout } from '@/api';

//ToDo: add singIn and signOut fn type
interface AuthContextType {
  isAuth: boolean;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => void;
  removeCredentials: () => void;
  updateAuthState: () => string | null;
}

export const AuthContext = createContext<AuthContextType>(null!);

const localStorageKey = 'auth';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => {
    const admin = localStorage.getItem(localStorageKey);
    return !!admin;
  });

  const updateAuthState = () => {
    const token = localStorage.getItem(localStorageKey);
    return token ? token : null;
  };

  const removeCredentials = () => {
    localStorage.removeItem(localStorageKey);
    setIsAuth(false);
    instance.defaults.headers.common['Authorization'] = undefined;
  };
  const signIn = async (username: string, password: string) => {
    //ToDo: change to request for sing in

    try {
      const {
        data: { token },
      } = await login(username, password);

      localStorage.setItem(localStorageKey, token);
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuth(true);
      return true;
    } catch (error) {
      removeCredentials();
      return false;
    }
  };

  const signOut = async () => {
    //ToDo: add request for sign out
    await logout();
    removeCredentials();
  };

  const value = { isAuth, signIn, signOut, removeCredentials, updateAuthState };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
