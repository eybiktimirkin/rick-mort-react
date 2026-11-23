import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  function refetch() {
    setRetryCount((prev) => prev + 1);
  }

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    fetch(url, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          const error = new Error(`Ошибка HTTP: ${response.status}`);
          error.status = response.status;
          throw error;
        }

        return response.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setError(error);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [url, retryCount]);

  return { data, isLoading, error, refetch };
}
