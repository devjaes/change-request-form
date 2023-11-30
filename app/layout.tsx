import { GeistSans } from "geist/font/sans";
import "./globals.css";
import AuthButton from "@/components/AuthButton";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Change-request-form-app",
  description: "Change-request-form-app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-blue-500 text-white dark:bg-slate-700">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <h2 className="text-xl font-semibold">Change Request App</h2>
            <AuthButton />
          </div>
        </nav>
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
