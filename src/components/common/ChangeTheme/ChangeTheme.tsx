import { useTheme } from "@/containers/Providers/ThemeProvider";
import React from "react";

const ChangeTheme = () => {
  const { theme, handleToggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={handleToggleTheme}
      className="shadow-inner w-12 h-6 relative overflow-hidden dark:bg-cyan-light rounded-full"
    >
      <div
        className={`h-full w-10 top-0 rounded-full shadow-[2px_2px_10px_#00000033] absolute transition-all ease-out ${
          theme === "light" ? "bg-cyan-700 -left-4" : "bg-light left-6"
        }`}
      ></div>
    </button>
  );
};

export default ChangeTheme;
