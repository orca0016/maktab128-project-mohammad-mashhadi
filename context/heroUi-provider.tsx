"use client";
import { HeroUIProvider } from "@heroui/react";
import {ToastProvider} from "@heroui/toast";

const HeroUiProvider = ({ children }: { children: React.ReactNode }) => {
  return <HeroUIProvider>
    <ToastProvider />
    {children}</HeroUIProvider>;
};

export default HeroUiProvider;
