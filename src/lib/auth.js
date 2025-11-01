export async function checkSession() {
  const res = await fetch('http://localhost:3000/api/session', {
    credentials: 'include'
  });
  if (!res.ok) return { loggedIn: false };
  return await res.json();
}