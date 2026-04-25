import Link from "next/link";
import { COPY } from "@/lib/constants/copy";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-gold/10 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="font-serif text-xl text-charcoal mb-3">
            {COPY.admin.title}
          </h1>
          <nav className="flex gap-4">
            <Link
              href="/admin/rsvps"
              className="font-sans text-sm text-gold hover:text-gold-light transition-colors"
            >
              {COPY.admin.rsvps}
            </Link>
            <Link
              href="/admin/songs"
              className="font-sans text-sm text-gold hover:text-gold-light transition-colors"
            >
              {COPY.admin.songs}
            </Link>
            <Link
              href="/admin/photos"
              className="font-sans text-sm text-gold hover:text-gold-light transition-colors"
            >
              {COPY.admin.photos}
            </Link>
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
