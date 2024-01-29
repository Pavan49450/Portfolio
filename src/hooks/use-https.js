import { useState, useCallback } from "react";

const useHttps = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: JSON.stringify(requestConfig.body) || null,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      console.log(response);
      const data = await response.json();
      applyData(data);
    } catch (err) {
      console.error(err); // Log the actual error to the console
      setError(err.message || "An unknown error occurred");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    sendRequest,
    error,
  };
};

export default useHttps;
