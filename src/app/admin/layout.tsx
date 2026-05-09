"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Music, Image } from "lucide-react";
import { COPY } from "@/lib/constants/copy";

const navItems = [
  { href: "/admin/invites", label: COPY.admin.rsvps, icon: Users },
  { href: "/admin/songs", label: COPY.admin.songs, icon: Music },
  { href: "/admin/photos", label: COPY.admin.photos, icon: Image },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-cream-dark/30">
      <header className="sticky top-0 z-10 border-b border-gold/15 bg-white/80 backdrop-blur-md shadow-sm shadow-gold/5">
        <div className="max-w-5xl mx-auto px-6 py-5">
          <h1 className="font-serif italic text-2xl text-charcoal tracking-tight">
            {COPY.admin.title}
          </h1>
          <p className="font-sans text-xs text-warm-gray mt-0.5">
            Los 60 de Sandra
          </p>
          <nav className="flex gap-1 mt-4">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-sans text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-gold/10 text-gold font-medium shadow-sm shadow-gold/5"
                      : "text-warm-gray hover:text-charcoal hover:bg-white/60"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
