import axios from 'axios';
import AirportTable from '@/components/admin/airport/AirportTable';

export default async function Page() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/airport`);
  const data = res.data;

    return (
      <main className='h-full w-full'>
        <h1 className="text-xl md:text-2xl text-blue-normal mb-3">
          Thông tin
        </h1>
        <AirportTable data={data}/>
      </main>
    );
  }