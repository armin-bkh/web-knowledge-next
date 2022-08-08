import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type TTheme = {
  theme: "light" | "dark" | null;
  handleToggleTheme: () => void;
};

export const ThemeContext = createContext({} as TTheme);
export const WEB_KNOWLEDGE_THEME = "WEB_KNOWLEDGE_THEME";

export interface IThemeProviderProps {
  children: JSX.Element | JSX.Element[];
}

function ThemeProvider(props: IThemeProviderProps) {
  const { children } = props;

  const [theme, setTheme] = useState<TTheme["theme"] | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem(WEB_KNOWLEDGE_THEME);
    const browserTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    const defaultTheme = savedTheme || browserTheme;
    console.log({ savedTheme, browserTheme, defaultTheme });

    setTheme(defaultTheme as TTheme["theme"]);
    document.documentElement.classList[
      defaultTheme === "dark" ? "add" : "remove"
    ]("dark");

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleChangeAutoTheme);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleChangeAutoTheme);
    };
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem(WEB_KNOWLEDGE_THEME, theme);
    }
  }, [theme]);

  const handleChangeAutoTheme = ({ matches }: MediaQueryListEvent) => {
    setTheme(matches ? "dark" : "light");
    document.documentElement.classList[matches ? "add" : "remove"]("dark");
  };

  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList[theme === "light" ? "add" : "remove"](
      "dark"
    );
  };

  const themeValue = useMemo(
    () => ({
      theme,
      handleToggleTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={themeValue}>
      {theme && children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;

export const useTheme = () => useContext(ThemeContext);
