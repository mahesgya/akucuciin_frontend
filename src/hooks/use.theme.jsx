import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../redux/auth.slicer";

const useTheme = () => {
  const theme = useSelector((state) => state.auth.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = (mode) => {
      root.classList.remove("light", "dark");
      if (mode === "system") {
        root.classList.add(mq.matches ? "dark" : "light");
      } else {
        root.classList.add(mode);
      }
    };

    const onChange = (e) => {
      if (theme === "system") {
        root.classList.toggle("dark", e.matches);
        root.classList.toggle("light", !e.matches);
      }
    };

    apply(theme);
    if (theme === "system") mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  const changeTheme = useCallback((next) => {
    dispatch(setTheme(next));
  }, [dispatch]);

  return { theme, changeTheme };
};

export default useTheme
