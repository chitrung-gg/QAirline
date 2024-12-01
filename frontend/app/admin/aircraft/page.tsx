import AircraftTable from "@/components/admin/aircraft/AircraftTable";
import { Suspense } from "react";

export default async function Page() {
    return (
      <main className='h-full w-full'>
        <h1 className="text-xl md:text-2xl text-blue-normal mb-3">
          Thông tin tàu bay
        </h1>
        <Suspense>
          <AircraftTable />
        </Suspense>
      </main>
    );
  }