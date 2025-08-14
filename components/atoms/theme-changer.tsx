"use client";
import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BsFillCloudMoonFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const [isSelected, setIsSelected] = useState(theme === "dark");

  useEffect(() => {
    setIsSelected(theme === "dark");
  }, [theme]);

  const handleSwitch = (checked: boolean) => {
    setIsSelected(checked);

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setTheme(checked ? "dark" : "light");
      });
    } else {
      setTheme(checked ? "dark" : "light");
    }
  };

  return (
    <button
      onClick={() => handleSwitch(theme === "light")}
      type="button"
      className="rounded-lg border-[#919EAB]/12 bg-[#919EAB]/8 border-1 gap-4 shadow px-4 py-2 flex flex-col justify-between cursor-pointer"
    >
      <div className="w-full flex justify-between">
        <BsFillCloudMoonFill
          className="dark:text-white text-title-text-light"
          size={"2rem"}
        />
        <Switch
          dir="ltr"
          size="sm"
          color="secondary"
          aria-label="theme"
          isSelected={isSelected}
          onValueChange={handleSwitch}
          startContent={<FaMoon />}
          endContent={<MdSunny className="text-title-text-light" />}
        />
      </div>
      <p className="text-xl dark:text-white text-title-text-light text-left">
        {theme}
      </p>
    </button>
  );
};

export default ThemeChanger;
