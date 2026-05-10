import { useEffect, useState } from "react";
import { useTheme as useThemeContext } from "./theme-context";

export function useTheme() {
  const context = useThemeContext();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      if (context.theme === "dark") {
        setIsDark(true);
      } else if (context.theme === "light") {
        setIsDark(false);
      } else {
        setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
      }
    };

    updateTheme();

    if (context.theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [context.theme]);

  return { ...context, isDark };
}
