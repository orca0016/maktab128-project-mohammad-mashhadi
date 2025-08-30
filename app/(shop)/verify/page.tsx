"use client";
import { MESSAGES_PAYMENT } from "@/helpers/payment-message";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@heroui/button";
import { useQuery } from "@tanstack/react-query";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const trackId = searchParams.get("trackId");
  const orderId = searchParams.get("orderId");
  const { clearCart } = useCart();
  const { data: verifyPayment } = useQuery<{
    message: boolean;
    result: {
      message: string;
      result: number;
    };
  }>({
    queryKey: ["payment-verify", trackId],
    enabled: !!trackId || !!orderId,
    queryFn: async () =>
      await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackId, orderId }),
      }).then((res) => res.json()),
  });

  const status = verifyPayment?.result.result ?? 0;
  const clearedRef = useRef(false);

  useEffect(() => {
    if (!clearedRef.current && (status === 100 || status === 201)) {

      clearCart();
      clearedRef.current = true;
    }
  }, [status, clearCart]);

  const iconDetail = () => {
    switch (status) {
      case 100:
        return "success.png";
      case 102:
        return "denied.png";
      case 103:
        return "denied.png";
      case 104:
        return "denied.png";
      case 201:
        return "success.png";
      case 202:
        return "denied.png";
      case 203:
        return "denied.png";
      default:
        return "pending.png";
    }
  };
  return (
    <div className="p-10 flex flex-col items-center text-center h-[80vh]">
      <div className="w-60 h-60">
        <Image
          src={`/assets/${iconDetail()}`}
          alt="status image"
          width={300}
          height={300}
          className="w-full h-full"
        />
      </div>
      <h1 className="text-2xl font-semibold mb-4">
        {MESSAGES_PAYMENT[status] || "درحال برسی..."}
      </h1>
      {trackId && <p>کد پیگیری: {trackId}</p>}
      <Link href="/" className="my-4">
        <Button variant="shadow" color="secondary">
          به خرید ادامه دهید.
        </Button>
      </Link>
    </div>
  );
}
