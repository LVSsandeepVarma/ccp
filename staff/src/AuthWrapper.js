// eslint-disable-next-line react/prop-types
// eslint-disable-next-line react/prop-types
export default function AuthWrapper({ children }) {
  const token = localStorage.getItem("staff_auth_token");

  if (!token) {
    window.location.href = "/signin"
  }

  return children;
}
