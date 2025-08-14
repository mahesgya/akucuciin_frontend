import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function fullPath(loc) {
  return (loc?.pathname || "/") + (loc?.search || "") + (loc?.hash || "");
}

export default function RequireAuth({ children }) {
  const isLoggedIn = useSelector((s) => s.auth.isLoggedIn);
  const location = useLocation();

  if (isLoggedIn) return children;

  try {
    sessionStorage.setItem("postLoginRedirect", fullPath(location));
  } catch {}

  return (
    <Navigate
      to="/login"
      replace
      state={{ from: location }} 
    />
  );
}
