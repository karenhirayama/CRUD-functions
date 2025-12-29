const API_BASE_URL = 'https://dev.codeleap.co.uk/careers/';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface RequestConfig {
  url: string;
  method?: RequestMethod;
  params?: Record<string, string | number>;
  body?: unknown;
}

export const fetchBaseQuery = async <T>(config: RequestConfig): Promise<T> => {
  const { url, method = 'GET', params, body } = config;
  
  let fullUrl = `${API_BASE_URL}${url}`;
  
  if (params) {
    const queryString = new URLSearchParams(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    ).toString();
    fullUrl += `?${queryString}`;
  }

  const requestConfig: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    requestConfig.body = JSON.stringify(body);
  }

  const response = await fetch(fullUrl, requestConfig);
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  if (method === 'DELETE') {
    return undefined as T;
  }

  return response.json();
};

export const api = {
  query: fetchBaseQuery,
};
