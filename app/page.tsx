import JoinDashboard from "@/components/join-dashboard";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <div className="animate-in flex-1 flex flex-col w-full  ">
        <main className="flex-1 flex flex-col gap-6">
          <JoinDashboard />
        </main>
      </div>
    </div>
  );
}
