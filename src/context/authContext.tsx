import { FC, PropsWithChildren, createContext, useState } from 'react';
import { instance, login, logout } from '@/api';

interface AuthContextType {
  isAuth: boolean;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => void;
  removeCredentials: () => void;
  updateAuthState: () => string | null;
  getModalState: () => boolean;
  changeModalState: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

const authLocalStorageKey = 'auth';
const modalLocalStorageKey = 'modal';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => {
    const admin = localStorage.getItem(authLocalStorageKey);
    return !!admin;
  });

  const updateAuthState = () => {
    const token = localStorage.getItem(authLocalStorageKey);
    return token ? token : null;
  };

  const getModalState = () => {
    const modal = localStorage.getItem(modalLocalStorageKey);
    return modal === 'true';
  };

  const changeModalState = () => {
    localStorage.setItem(modalLocalStorageKey, 'false');
  };

  const removeCredentials = () => {
    localStorage.removeItem(authLocalStorageKey);
    setIsAuth(false);
    instance.defaults.headers.common['Authorization'] = undefined;
  };

  const signIn = async (username: string, password: string) => {
    try {
      const {
        data: { token, is_valid_email },
      } = await login(username, password);

      localStorage.setItem(authLocalStorageKey, token);
      localStorage.setItem(
        modalLocalStorageKey,
        JSON.stringify(!is_valid_email)
      );
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuth(true);
      return true;
    } catch (error) {
      removeCredentials();
      return false;
    }
  };

  const signOut = async () => {
    await logout();
    removeCredentials();
  };

  const value = {
    isAuth,
    signIn,
    signOut,
    removeCredentials,
    updateAuthState,
    getModalState,
    changeModalState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
