import { useEffect, useState } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    const userId = sessionStorage.getItem('userId');
    
    if (accessToken && userId) {
      setIsLoggedIn(true);
    }
  }, []);

  return isLoggedIn;
};

export default useAuth;
