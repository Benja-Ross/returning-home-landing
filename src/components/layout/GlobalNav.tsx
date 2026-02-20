"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function GlobalNav(props: { variant?: "overlay" }) {
  const pathname = usePathname();
  const isOverlay = props.variant === "overlay";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/mission-and-method", label: "Mission and Method" },
    { href: "/begin", label: "Begin" },
  ];

  return (
    <nav
      className={`py-4 ${isOverlay ? "border-b border-white/10" : "border-b border-slate-200"}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="relative mx-auto h-10 w-[200px] sm:mx-0 sm:h-12 sm:w-[240px]">
          <Image
            src="/returning-home-title.png"
            alt="Returning Home"
            fill
            className="object-contain object-center sm:object-left"
            priority
            sizes="(max-width: 640px) 200px, 240px"
          />
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm ${
                  isOverlay
                    ? "drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
                    : ""
                } ${
                  isActive
                    ? "font-medium text-slate-900 underline"
                    : isOverlay
                      ? "text-slate-700 hover:text-slate-900"
                      : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
