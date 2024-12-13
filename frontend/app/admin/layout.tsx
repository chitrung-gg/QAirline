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
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (user && user.isLoading === false) {
      setIsUserLoaded(true);
    }
  }, [user, router]);

  React.useEffect(() => {
    if (isUserLoaded) {
      if (user.account.role !== UserRole.ADMIN) {
        router.push("/");
      }
    }
  }, [user, router, isUserLoaded]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex min-h-[80vh] max-h-screen flex-col container mx-auto md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64 p-3">
        <SideNav />
      </div>
      <div className="grow p-6 md:overflow-y-auto">{children}</div>
    </div>
  );
}
