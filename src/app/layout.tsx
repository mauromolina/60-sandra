import type { Metadata } from "next";
import { Noto_Serif, Inter, Bodoni_Moda } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/Providers";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Los 60 de Sandra",
  description:
    "Estás invitado/a a celebrar los 60 años de Sandra. Una noche especial para brindar juntos.",
  openGraph: {
    title: "Los 60 de Sandra",
    description: "Una noche especial para brindar juntos",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${notoSerif.variable} ${inter.variable} ${bodoni.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream">
        <Providers>
          {children}
          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  );
}
