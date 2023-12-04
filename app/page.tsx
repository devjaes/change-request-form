import JoinDashboard from "@/components/join-dashboard";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="animate-in flex-1 flex flex-col w-full  ">
        <main className="flex-1 flex flex-col gap-6">
          <JoinDashboard />
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Emilia Galarza, Jair Mera, Pablo Villacrés, Daniel Zhu. 2023.
          <br />
          All rights reserved.
        </p>
      </footer>
    </div>
  );
}
