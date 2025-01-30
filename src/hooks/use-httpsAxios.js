import { useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useHttpsAxios = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const sendRequest = useCallback(async (requestConfig) => {
    setIsLoading(true);
    setError(null);
    setStatusCode(null);
    setResponseData(null);
    // for (const entry of requestConfig.body.entries()) {
    //   console.log(entry);
    // }
    try {
      await axios({
        method: requestConfig.method ? requestConfig.method : "GET",
        url: requestConfig.url,
        headers: requestConfig.headers ? requestConfig.headers : {},
        data: requestConfig.body || null,
      }).then(async (response) => {
        setStatusCode(await response.status);
        setResponseData(await response.data);

        // console.log(response);
        if (response?.data?.success) {
          toast.success(response.data?.message);
        }

        if (!response.status.toString().startsWith("2")) {
          setError(`Request failed with status ${response.status}`);
          toast.error(response?.data?.message);
        }
      });
    } catch (err) {
      setStatusCode(err.response?.status);
      setError(err);
      setResponseData(err);

      toast.error(
        err?.data?.message ||
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.data?.error ||
          requestConfig.errorText ||
          `Failed to complete request`
      );
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    sendRequest,
    error,
    statusCode,
    responseData,
  };
};

export default useHttpsAxios;
