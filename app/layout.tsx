import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Edux Platform",
  description: "Secure login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "white",
          colorBackground: "#09090b",
          colorText: "#ffffff",
          colorInputBackground: "transparent",
          colorInputText: "#ffffff",
          fontFamily: "var(--font-montserrat)",
          borderRadius: "0.5rem",
        },
        elements: {
          card: "!bg-zinc-950 !border !border-white/10 !shadow-none !rounded-xl !p-6 md:!p-8 w-full max-w-md mx-auto",
          headerTitle: "!text-xl !font-semibold !text-white",
          headerSubtitle: "!text-zinc-500 !text-sm",
          formButtonPrimary: 
            "!bg-white hover:!bg-zinc-200 !text-black !shadow-none !border-none !rounded-lg !text-sm !font-semibold !transition-all !duration-200",
          formFieldInput:
            "!bg-transparent !border !border-white/10 !text-white placeholder:!text-zinc-600 !rounded-lg focus:!border-white/30 focus:!bg-white/5 !transition-all !outline-none",
          formFieldLabel: "!text-zinc-500 !text-xs !font-medium !uppercase !tracking-wider !mb-1",
          footer: "!bg-transparent !border-t !border-white/5 !pt-4",
          footerActionText: "!text-zinc-600",
          footerActionLink: "!text-white hover:!text-zinc-300 !font-medium !underline-offset-4 hover:!underline",
          logoBox: "justify-center mb-4",
        },
      }}
    >
      <html lang="en">
        {/* التعديل هنا: تمت إزالة flex items-center justify-center ليعود الموقع كاملاً */}
        <body
          className={`${montserrat.variable} antialiased bg-zinc-950 text-white`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}