import FlightTable from "@/components/admin/flight/FlightTable";
import { Suspense } from "react";
import axios from "axios";


export default async function Page() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/flight`);
  const data = res.data;

    return (
      <main className='h-full w-full'>
        <h1 className="text-xl md:text-2xl text-blue-normal mb-3">
          Chuyến bay
        </h1>
        <FlightTable flights={data}/>
      </main>
    );
  }