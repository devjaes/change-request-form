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
      <body className="bg-background text-foreground ">
      <nav className="w-full flex justify-between items-center border-b border-b-foreground/10 h-16 px-3">
          <span className="flex-1"></span> 
          <h2 className="flex-none mx-auto">Change Request App</h2> 
          <div className="flex flex-1 justify-end m-2">
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
