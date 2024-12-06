import SideNav from "@/components/admin/sidenav";

export default function  Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64 p-3">
        <SideNav />
      </div>
      <div className="grow p-6 md:overflow-y-auto">{children}</div>
    </div>
  );
}
