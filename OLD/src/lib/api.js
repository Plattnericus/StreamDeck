const API_BASE = 'http://localhost:3000';

export const api = {
  get: (path) => fetch(`${API_BASE}${path}`, { 
    credentials: 'include' 
  }),
  
  post: (path, data) => fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: data instanceof FormData ? {} : { 'Content-Type': 'application/json' },
    body: data instanceof FormData ? data : JSON.stringify(data),
    credentials: 'include'
  })
};