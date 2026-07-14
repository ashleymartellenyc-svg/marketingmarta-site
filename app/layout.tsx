import type { Metadata } from "next";
import "./globals.css";
import SideNav from "@/components/SideNav";
import PageTransition from "@/components/PageTransition";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import LangAttribute from "@/components/LangAttribute";

export const metadata: Metadata = {
  title: "The Marketing Marta — Performance Creative Strategist for Apps & Startups",
  description:
    "Freelance performance creative strategist helping apps, SaaS, and growth-stage startups turn paid social into a real growth channel.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cream text-ink font-sans antialiased">
        <LenisProvider>
          <LangAttribute />
          <CustomCursor />
          <SideNav />
          <div className="md:ml-[200px]">
            <PageTransition>{children}</PageTransition>
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
