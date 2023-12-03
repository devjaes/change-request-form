import AuthButton from "@/components/AuthButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-background text-foreground bg-white">
      <main className="min-h-screen bg-white flex flex-col items-center ">
        {children}
      </main>
    </section>
  );
}
