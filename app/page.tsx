import JoinDashboard from "@/components/join-dashboard";

export default async function Index() {
  return (
    <div className="flex-1 w-full  h-11 flex flex-col gap-15 items-center">
      <div className="animate-in flex-1 flex flex-col gap-15 opacity-0 max-w-2xl px-1 items-center justify-center h-1/2">
        <main className="flex-1 flex flex-col gap-4 justify-center items-center">
          <h2 className="font-bold text-4xl mb-4">WELCOME</h2>
          <JoinDashboard />
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p className="font-bold text-sm">
          Emilia Galarza, Jair Mera, Pablo Villacrés, Daniel Zhu. 2023.
          <br />
          All rights reserved.
        </p>
      </footer>
    </div>
  );
}
