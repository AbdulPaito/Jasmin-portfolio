import { useState, useEffect, useCallback } from 'react';

const useFetch = (asyncFn, immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFn(...args);
      setData(result.data || result);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [asyncFn]);

  useEffect(() => {
    if (immediate) execute();
  }, []);

  return { data, loading, error, execute, setData };
};

export default useFetch;
