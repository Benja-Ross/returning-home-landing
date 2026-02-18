"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function GlobalNav() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/mission-and-method", label: "Mission and Method" },
    { href: "/begin", label: "Begin" },
  ];

  const isHomeActive = pathname === "/";

  return (
    <nav className="border-b border-slate-200 py-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className={`text-sm font-semibold text-slate-900 hover:text-slate-900 ${
            isHomeActive ? "underline" : "no-underline"
          }`}
        >
          Returning Home
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm ${
                isActive
                  ? "font-medium text-slate-900 underline"
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
