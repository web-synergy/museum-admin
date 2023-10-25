import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instance } from '@/api';
import useAuth from '@/hooks/useAuth';

const AxiosInterceptor = () => {
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const { removeCredentials } = useAuth();

  useEffect(() => {
    if (redirect) {
      navigate('/login');
      setRedirect(false);
    }
  }, [redirect, navigate]);

  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error.response.status === 401) {
        setRedirect(true);
        removeCredentials();
      }
    }
  );

  return null;
};

export default AxiosInterceptor;
