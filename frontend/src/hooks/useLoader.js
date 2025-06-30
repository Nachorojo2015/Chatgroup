import { useState } from 'react';

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoader = () => setIsLoading(true); 
  const stopLoader = () => setIsLoading(false); 

  return {
    isLoading,    
    startLoader,  
    stopLoader   
  };
};

export default useLoader;
