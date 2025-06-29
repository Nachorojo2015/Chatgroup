import { useState } from 'react';

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoader = () => setIsLoading(true); // Iniciar el loader
  const stopLoader = () => setIsLoading(false); // Detener el loader

  return {
    isLoading,    // Estado del loader
    startLoader,  // Función para iniciar el loader
    stopLoader    // Función para detener el loader
  };
};

export default useLoader;
