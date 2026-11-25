import { useState, useEffect } from "react";

type FetchError = Error & {
  status?: number
}

export default function useFetch<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FetchError | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  function refetch() {
    setRetryCount((prev) => prev + 1);
  }

  useEffect(() => { 

    if(!url) {
     setIsLoading(false);
     setData(null)
     setError(null);
     return
    }
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    fetch(url, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          const error: FetchError = new Error(`Ошибка HTTP: ${response.status}`);
          error.status = response.status;
          throw error;
        }

        return response.json();
      })
      .then((result: T) => {
        setData(result);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return
        }
         if(error instanceof Error) {
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
