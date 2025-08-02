"use client";
import { HeroUIProvider } from "@heroui/react";

const HeroUiProvider = ({ children }: { children: React.ReactNode }) => {
  return <HeroUIProvider>{children}</HeroUIProvider>;
};

export default HeroUiProvider;
