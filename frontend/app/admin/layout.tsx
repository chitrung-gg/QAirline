"use client";
import SideNav from "@/components/admin/sidenav";
import React from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/UserContext";
import { UserRole } from "@/interfaces/user";

export default function  Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = React.useContext(UserContext);

  const [isUserLoaded, setIsUserLoaded] = React.useState(false);

  React.useEffect(() => {
    if (user && user.isAuthenticated) {
      setIsUserLoaded(true);
    }
  }, [user]);

  React.useEffect(() => {
    if (isUserLoaded) {
      if (user.account.role !== UserRole.ADMIN) {
        router.push("/");
      }
    }
  }, [user, router, isUserLoaded]);

  return (
    <div className="flex min-h-[80vh] max-h-screen flex-col container mx-auto md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64 p-3">
        <SideNav />
      </div>
      <div className="grow p-6 md:overflow-y-auto">{children}</div>
    </div>
  );
}
