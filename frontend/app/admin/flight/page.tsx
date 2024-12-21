import FlightTable from "@/components/admin/flight/FlightTable";
import { Suspense } from "react";
import axios from "axios";


export default async function Page() {
  const res = await axios.get('http://localhost:5000/flight');
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