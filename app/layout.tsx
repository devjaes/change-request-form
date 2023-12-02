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
      <body className="bg-background text-foreground bg-white">
        <nav className="w-full flex border-b border-b-foreground/10 h-16 bg-persian-blue-950 text-white font-extra-light p-3">
          <div className="flex justify-between items-center w-full max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold flex justify-center">
              Change Request App
            </h2>
            <div className="flex justify-end">
              <AuthButton />
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-white flex flex-col items-center ">
          {children}
        </main>
      </body>
    </html>
  );
}
